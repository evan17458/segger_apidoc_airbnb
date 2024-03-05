import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

//import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="未經授權" subtitle="請登入" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="未找到房產" subtitle="您似乎沒有任何房產" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      {/* <PropertiesClient listings={listings} currentUser={currentUser} /> */}
      <div></div>
    </ClientOnly>
  );
};

export default PropertiesPage;
