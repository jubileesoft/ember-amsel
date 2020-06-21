import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Persistence from 'ember-amsel/services/persistence';

interface NavbarArgs {}

export default class Navbar extends Component<NavbarArgs> {
  @service persistence!: Persistence;

  @tracked isExpanded = true;

  @action
  toggleIsExpanded() {
    console.log('EKL');
    this.isExpanded = !this.isExpanded;
  }
}
