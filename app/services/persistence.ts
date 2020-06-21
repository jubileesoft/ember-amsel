import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const STORAGE = {
  SELECTEDAPPID: 'selectedAppId',
};

export default class Persistence extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @tracked selectedAppId: string | null = null;

  constructor() {
    super(...arguments);
    const localStorageValue = localStorage.getItem(STORAGE.SELECTEDAPPID);
    if (localStorageValue) {
      this.selectedAppId = localStorageValue;
    }
  }

  setSelectedAppId(id: string) {
    localStorage.setItem(STORAGE.SELECTEDAPPID, id);
    this.selectedAppId = id;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    persistence: Persistence;
  }
}
