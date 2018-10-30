import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import widgetConfig from '../../../widgetConfig';

export default Component.extend({
  classNames: ['services--progress-stepper'],
  router: inject(),

  serviceId: null,
  locationId: null,

  clinicName: computed(() => widgetConfig.clinicalName),
  items: computed(
    'router.currentRouteName',
    'clinicName',
    'serviceId',
    function() {
      const currentRouteName = this.get('router.currentRouteName');
      const serviceId = this.get('serviceId');

      return [
        {
          title: `Clinician: ${this.get('clinicName')}`,
          passed: true,
        },
        { title: `Select a service`, passed: true, link: ['services'] },
        {
          title: `Select  a location`,
          passed: currentRouteName.includes('locations'),
          link: ['services.locations', serviceId],
        },
        {
          title: `Select date and timet`,
          passed: currentRouteName.endsWith('location'),
        },
        { title: `Your information` },
      ];
    },
  ),

  actions: {
    navigateTo(params) {
      this.router.transitionTo(...params);
    },
  },
});
