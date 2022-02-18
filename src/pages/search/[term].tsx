import { useRouter } from "next/router";

import { useI18n } from "@context/locale";

const Search = () => {
  const { i18n } = useI18n();
  const { locale, query } = useRouter();
  return (
    <>
      <h1>{i18n.title}</h1>
      <h2>Steps that work locally but return 404 on vercel: </h2>
      <ol>
        <li>
          Change the url part directly in the browser from "/dobre/pretrage" to
          "/search" (keeping the host and the search term)
        </li>
        <li>Hit enter!</li>
        <li>
          Results <b>Locally</b>: Get redirected back to "/dobre/pretrage"
        </li>
        <li>
          Results on <b>Vercel</b>: Get 404
        </li>
      </ol>
      <h2>Info: </h2>
      <ul>
        <li>locale: {locale}</li>
        <li>search term: {query.term}</li>
      </ul>
    </>
  );
};

export default Search;
