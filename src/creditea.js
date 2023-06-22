const ZenfiSDK = require('zenfi-sdk');

const zenfi = new ZenfiSDK({
  // eslint-disable-next-line no-restricted-globals
  cookiesDomain: location.hostname.replace('www.', '').replace('app.', ''),
  partnerName: 'creditea',
  targets: [
    {
      dataKey: 'email',
      selector: 'input[name="sugEmail"]',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'name1',
      selector: 'input[name="sugFirstName"]',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'name2',
      selector: 'input[name="sugSecondName"]',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'lastName1',
      selector: 'input[name="sugPaternalName"]',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'lastName2',
      selector: 'input[name="sugMaternalName"]',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
  ],
});

const fillZenfiData = async () => {
  await zenfi.fetchData();
  zenfi.fillTargets();
};

fillZenfiData();
zenfi.initPageViewsTracking();

module.exports = zenfi;

// https://www.creditea.mx/mx/apply/login?signupgate=true&zftoken=g3nh2tGneAnpyiSr7Qp65U03MsnRofYZwsZGn9igTVWJ6iCEDYG1sftqRd4AEWve
