import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkoutStore } from '@app/stores/workout.store';
import { ExerciseStore } from '@app/stores/exercise.store';
import { Workout } from '@app/entities';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component/add-exercise.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [
    RouterModule,
    AddExerciseComponent,
    ReactiveFormsModule
],
  templateUrl: './workout-edit.html'
})
export class WorkoutEditComponent implements OnInit {

  workoutId!: number;
  isEdit = false;
  form!: FormGroup;

  workout: Workout = {
    id: 0,
    name: '',
    type: '',
    date: new Date(),
    notes: '',
    userID: 0,
    user: { id: 0, name: '', age: 0, weight: 0, goal: '', workouts: [] },
    exercises: []   
  };

  constructor(
    private route: ActivatedRoute,
    private workoutStore: WorkoutStore,
    private exerciseStore: ExerciseStore,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      notes: new FormControl('')
    });

    const param = this.route.snapshot.paramMap.get('id');

    if (param) {
      this.isEdit = true;
      this.workoutId = Number(param);

      this.workoutStore.getWorkoutById(this.workoutId);
    }

    if (this.workout.name) this.form.patchValue({ name: this.workout.name });
    if (this.workout.type) this.form.patchValue({ type: this.workout.type });
    if (this.workout.date) this.form.patchValue({ date: this.workout.date });
    if (this.workout.notes) this.form.patchValue({ notes: this.workout.notes });
  }

  save() {
    if (this.form.invalid) return;

    const result = Object.assign({}, this.form.value);

    this.workout.name = result.name;
    this.workout.type = result.type;
    this.workout.date = result.date;
    this.workout.notes = result.notes;

    if (this.isEdit) {
      this.workoutStore.update(this.workout.id, this.workout.userID, this.workout);
    } else {
      this.workoutStore.create(this.workout.userID);
    }
  }

  removeExercise(exerciseId: number) {
    this.exerciseStore.delete(exerciseId);
  }
}
