import { NextRequest, NextResponse } from "next/server";

import routes from "@constants/routes";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { locale, pathname } = req.nextUrl;
  if (!PUBLIC_FILE.test(pathname)) {
    const arr = pathname.split("/");
    let path = null;
    let rest = null;

    if (arr.length === 2) {
      path = pathname;
    } else {
      rest = arr.splice(-1);
      path = arr.join("/");
    }

    // proper route but should be linked to OG route - so we look for OG route
    const routePair = Object.entries(routes[locale]).find(
      ([, localizedRoute]) => {
        return localizedRoute === path;
      }
    );

    if (routePair && routePair[0]) {
      const base = routePair[0];
      const pathname = rest === null ? `/${base}` : `/${base}/${rest}`;

      req.nextUrl.pathname = pathname;
      return NextResponse.rewrite(req.nextUrl);
    }

    // not proper route locale - should redirect to proper locale route
    path = path.split("/")[1];
    const entry = Object.entries(routes[locale]).find(([key]) => {
      return key === path;
    });

    if (entry) {
      const [, localized] = entry;
      const pathname = rest === null ? `${localized}` : `${localized}/${rest}`;
      req.nextUrl.pathname = pathname;
      return NextResponse.redirect(req.nextUrl);
    }
  }
}
