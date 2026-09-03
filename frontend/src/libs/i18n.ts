import { getRelativeLocaleUrl } from 'astro:i18n';
import { atom } from 'nanostores';

export const currentLocaleStore = atom<string>('en');

export function Url(link: string | any, locale?: string | undefined) {
    const activeLocale = locale || currentLocaleStore.get() || 'en';
    const cleanLink = typeof link === 'string' 
        ? (link.startsWith('/') ? link : `/${link}`)
        : '/';

    return getRelativeLocaleUrl(activeLocale, cleanLink);
}
