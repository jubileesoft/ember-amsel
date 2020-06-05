import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface AmselInputArgs {
  value?: string;
  items?: any[];
  displayPropertyName?: string;
  delay?: number;
}

export default class AmselInput extends Component<AmselInputArgs> {
  @tracked foundItems = A();

  get hasFoundItems() {
    return this.foundItems.length > 0;
  }

  get delay() {
    return this.args.delay || 0;
  }

  @(task(function* (event) {
    yield timeout(this.delay);
    this.handleOnInput(event);
  }).restartable())
  onInputTask;

  handleOnInput(event: UIEvent) {
    if (!Array.isArray(this.args.items) || !this.args.displayPropertyName) {
      return;
    }

    const searchString = (event.target as HTMLInputElement).value.toLowerCase();
    if (!searchString) {
      return; // do nothing on empty search
    }

    const resultArray: any[] = [];
    this.args.items.forEach((item) => {
      if (item[this.args.displayPropertyName!].toLowerCase().includes(searchString)) {
        resultArray.push(item);
      }
    });
    this.foundItems = A(resultArray);
    console.log(this.foundItems);
  }

  @action
  onKeyDown(event) {}
}
