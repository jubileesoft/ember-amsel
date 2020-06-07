import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import getAppsQuery from 'ember-amsel/gql/apps/getApps.graphql';

export default class ProtectedAdminApps extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo;

  model() {
    return this.apollo.watchQuery(
      { query: getAppsQuery, variables: null, fetchPolicy: 'cache-and-network' },
      'getApps',
    );
  }
}
