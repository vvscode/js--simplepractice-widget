'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'simplepractice-widget',
    environment,
    rootURL: '/',
    locationType: 'hash', // none
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      // @todo: move to options
    },
  };

  return ENV;
};
