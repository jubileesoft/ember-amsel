import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('protected', function() {
    this.route('admin-apps');
    this.route('admin-system');
    this.route('admin-users');
  });
});
