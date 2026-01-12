import { Injectable } from '@angular/core';
import { makeObservable } from 'mobx';
import { observable } from 'mobx-angular';
import { ExerciseService } from '../services/exercise.service';
import { BaseStore } from './base.store';
import { Exercise } from '../entities';
import { map } from 'rxjs';

@Injectable()
export class ExerciseStore extends BaseStore {
    @observable exercises: Exercise[] = null!;
    @observable selectedExercise: Exercise | null = null;

    constructor(private exerciseService: ExerciseService) {
        super();
        makeObservable(this);
    }

        public delete(id: number) {
        this.inprogress = true;
        return this.exerciseService.delete(id).pipe(
            map(() => {
                this.exercises = this.exercises.filter(e => e.id != id);
                this.inprogress = false;
                return id;
            })
        )
    }
}