import ModelReturnCar from "./components/model";
import GetSession from "@/_util/session";
import { notFound } from "next/navigation";

const page = async () => {
  const session = await GetSession();
  const publicId = session?.publicId;

  if (!publicId) return notFound();
  return <ModelReturnCar />;
};

export default page;
