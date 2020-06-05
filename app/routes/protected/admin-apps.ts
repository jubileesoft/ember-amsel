import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import getAllAppsQuery from 'ember-amsel/gql/apps/getAllApps.graphql';

export default class ProtectedAdminApps extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo;

  model() {
    return this.apollo.watchQuery({ query: getAllAppsQuery, variables: null }, 'getAllApps');
  }
}
