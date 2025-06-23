const ZenfiSDK = require('@zenfi/js-sdk');

const zenfi = new ZenfiSDK({
  // eslint-disable-next-line no-restricted-globals
  cookiesDomain: location.hostname.replace('www.', ''),
  partnerName: 'amex',
  targets: [],
});

zenfi.initPageViewsTracking();

module.exports = zenfi;
