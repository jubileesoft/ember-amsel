import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import getAllUsersQuery from 'ember-amsel/gql/users/getAllUsers.graphql';

export default class ProtectedAdminAppsNew extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo;

  model() {
    return this.apollo.query({ query: getAllUsersQuery }, 'getAllUsers');
  }
}
