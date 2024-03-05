import { getApiDocs } from "@/app/libs/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  console.log("spec123", spec);
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
