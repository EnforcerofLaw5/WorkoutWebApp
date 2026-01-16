import { Injectable } from '@angular/core';
import { makeObservable } from 'mobx';
import { observable } from 'mobx-angular';
import { WorkoutService } from '@app/services/workout.service';
import { BaseStore } from './base.store';
import { Workout, Exercise } from '@app/entities';

@Injectable()
export class WorkoutStore extends BaseStore {
    @observable workouts: Workout[] = null!;
    @observable selectedWorkout: Workout | null = null;
    @observable selectedExercise: Exercise | null = null;

    constructor(private workoutService: WorkoutService) {
        super();
        makeObservable(this);
    }

    public getAllWorkouts() {
        this.inprogress = true;
        this.workoutService.getAll().subscribe((workouts) => {
            this.workouts = workouts;
            this.inprogress = false;
        });
    }

    public getWorkoutById(id: number) {
        this.inprogress = true;
        this.workoutService.get(id).subscribe((workout) => {
            this.selectedWorkout = workout;
            this.inprogress = false;
        })
    }

    public create(workout: Workout) {
        this.inprogress = true;
        this.workoutService.create(workout).subscribe((created) => {
            this.selectedWorkout = created;
            this.inprogress = false;
        })
    }

    public update(workout: Workout) {
        this.inprogress = true;
        this.workoutService.update(workout).subscribe((updated) => {
            this.selectedWorkout = updated;
            this.inprogress = false;
        })
    }

    public deleteWorkout(id: number) {
        this.inprogress = true;
        return this.workoutService.delete(id).subscribe(() => {
            this.workouts = this.workouts.filter(w => w.id !== id);
            this.inprogress = false;
        })
    }

    public addToWorkout(workoutId: number, exercise: Exercise) {
        this.inprogress = true;
        this.workoutService.addToWorkout(workoutId, exercise).subscribe((added) => {
            this.selectedExercise = added;
            this.inprogress = false;
        })
    }
}