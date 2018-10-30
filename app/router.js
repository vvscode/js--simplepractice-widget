import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('services', { path: '/' }, function() {
    this.route('locations', { path: 'service/:serviceId' }, function() {
      this.route('location', { path: 'location/:locationId' });
    });
  });
});

export default Router;
