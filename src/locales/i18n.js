import i18n from 'i18n';
import got from 'got';

export default function _i18n () {
  return new Promise((resolve, reject) => {
  
    var defaultLocale = "en-US";
    i18n.configure({
      locales: ['en-US', 'es-ES', 'fr-FR'], // some widespread locales available locally
      defaultLocale: defaultLocale,
      directory: __dirname,
      updateFiles: false,
      objectNotation: true,
      retryInDefaultLocale: true,
      register: global
    });

    defaultLocale = process.env.LANG ? process.env.LANG : defaultLocale;
    const i18nSource = require('../../package.json').i18nSource;
    got(`${i18nSource}/${defaultLocale}.json`, {timeout: {request: 1000}})
    .then(r => {
      if (r.statusCode === 200) {// Add JSON translations to i18n
        i18n.addLocale(defaultLocale, JSON.parse(r.body));
        i18n.setLocale(defaultLocale);
      }
      resolve();  // resolve the promise
    })
    .catch(e => {
      console.log("Could not retrieve updated translations for the current locale");
      i18n.setLocale(defaultLocale);
      resolve();
    });
  });
};