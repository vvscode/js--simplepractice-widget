import DS from 'ember-data';
import widgetConfig from '../widgetConfig';

console.log(widgetConfig);

export default DS.JSONAPIAdapter.extend({
  urlForFindAll() {
    const baseUrl = this.get('settings.portalBaseUrl');
    const clinicianID = this.get('settings.clinicianID');
    return `${
      widgetConfig.baseUrl
    }/client-portal-api/cpt-codes?Accept=application/ vnd.api+json&filter[clinicianId]=${
      widgetConfig.clinicalId
    }`;
  },
});
