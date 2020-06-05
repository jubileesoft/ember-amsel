import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface NavbarArgs {}

export default class Navbar extends Component<NavbarArgs> {
  @tracked isExpanded = true;

  @action
  toggleIsExpanded() {
    console.log('EKL');
    this.isExpanded = !this.isExpanded;
  }
}
