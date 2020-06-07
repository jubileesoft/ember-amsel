import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import addAppMutation from 'ember-amsel/gql/apps/addApp.graphql';
import { AddAppInput, App } from 'ember-amsel/gql/types';
import Type from 'ember__routing';

export default class ProtectedAdminAppsNew extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo: any;
  @service router!: Type.Router;

  @tracked selectedUser = null;

  @action
  async save() {
    const input: AddAppInput = {
      name: this.name,
      owner: this.owner,
    };

    console.log(input);
    const variables = {
      input,
    };

    try {
      const newApp: App = await this.apollo.mutate({ mutation: addAppMutation, variables }, 'addApp');
      this.router.transitionTo('protected.admin-apps.id', newApp.id);
    } catch (error) {}
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/admin-apps/new': ProtectedAdminAppsNew;
  }
}
