const ZenfiSDK = require('@zenfi/js-sdk');

const triggerChange = ({ element }) => element.dispatchEvent(new Event('input', { bubbles: true }));

const zenfi = new ZenfiSDK({
  // eslint-disable-next-line no-restricted-globals
  cookiesDomain: location.hostname.replace('www.', '').replace('app.', ''),
  partnerName: 'creditea',
  targets: [
    // Page 1
    {
      dataKey: 'email',
      strategy: 'nativeValue',
      selector: 'input[name="sugEmail"]',
      afterAction: triggerChange,
    },
    {
      dataKey: 'name1',
      strategy: 'nativeValue',
      selector: 'input[name="sugFirstName"]',
      afterAction: triggerChange,
    },
    {
      dataKey: 'name2',
      strategy: 'nativeValue',
      selector: 'input[name="sugSecondName"]',
      afterAction: triggerChange,
    },
    {
      dataKey: 'lastName1',
      strategy: 'nativeValue',
      selector: 'input[name="sugPaternalName"]',
      afterAction: triggerChange,
    },
    {
      dataKey: 'lastName2',
      strategy: 'nativeValue',
      selector: 'input[name="sugMaternalName"]',
      afterAction: triggerChange,
    },
    // Page 2
    {
      dataKey: 'curp',
      strategy: 'nativeValue',
      selector: 'input[name="SSN"]',
      afterAction: triggerChange,
    },
    {
      dataKey: 'phone',
      strategy: 'nativeValue',
      selector: 'input[name="msisdn"]',
      afterAction: triggerChange,
    },
    {
      // For some reason the phone field must be filled twice
      dataKey: 'phone',
      strategy: 'nativeValue',
      selector: 'input[name="msisdn"]',
      afterAction: triggerChange,
    },
    // Page 3
    {
      dataKey: 'email',
      strategy: 'nativeValue',
      selector: 'input[name="emailConfirm"]',
      afterAction: triggerChange,
    },
    // Page 4
    {
      dataKey: 'street',
      strategy: 'nativeValue',
      selector: 'input[name="street"]',
      afterAction: triggerChange,
    },
    {
      dataKey: 'extNumber',
      strategy: 'nativeValue',
      selector: 'input[name="externalNumber"]',
      afterAction: triggerChange,
    },
    {
      dataKey: 'intNumber',
      strategy: 'nativeValue',
      selector: 'input[name="internalNumber"]',
      afterAction: triggerChange,
    },
    {
      dataKey: 'postalCode',
      strategy: 'nativeValue',
      selector: 'input[name="postalCode"]',
      beforeAction: ({ element }) => {
        if (!element) return;
        element.dispatchEvent(new Event('focus', { bubbles: true }));
      },
      afterAction: triggerChange,
    },
    // Page 5
    {
      dataKey: 'income',
      strategy: 'nativeValue',
      selector: 'input[name="netIncome"]',
      afterAction: triggerChange,
    },
  ],
});

const bindForm = (selector, callback) => {
  const form = document.querySelector(selector);
  if (form) form.addEventListener('submit', callback);
};

const fillZenfiData = () => {
  zenfi.fillTargets();
  bindForm('.signup-gate', () => setTimeout(fillZenfiData, 1000));
};

const executeZenfiAutofill = async () => {
  await zenfi.fetchData();
  window.addEventListener('locationchange', fillZenfiData);
  fillZenfiData();
};

executeZenfiAutofill();
zenfi.initPageViewsTracking();

module.exports = zenfi;
