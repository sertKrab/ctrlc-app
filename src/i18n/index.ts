import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import thCommon from '@/locales/th/common.json';
import thAuth from '@/locales/th/auth.json';
import thNavigation from '@/locales/th/navigation.json';

import enCommon from '@/locales/en/common.json';
import enAuth from '@/locales/en/auth.json';
import enNavigation from '@/locales/en/navigation.json';

i18n.use(initReactI18next).init({
  lng: (import.meta.env.VITE_DEFAULT_LOCALE as string) || 'th',
  fallbackLng: 'en',
  ns: ['common', 'auth', 'navigation'],
  defaultNS: 'common',
  resources: {
    th: {
      common: thCommon,
      auth: thAuth,
      navigation: thNavigation,
    },
    en: {
      common: enCommon,
      auth: enAuth,
      navigation: enNavigation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
