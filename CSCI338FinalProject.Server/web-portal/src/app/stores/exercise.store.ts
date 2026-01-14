import { Injectable } from '@angular/core';
import { makeObservable } from 'mobx';
import { observable } from 'mobx-angular';
import { ExerciseService } from '@app/services/exercise.service';
import { BaseStore } from './base.store';
import { Exercise } from '@app/entities';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExerciseStore extends BaseStore {
    @observable exercises: Exercise[] = null!;
    @observable selectedExercise: Exercise | null = null;

    constructor(private exerciseService: ExerciseService) {
        super();
        makeObservable(this);
    }

    public delete(id: number) {
        this.inprogress = true;
        this.exerciseService.delete(id).subscribe(() => {
            this.exercises = this.exercises.filter(e => e.id != id);
            this.inprogress = false;
        })
    }
}