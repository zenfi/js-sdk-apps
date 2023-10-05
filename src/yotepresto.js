const ZenfiSDK = require('@zenfi/js-sdk');

const zenfi = new ZenfiSDK({
  // eslint-disable-next-line no-restricted-globals
  cookiesDomain: location.hostname.replace('www.', '').replace('mx1.', ''),
  partnerName: 'yotepresto',
  targets: [
    {
      dataKey: 'email',
      selector: '#auth-email',
    },
    {
      dataKey: 'name1',
      selector: '#profile_first_name',
    },
    {
      dataKey: 'name2',
      selector: '#profile_second_name',
    },
    {
      dataKey: 'lastName1',
      selector: '#profile_first_last_name',
    },
    {
      dataKey: 'lastName2',
      selector: '#profile_second_last_name',
    },
    {
      dataKey: 'monthlyIncome',
      selector: '#requisition_income_income',
    },
    {
      dataKey: 'phone',
      selector: '#profile_cell_phone_number',
    },
    {
      dataKey: 'birthState',
      selector: '#profile_birth_state_id',
      afterAction: ({ element }) => {
        if (element) element.parentElement.classList.add('changed');
      },
    },
    {
      dataKey: 'birthdateDay',
      selector: '#profile_birth_date_3i_',
    },
    {
      dataKey: 'birthdateMonth',
      selector: '#profile_birth_date_2i_',
      afterAction: ({ element }) => {
        if (element) element.parentElement.classList.add('changed');
      },
    },
    {
      dataKey: 'birthdateYear',
      selector: '#profile_birth_date_1i_',
    },
    {
      dataKey: 'addressStreet',
      selector: '#profile_address_attributes_street',
    },
    {
      dataKey: 'addressExtNumber',
      selector: '#profile_address_attributes_ext_number',
    },
    {
      dataKey: 'addressIntNumber',
      selector: '#profile_address_attributes_int_number',
    },
    {
      dataKey: 'coupon',
      selector: '#applied_coupon_code',
      beforeAction: () => {
        const useCoupon = document.querySelector('.coupon-info a');
        if (useCoupon) useCoupon.click();
      },
      afterAction: () => {
        const applyCoupon = document.querySelector('.coupon-info [type=submit]');
        if (applyCoupon) applyCoupon.click();
      },
    },
    {
      dataKey: 'creditAmount',
      selector: '#requisition_loan_information_requested_amount',
    },
    // Postal code is disabled. Otherwise City and Neighborhood inputs are not shown.
    // {
    //   dataKey: 'addressPostalCode',
    //   selector: '#profile_address_attributes_zip',
    // },
    {
      dataKey: 'imss',
      selector: ({ value }) => `#requisition_income_has_imss_${value}`,
      strategy: 'click',
    },
    {
      dataKey: 'healthInsurance',
      selector: ({ value }) => `#requisition_income_has_sgmm_${value}`,
      strategy: 'click',
    },
    {
      dataKey: 'educationLevel',
      selector: '#profile_education_id',
      afterAction: ({ element }) => {
        if (element) element.parentElement.classList.add('changed');
      },
    },
    {
      dataKey: 'employmentStatus',
      selector: ({ value }) => `#requisition_income_employee_type_id_${value}`,
      strategy: 'click',
    },
    {
      dataKey: 'creditLimit',
      selector: '#requisition_loan_information_requested_amount',
    },
  ],
});

const storeParam = ({ urlParam, cookieName, cookieExpires }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get(urlParam) || null;
  if (!value) return;
  zenfi.cookies.set(cookieName, value, cookieExpires);
};

const getValue = ({ cookieName, parser }) => {
  const value = zenfi.cookies.get(cookieName);
  if (!value) return null;
  return parser ? parser(value) : value;
};

const fillZenfiData = async () => {
  storeParam({ urlParam: 'coupon', cookieName: 'ytp_coupon', cookieExpires: 1 });
  storeParam({ urlParam: 'amount', cookieName: 'ytp_amount', cookieExpires: 1 });
  const coupon = getValue({ cookieName: 'ytp_coupon' });
  const creditAmount = getValue({ cookieName: 'ytp_amount', parser: (v) => parseInt(v, 10) });
  await zenfi.fetchData();
  zenfi.leadInfo = { ...zenfi.leadInfo, coupon, creditAmount };
  zenfi.fillTargets();
};

fillZenfiData();
zenfi.initPageViewsTracking();

module.exports = zenfi;
