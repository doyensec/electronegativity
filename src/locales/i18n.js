import i18n from 'i18n';
import got from 'got';

export default function _i18n () {
	var defaultLocale = "en-US";
	i18n.configure({
	  locales: ['en-US'], // widespread locales available locally
	  defaultLocale: defaultLocale,
	  directory: __dirname,
	  updateFiles: false,
	  objectNotation: true,
	  retryInDefaultLocale: true,
	  register: global
	});

  	defaultLocale = process.env.LANG ? process.env.LANG : defaultLocale;
  	const i18nSource = require('../../package.json').i18nSource;
	return got(`${i18nSource}/${defaultLocale}.json`)
	.then(r => {
	  if (r.statusCode === 200) {// Add JSON translations to i18n
	  	i18n.addLocale(defaultLocale, JSON.parse(r.body));
	  	i18n.setLocale(defaultLocale);
	  }
	})
	.catch(e => {
	  // Could not retrieve updated translations for the current locale
	});
};