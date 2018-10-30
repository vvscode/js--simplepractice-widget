"use strict";



define('simplepractice-widget/adapters/clinical-provider', ['exports', 'ember-data', 'simplepractice-widget/widgetConfig'], function (exports, _emberData, _widgetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    urlForFindAll() {
      return `${_widgetConfig.default.baseUrl}/client-portal-api/cpt-codes?Accept=application/ vnd.api+json&filter[clinicianId]=${_widgetConfig.default.clinicalId}`;
    }
  });
});
define('simplepractice-widget/app', ['exports', 'simplepractice-widget/resolver', 'ember-load-initializers', 'simplepractice-widget/config/environment', 'simplepractice-widget/widgetConfig'], function (exports, _resolver, _emberLoadInitializers, _environment, _widgetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    rootElement: _widgetConfig.default.el,
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('simplepractice-widget/components/services/progress-stepper/component', ['exports', 'simplepractice-widget/widgetConfig'], function (exports, _widgetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['services--progress-stepper'],
    router: Ember.inject.service(),
    store: Ember.inject.service(),

    serviceId: null,
    locationId: null,

    clinicName: Ember.computed(() => _widgetConfig.default.clinicalName),
    items: Ember.computed('router.currentRouteName', 'clinicName', 'serviceId', function () {
      const currentRouteName = this.get('router.currentRouteName');
      const serviceId = this.get('serviceId');

      return [{
        title: `Clinician`,
        subtitle: this.get('clinicName'),
        passed: true,
        link: ['services']
      }, {
        title: `Select a service`,
        subtitle: serviceId ? this.store.peekRecord('clinical-provider', serviceId).get('description') : '',
        passed: true,
        link: ['services']
      }, {
        title: `Select  a location`,
        subtitle: '',
        passed: currentRouteName.includes('locations'),
        link: ['services.locations', serviceId]
      }, {
        title: `Select date and timet`,
        subtitle: '',
        passed: currentRouteName.endsWith('location')
      }, { title: `Your information` }];
    }),

    actions: {
      navigateTo(params) {
        this.router.transitionTo(...params);
      }
    }
  });
});
define("simplepractice-widget/components/services/progress-stepper/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "g0KAuADo", "block": "{\"symbols\":[\"item\"],\"statements\":[[6,\"ol\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"items\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[11,\"class\",[27,[\" step \",[26,\"if\",[[21,1,[\"passed\"]],\"passed\",\"\"],null]]]],[8],[0,\"\\n\"],[4,\"if\",[[26,\"and\",[[21,1,[\"passed\"]],[21,1,[\"link\"]]],null]],null,{\"statements\":[[0,\"        \"],[6,\"span\"],[10,\"class\",\"title\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"navigateTo\",[21,1,[\"link\"]]],null],null],[8],[1,[21,1,[\"title\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"span\"],[10,\"class\",\"title\"],[8],[1,[21,1,[\"title\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]}],[4,\"if\",[[21,1,[\"subtitle\"]]],null,{\"statements\":[[0,\"        \"],[6,\"br\"],[8],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"subtitle\"],[8],[1,[21,1,[\"subtitle\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"]],\"parameters\":[1]},null],[0,\" \"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "simplepractice-widget/components/services/progress-stepper/template.hbs" } });
});
define('simplepractice-widget/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
define('simplepractice-widget/helpers/app-version', ['exports', 'simplepractice-widget/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('simplepractice-widget/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
define('simplepractice-widget/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
define('simplepractice-widget/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
define('simplepractice-widget/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
define('simplepractice-widget/helpers/is-empty', ['exports', 'ember-truth-helpers/helpers/is-empty'], function (exports, _isEmpty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
define('simplepractice-widget/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('simplepractice-widget/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
define('simplepractice-widget/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
define('simplepractice-widget/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
define('simplepractice-widget/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
define('simplepractice-widget/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
define('simplepractice-widget/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('simplepractice-widget/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('simplepractice-widget/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
define('simplepractice-widget/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'simplepractice-widget/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('simplepractice-widget/initializers/component-styles', ['exports', 'ember-component-css/initializers/component-styles', 'simplepractice-widget/mixins/style-namespacing-extras'], function (exports, _componentStyles, _styleNamespacingExtras) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = exports.default = undefined;
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _componentStyles.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _componentStyles.initialize;
    }
  });


  // eslint-disable-next-line ember/new-module-imports
  Ember.Component.reopen(_styleNamespacingExtras.default);
});
define('simplepractice-widget/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('simplepractice-widget/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('simplepractice-widget/initializers/export-application-global', ['exports', 'simplepractice-widget/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('simplepractice-widget/initializers/route-styles', ['exports', 'ember-component-css/initializers/route-styles'], function (exports, _routeStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _routeStyles.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _routeStyles.initialize;
    }
  });
});
define("simplepractice-widget/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('simplepractice-widget/mixins/style-namespacing-extras', ['exports', 'ember-component-css/mixins/style-namespacing-extras'], function (exports, _styleNamespacingExtras) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _styleNamespacingExtras.default;
    }
  });
});
define('simplepractice-widget/models/clinical-provider', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    callToBook: _emberData.default.attr('boolean'),
    description: _emberData.default.attr('string'),
    duration: _emberData.default.attr('string'),
    rate: _emberData.default.attr('string')
  });
});
define('simplepractice-widget/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('simplepractice-widget/router', ['exports', 'simplepractice-widget/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('services', { path: '/' }, function () {
      this.route('locations', { path: 'service/:serviceId' }, function () {
        this.route('location', { path: 'location/:locationId' });
      });
    });
  });

  exports.default = Router;
});
define('simplepractice-widget/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPISerializer.extend({
    modelNameFromPayloadKey() {
      return 'clinical-provider';
    },
    keyForAttribute(key) {
      return key;
    }
  });
});
define('simplepractice-widget/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('simplepractice-widget/services/index/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.modelFor('services');
    }
  });
});
define("simplepractice-widget/services/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ON5TMtNR", "block": "{\"symbols\":[\"item\"],\"statements\":[[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"card\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"card-body\"],[8],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"card-title\"],[8],[1,[21,1,[\"description\"]],false],[9],[0,\"\\n      \"],[4,\"link-to\",[\"services.locations\",[21,1,[\"id\"]]],[[\"class\"],[\"btn btn-primary float-right\"]],{\"statements\":[[0,\"Select\"]],\"parameters\":[]},null],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "simplepractice-widget/services/index/template.hbs" } });
});
define('simplepractice-widget/services/locations/index/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params, transition) {
      return {
        locations: this.modelFor('services.locations'),
        serviceId: transition.params['services.locations'].serviceId
      };
    }
  });
});
define("simplepractice-widget/services/locations/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "VhoZNjel", "block": "{\"symbols\":[\"item\"],\"statements\":[[6,\"div\"],[10,\"class\",\"d-flex flex-row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"locations\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"card\"],[10,\"style\",\"width: 18rem;\"],[8],[0,\"\\n      \"],[6,\"img\"],[10,\"class\",\"card-img-top\"],[11,\"src\",[27,[\"https://maps.googleapis.com/maps/api/staticmap?center=\",[26,\"concat\",[[21,1,[\"street\"]],\" \",[21,1,[\"city\"]],\", \",[21,1,[\"state\"]]],null],\"&zoom=13&size=600x300&maptype=roadmap&key=AIzaSyDHezCYmpwBRLMCBmqt55TQDP3430Zrt-U\"]]],[10,\"alt\",\"Place map here\"],[8],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"card-body\"],[8],[0,\"\\n        \"],[6,\"h5\"],[10,\"class\",\"card-title\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n        \"],[6,\"p\"],[10,\"class\",\"card-text\"],[8],[1,[21,1,[\"state\"]],false],[0,\" \"],[1,[21,1,[\"city\"]],false],[0,\" \"],[1,[21,1,[\"street\"]],false],[0,\", \"],[1,[21,1,[\"zip\"]],false],[9],[0,\"\\n        \"],[6,\"p\"],[10,\"class\",\"card-text\"],[8],[1,[21,1,[\"phone\"]],false],[9],[0,\"\\n\"],[4,\"link-to\",[\"services.locations.location\",[22,[\"model\",\"serviceId\"]],[21,1,[\"id\"]]],[[\"class\"],[\"btn btn-primary btn-block\"]],{\"statements\":[[0,\"          Select\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "simplepractice-widget/services/locations/index/template.hbs" } });
});
define('simplepractice-widget/services/locations/location/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define("simplepractice-widget/services/locations/location/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "y+Tt5KOn", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[6,\"h2\"],[8],[0,\"Location page\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"Select you date and time\"],[9],[0,\"\\n  \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "simplepractice-widget/services/locations/location/template.hbs" } });
});
define('simplepractice-widget/services/locations/route', ['exports', 'simplepractice-widget/widgetConfig'], function (exports, _widgetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  exports.default = Ember.Route.extend({
    model(params) {
      return Ember.$.getJSON(`${_widgetConfig.default.baseUrl}/client-portal-api/offices?Accept=application/vn
d.api+json&filter[clinicianId]=${_widgetConfig.default.clinicalId}&filter[cptCodeId]=${params.serviceId}`).then(response => response.data.map(el => _extends({
        id: el.id
      }, el.attributes)));
    }
  });
});
define('simplepractice-widget/services/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.store.findAll('clinicalProvider');
    },

    actions: {
      didTransition() {
        const params = this._router.targetState.routerJsState.params;
        const props = {
          serviceId: Ember.get(params['services.locations'] || {}, 'serviceId'),
          locationId: Ember.get(params['services.locations.location'] || {}, 'locationId')
        };
        this.controller.setProperties(props);
        return true; // Bubble the didTransition event
      }
    }
  });
});
define("simplepractice-widget/services/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bMClnbth", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-2\"],[8],[0,\"\\n      \"],[1,[26,\"services/progress-stepper\",null,[[\"serviceId\",\"locationId\"],[[22,[\"serviceId\"]],[22,[\"locationId\"]]]]],false],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-10\"],[8],[0,\"\\n      \"],[1,[20,\"outlet\"],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "simplepractice-widget/services/template.hbs" } });
});
define('simplepractice-widget/widgetConfig', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const EL_SELECTOR = '#simple-practice-widget';

  const el = document.querySelector(EL_SELECTOR);
  const baseUrl = el.dataset.portalbaseurl;
  const clinicalId = el.dataset.clinicianid;

  exports.default = {
    el: EL_SELECTOR,
    baseUrl: `https://cors.io/?${baseUrl}`,
    clinicalId,
    clinicalName: 'Rob Gross, MFT' // I didn't guess where should I get this name - looks like some other api
  };
});


define('simplepractice-widget/config/environment', [], function() {
  var prefix = 'simplepractice-widget';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("simplepractice-widget/app")["default"].create({"name":"simplepractice-widget","version":"0.0.0+50bcaac6"});
}
//# sourceMappingURL=simplepractice-widget.map
