import { Injectable } from '@angular/core';
import { makeObservable } from 'mobx';
import { observable } from 'mobx-angular';
import { UserService } from '@app/services/uers.service';
import { BaseStore } from './base.store';
import { User } from '@app/entities';

@Injectable()
export class UserStore extends BaseStore {
    @observable currentUser: User | null = null;

    constructor(private userService: UserService) {
        super();
        makeObservable(this);
    }

    public getUserById(id: number) {
        this.inprogress = true;
        this.userService.get(id).subscribe((user) => {
            this.currentUser = user;
            this.inprogress = false;
        })
    }
}