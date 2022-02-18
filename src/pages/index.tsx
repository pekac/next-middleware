import { useI18n } from "@context/locale";
import Link from "next/link";

const HomePage = () => {
  const { i18n } = useI18n();
  return (
    <>
      <h1>{i18n.title}</h1>
      <h2>Info: </h2>
      <p>
        Note that the link route is /search/[term] - check url once you land on
        the /search page
      </p>
      <Link href="/search/test">Link to search page!</Link>
    </>
  );
};

export default HomePage;
