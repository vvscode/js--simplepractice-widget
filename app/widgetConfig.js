const EL_SELECTOR = '#simple-practice-widget';

const el = document.querySelector(EL_SELECTOR);
const baseUrl = el.dataset.portalbaseurl;
const clinicalId = el.dataset.clinicianid;

export default {
  el: EL_SELECTOR,
  baseUrl: `https://cors.io/?${baseUrl}`,
  clinicalId,
};
