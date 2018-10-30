import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import widgetConfig from '../../../widgetConfig';

export default Component.extend({
  classNames: ['services--progress-stepper'],
  router: inject(),
  clinicName: computed(() => widgetConfig.clinicalName),
  items: computed('router.currentRouteName', 'clinicName', function() {
    const currentRouteName = this.get('router.currentRouteName');

    return [
      {
        title: `Clinician: ${this.get('clinicName')}`,
        passed: true,
      },
      { title: `Select a service`, passed: true, link: 'services' },
      {
        title: `Select  a location`,
        passed: currentRouteName.includes('locations'),
      },
      { title: `Select date and timet` },
      { title: `Your information` },
    ];
  }),
});
