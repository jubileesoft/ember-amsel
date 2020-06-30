import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import addPrivilegeMutation from 'ember-amsel/gql/privileges/add-privilege.graphql';
import { AddPrivilegeInput } from 'ember-amsel/gql/types';
import Ember from 'ember';
import Recorder, { RecordType } from 'ember-amsel/services/recorder';

export default class ProtectedAppManagePrivileges extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo!: any;
  @service recorder!: Recorder;

  @tracked privilegeName: string = '';
  @tracked privilegeShort: string | null = null;
  @tracked privilegeTags: Ember.NativeArray<string> = A();

  @action
  async addPrivilege(appId: string) {
    const input: AddPrivilegeInput = {
      name: this.privilegeName,
      short: this.privilegeShort ?? undefined,
      tags:
        this.privilegeTags && this.privilegeTags.length > 0
          ? this.privilegeTags
          : undefined,
    };

    const variables = {
      appId,
      input,
    };

    try {
      await this.apollo.mutate(
        { mutation: addPrivilegeMutation, variables },
        'addPrivilege',
      );

      this.recorder.addRecord(RecordType.INFO, 'Privilege created.');
    } catch (response) {
      console.log(response.errors);
      const text = response.errors[0].name + ': ' + response.errors[0].message;

      this.recorder.addRecord(RecordType.ERROR, text);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/app/manage/privileges': ProtectedAppManagePrivileges;
  }
}
