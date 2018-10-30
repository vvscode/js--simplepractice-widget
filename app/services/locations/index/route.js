import Route from '@ember/routing/route';

export default Route.extend({
  model(params, transition) {
    return {
      locations: this.modelFor('services.locations'),
      serviceId: transition.params['services.locations'].serviceId,
    };
  },
});
