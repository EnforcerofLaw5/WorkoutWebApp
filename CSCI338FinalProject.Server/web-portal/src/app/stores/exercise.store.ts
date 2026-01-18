import { Injectable } from '@angular/core';
import { makeObservable } from 'mobx';
import { observable } from 'mobx-angular';
import { ExerciseService } from '@app/services/exercise.service';
import { BaseStore } from './base.store';
import { Exercise } from '@app/entities';

@Injectable({ providedIn: 'root' })
export class ExerciseStore extends BaseStore {
    @observable exercises: Exercise[] = null!;
    @observable selectedExercise: Exercise | null = null;

    constructor(private exerciseService: ExerciseService) {
        super();
        makeObservable(this);
    }

    public getAllExercises() {
        this.inprogress = true;
        this.exerciseService.getAll().subscribe((exercises) => {
            this.exercises = exercises;
            this.inprogress = false;
        });
    }

    public getExerciseById(id: number) {
        this.inprogress = true;
        this.exerciseService.get(id).subscribe((exercise) => {
            this.selectedExercise = exercise;
            this.inprogress = false;
        })
    }

    public create(exercise: Exercise) {
        this.inprogress = true;
        this.exerciseService.create(exercise).subscribe((created) => {
            this.selectedExercise = created;
            this.inprogress = false;
        })
    }

    public update(exercise: Exercise) {
        this.inprogress = true;
        this.exerciseService.update(exercise).subscribe((updated) => {
            this.selectedExercise = updated;
            this.inprogress = false;
        })
    }

    public delete(id: number) {
        this.inprogress = true;
        this.exerciseService.delete(id).subscribe(() => {
            this.exercises = this.exercises.filter(e => e.id != id);
            this.inprogress = false;
        })
    }
}