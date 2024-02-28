"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  //useSearchParams是一個用戶端元件掛鉤，可讓您讀取目前 URL 的查詢字串。
  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  //  dynamic是一個高階函數,它可以讓你動態導入React元件,
  //  只有在客戶端渲染時才加載該元件的代碼。
  //  這對於減少首次加載的JavaScript代碼體積很有幫助。

  // { ssr: false }: 這是一個選項對象,其中設置了ssr: false。
  // 這告訴Next.js,導入的組件不應該在服務器端渲染。
  // 通常,我們將這個設置應用於導入無法在服務器端渲染的組件
  // ,例如依賴於瀏覽器API的組件。
  // 所以,這段代碼導入了../Map模組中的內容,
  // 並將其設置為在客戶端動態加載,
  // 而不是在服務器端渲染。
  // 這對於優化應用程式的性能很有幫助,
  // 因為它可以減少服務器端渲染的JavaScript體積,
  // 同時仍然可以在客戶端渲染所有必需的組件。

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
      //解析查询字符串:
      // const queryString = "foo=bar&abc=xyz&hello=world";
      // const parsed = qs.parse(queryString);
      // console.log(parsed); // => { foo: 'bar', abc: 'xyz', hello: 'world' }
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    //格式化对象为查询字符串:
    // const obj = { foo: "bar", abc: "xyz", hello: "world" };
    // const str = qs.stringify(obj);
    // console.log(str); // => 'foo=bar&abc=xyz&hello=world'

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "搜尋";
    }

    return "下一步";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "返回";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="你想去哪裡?" subtitle="找到完美的位置!" />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="你打算什麼時候去?" subtitle="確保每個人都有空!" />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="更多資訊" subtitle="找到你完美的地方!" />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="客人"
          subtitle="有多少客人來?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="房間"
          subtitle="您需要多少個房間?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title="浴室"
          subtitle="您需要多少間浴室?"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="篩選條件"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
