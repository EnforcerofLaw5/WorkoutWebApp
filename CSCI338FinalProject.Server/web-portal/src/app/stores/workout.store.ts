import { Injectable } from '@angular/core';
import { makeObservable } from 'mobx';
import { observable } from 'mobx-angular';
import { WorkoutService } from '../services/workout.service';
import { BaseStore } from './base.store';
import { Workout } from '../entities';
import { map } from 'rxjs';

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
        return this.workoutService.getAll().pipe(
            map(workouts => {
                this.workouts = workouts;
                this.inprogress = false;
                return workouts;
            })
        )
    }

    public getWorkoutById(id: number) {
        this.inprogress = true;
        return this.workoutService.get(id).pipe(
            map(workout => {
            this.selectedWorkout = workout;
            this.inprogress = false;
            return workout;
            })
        );
    }

    public create(userId: number) {
        this.inprogress = true;
        return this.workoutService.create(userId).pipe(
            map(created => {
                this.selectedWorkout = created;
                this.inprogress = false;
                return created;

            })
        )
    }

    public update(id: number, userId: number, workout: Workout) {
        this.inprogress = true;
        return this.workoutService.update(id, userId, workout).pipe(
            map(updated => {
                this.selectedWorkout = updated;
                this.inprogress = false;
                return updated;
            })
        )
    }

    public deleteWorkout(id: number) {
        this.inprogress = true;
        return this.workoutService.delete(id).pipe(
        map(() => {
            this.workouts = this.workouts.filter(w => w.id != id);
            this.inprogress = false;
            return id;
            })
        )
    }
}