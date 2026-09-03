import { defineMiddleware, sequence } from "astro:middleware";
import { middleware as astroI18nMiddleware } from "astro:i18n";

export const userMiddleware = defineMiddleware(async (ctx, next) => {

  if (ctx.url.pathname.startsWith("/debug")) {
    return next();
  }

  return next();
});

const i18nMiddleware = astroI18nMiddleware({
  redirectToDefaultLocale: true,
  prefixDefaultLocale: true,
  fallbackType: "redirect",
});

export const onRequest = sequence(
  userMiddleware,
  i18nMiddleware
);