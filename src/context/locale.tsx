import React, { useState } from "react";
import { useRouter } from "next/router";

import { Locale } from "@constants/locale";

export interface Localized {
  i18n: I18n;
}

export type T = (key: string) => string;
export type I18n = typeof import("../../public/translations/rs.json");

export const load = async (locale: Locale | I18n): Promise<I18n> => {
  if (typeof locale !== "string") {
    return locale;
  }

  const data = await import(`../../public/translations/${locale}.json`);
  return data.default;
};

interface ILocaleContext {
  i18n: I18n | null;
  loading: boolean;
  currentLocale: Locale;
  setLocale: (locale: Locale | I18n) => Promise<I18n>;
}

const LocaleContext = React.createContext<ILocaleContext>({
  i18n: null,
  loading: true,
  setLocale: (locale) => load(locale),
  currentLocale: null,
});

const LocaleProvider = ({ children, translations }) => {
  const { locale } = useRouter();
  const [i18n, setI18n] = useState<I18n>(translations);

  const setLocale = async (locale: Locale | I18n) => {
    const data = await load(locale);
    setI18n(data);
    return data;
  };

  return (
    <LocaleContext.Provider
      value={{
        i18n,
        setLocale,
        loading: !Boolean(i18n),
        currentLocale: locale as Locale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;

export const useI18n = () => {
  const ctx = React.useContext(LocaleContext);
  if (ctx == null) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return ctx;
};
