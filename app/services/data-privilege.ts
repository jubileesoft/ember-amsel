import Service from '@ember/service';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { Privilege, UpdatePrivilegeInput } from 'ember-amsel/gql/types';
import UpdatePrivilegeMutation from 'ember-amsel/gql/privileges/update-privilege.graphql';
import ApolloService from 'ember-amsel/services/apollo';
import Recorder, { Record, RecordType } from 'ember-amsel/services/recorder';

export default class DataPrivilege extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo!: ApolloService;
  @service recorder!: Recorder;

  @action
  async updateProperty(
    privilege: Privilege,
    propertyName: string,
    propertyValue: any,
  ) {
    if ((privilege as any)[propertyName] === propertyValue) {
      return;
    }

    const variables: { privilegeId: string; input: UpdatePrivilegeInput } = {
      privilegeId: privilege.id,
      input: {},
    };

    (variables.input as any)[propertyName] = propertyValue;

    try {
      await this.apollo.mutate(
        { mutation: UpdatePrivilegeMutation, variables },
        'updatePrivilege',
      );
    } catch (resultError) {
      const message = this.apollo.errorResultToString(resultError);
      this.recorder.addRecord(RecordType.ERROR, message);
      throw resultError;
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'data-privilege': DataPrivilege;
  }
}
