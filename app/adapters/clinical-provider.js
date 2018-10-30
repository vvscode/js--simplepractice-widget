import DS from 'ember-data';
import widgetConfig from '../widgetConfig';

export default DS.JSONAPIAdapter.extend({
  urlForFindAll() {
    return `${
      widgetConfig.baseUrl
    }/client-portal-api/cpt-codes?Accept=application/ vnd.api+json&filter[clinicianId]=${
      widgetConfig.clinicalId
    }`;
  },
});
