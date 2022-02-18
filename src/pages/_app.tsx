import { load, I18n } from "@context/locale";

import AppProviders from "@context/index";

const App = ({ Component, pageProps, translations }) => {
  return (
    <AppProviders translations={translations}>
      <Component {...pageProps} />
    </AppProviders>
  );
};

App.getInitialProps = async ({ router }) => {
  const translations: I18n = await load(router.locale);
  return { translations };
};

export default App;
