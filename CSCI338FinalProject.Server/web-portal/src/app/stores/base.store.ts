import { observable } from 'mobx-angular';

export class BaseStore {
    @observable public inprogress: boolean = false;
}