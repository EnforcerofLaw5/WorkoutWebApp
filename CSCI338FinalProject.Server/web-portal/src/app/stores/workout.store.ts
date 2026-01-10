import { Injectable } from '@angular/core';
import { makeObservable } from 'mobx';
import { observable } from 'mobx-angular';

import { WorkoutService } from '../services/workout.service';
import { BaseStore } from './base.store';
import { Workout, Exercise } from '../entities';

@Injectable()
export class WorkoutStore extends BaseStore {
    @observable workouts: Workout[] = null!;
    @observable selectedWorkout: Workout | null = null;

    constructor(private workoutService: WorkoutService) {
        super();
        makeObservable(this);
    }

    public getAllWorkouts() {
        this.inprogress = true;
        this.workoutService.getAll().subscribe((p) => {
            this.workouts = p;
            this.inprogress = false;
        });
    }

    public getWorkoutById(id: number) {
        this.inprogress = true;
        this.workoutService.get(id).subscribe((workout) => {
            this.selectedWorkout = workout;
            this.inprogress = false;
        });
    }

    public deleteWorkout(id: number) {
        this.inprogress = true;
        this.workoutService.delete(id).subscribe(() => {
            this.workouts = this.workouts.filter(w => w.id !== id);
            this.inprogress = false;
        });
    }
}