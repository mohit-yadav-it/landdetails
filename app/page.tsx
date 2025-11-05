import Hero from "./component/hero";
import Detail from "./component/detail";
import Due from "./component/due";
import Registry from "./component/registry";
import Upload from "./component/upload";
import Disclaimer from "./component/disclaimer";
import SuccessModal from "./component/SuccessModal";

export default function Home() {
  return (
    <>
      <Hero />
      <Detail />
      <Due />
      <Registry />
      <Upload />
      <Disclaimer />
      <SuccessModal />
    </>
  );
}