import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProtectedAdminAppsNew extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @tracked selectedUser = null;

  @action
  onSelect(itemIndex: number) {
    console.log(itemIndex);
    this.selectedUser = this.model[itemIndex];
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/admin-apps/new': ProtectedAdminAppsNew;
  }
}
