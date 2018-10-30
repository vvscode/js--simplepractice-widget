import Route from '@ember/routing/route';
import $ from 'jquery';
import widgetConfig from '../../widgetConfig';

export default Route.extend({
  model(params) {
    return $.getJSON(
      `${widgetConfig.baseUrl}/client-portal-api/offices?Accept=application/vn
d.api+json&filter[clinicianId]=${widgetConfig.clinicalId}&filter[cptCodeId]=${
        params.id
      }`,
    ).then(response =>
      response.data.map(el => ({
        id: el.id,
        ...el.attributes,
      })),
    );
  },
});
