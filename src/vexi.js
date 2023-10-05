const ZenfiSDK = require('@zenfi/js-sdk');

const zenfi = new ZenfiSDK({
  // eslint-disable-next-line no-restricted-globals
  cookiesDomain: location.hostname.replace('www.', '').replace('solicitud.', ''),
  partnerName: 'vexi',
  targets: [
    {
      dataKey: 'email',
      selector: '#email',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'name1',
      selector: '#primer_nombre',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'name2',
      selector: '#segundo_nombre',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'lastName1',
      selector: '#primer_apellido',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'lastName2',
      selector: '#segundo_apellido',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'phone',
      selector: '#celular',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'phone',
      selector: '#confircelular',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'birthdateDay',
      selector: '#dia',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'birthdateMonth',
      selector: '#mes',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'birthdateYear',
      selector: '#anio',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
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
      dataKey: 'rfcPrefix',
      selector: '#rfc',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'rfcSuffix',
      selector: '#homoclave',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'addressStreet',
      selector: '#calle',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'addressExtNumber',
      selector: '#numero_exterior',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'addressIntNumber',
      selector: '#numero_interior',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'addressPostalCode',
      selector: '#codigo_postal',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'addressNeighborhood',
      selector: '#colonia',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'employmentStatus',
      selector: 'select#tipo_ingresos',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'income',
      selector: '#monto_mensual_ingresos',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    // Leave "birthState" and "curp" at the end
    {
      dataKey: 'birthState',
      selector: '#entidad_nacimiento select',
      afterAction: ({ element }) => element.dispatchEvent(new Event('change')),
    },
    {
      dataKey: 'curp',
      selector: '#curp',
      afterAction: ({ element, value }) => {
        element.dispatchEvent(new Event('change'));
        // Set curp again after Vexi overrides it
        setTimeout(() => {
          element.value = value;
          element.dispatchEvent(new Event('change'));
        }, 2000);
      },
    },
  ],
});

const fillZenfiData = async () => {
  await zenfi.fetchData();
  zenfi.fillTargets();

  // Autofills seconds part of the form, once its visible
  const continueBtn = document.querySelector('#modalConfirmaDatosPersonales button.btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      let interval;
      const tryFill = () => {
        const saveBtn = document.querySelector('#btn_guardar');
        const isVisible = !!saveBtn.offsetParent;
        if (!isVisible) return;
        if (interval) clearInterval(interval);
        zenfi.fillTargets();
      };
      interval = setInterval(tryFill, 500);
    });
  }
};

fillZenfiData();
zenfi.initPageViewsTracking();

module.exports = zenfi;
