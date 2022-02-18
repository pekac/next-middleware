import React from "react";

import LocaleProvider, { I18n } from "./locale";

export interface IAppProviders {
  translations: I18n;
}

const AppProviders: React.FC<IAppProviders> = ({ children, translations }) => {
  return (
    <LocaleProvider translations={translations}>{children}</LocaleProvider>
  );
};

export default AppProviders;
