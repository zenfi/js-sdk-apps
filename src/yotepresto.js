const ZenfiSDK = require('zenfi-sdk');

const zenfi = new ZenfiSDK({
  // eslint-disable-next-line no-restricted-globals
  cookiesDomain: location.hostname.replace('www.', ''),
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

zenfi.fillTargets();

module.exports = zenfi;
