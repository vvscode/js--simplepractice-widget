import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  model() {
    return this.store.findAll('clinicalProvider');
  },

  actions: {
    didTransition() {
      const params = this._router.targetState.routerJsState.params;
      const props = {
        serviceId: get(params['services.locations'] || {}, 'serviceId'),
        locationId: get(
          params['services.locations.location'] || {},
          'locationId',
        ),
      };
      this.controller.setProperties(props);
      return true; // Bubble the didTransition event
    },
  },
});
