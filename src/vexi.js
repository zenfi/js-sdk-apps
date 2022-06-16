const ZenfiSDK = require('zenfi-sdk');

const zenfi = new ZenfiSDK({
  // eslint-disable-next-line no-restricted-globals
  cookiesDomain: location.hostname.replace('www.', '').replace('solicitud.', ''),
  partnerName: 'vexi',
  targets: [
    {
      dataKey: 'email',
      selector: '#email',
    },
    {
      dataKey: 'name1',
      selector: '#primer_nombre',
    },
    {
      dataKey: 'name2',
      selector: '#segundo_nombre',
    },
    {
      dataKey: 'lastName1',
      selector: '#primer_apellido',
    },
    {
      dataKey: 'lastName2',
      selector: '#segundo_apellido',
    },
    {
      dataKey: 'phone',
      selector: '#celular',
    },
    {
      dataKey: 'phone',
      selector: '#confircelular',
    },
    {
      dataKey: 'birthdateDay',
      selector: '#dia',
    },
    {
      dataKey: 'birthdateMonth',
      selector: '#mes',
    },
    {
      dataKey: 'birthdateYear',
      selector: '#anio',
    },
    {
      dataKey: 'nationality',
      selector: ({ value }) => `#${value}`,
      strategy: 'click',
    },
    {
      dataKey: 'gender',
      selector: ({ value }) => `#${value}`,
      strategy: 'click',
    },
    {
      dataKey: 'curp',
      selector: '#curp',
    },
    {
      dataKey: 'rfcPrefix',
      selector: '#rfc',
    },
    {
      dataKey: 'rfcSuffix',
      selector: '#homoclave',
    },
    {
      dataKey: 'addressStreet',
      selector: '#calle',
    },
    {
      dataKey: 'addressExtNumber',
      selector: '#numero_exterior',
    },
    {
      dataKey: 'addressIntNumber',
      selector: '#numero_interior',
    },
    {
      dataKey: 'addressNeighborhood',
      selector: '#colonia',
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
