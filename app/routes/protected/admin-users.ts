import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import getAllUsersQuery from 'ember-amsel/gql/users/getAllUsers.graphql';

export default class ProtectedAdminUsers extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo;

  model() {
    return this.apollo.watchQuery({ query: getAllUsersQuery, variables: null }, 'getAllUsers');
  }
}
