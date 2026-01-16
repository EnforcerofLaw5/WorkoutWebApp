import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkoutStore } from '@app/stores/workout.store';
import { ExerciseStore } from '@app/stores/exercise.store';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component/add-exercise.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MobxAngularModule } from "mobx-angular";
import { when } from 'mobx';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [
    RouterModule,
    AddExerciseComponent,
    ReactiveFormsModule,
    MobxAngularModule
],
  templateUrl: './workout-edit.html'
})
export class WorkoutEditComponent implements OnInit {

  workoutId!: number;
  isEdit = false;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    protected workoutStore: WorkoutStore,
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

      when(() => this.workoutStore.inprogress == false, () => {
        const w = this.workoutStore.selectedWorkout;
          if (w) {
            this.form.patchValue({ name: w.name });
            this.form.patchValue({ type: w.type });
            this.form.patchValue({ date: new Date(w.date).toISOString().substring(0,10) });
            this.form.patchValue({ notes: w.notes });
          }
      })
    }
  }

  save() {
    if (this.form.invalid) return;
 
    const result = Object.assign({}, this.form.value);

    if (this.workoutStore.selectedWorkout != null) {
    this.workoutStore.selectedWorkout.name = result.name;
    this.workoutStore.selectedWorkout.type = result.type;
    this.workoutStore.selectedWorkout.date = result.date;
    this.workoutStore.selectedWorkout.notes = result.notes;

    if (this.isEdit) {
      this.workoutStore.update(this.workoutStore.selectedWorkout.id, this.workoutStore.selectedWorkout.userID, this.workoutStore.selectedWorkout);
    } else {
      this.workoutStore.create(this.workoutStore.selectedWorkout.userID, this.workoutStore.selectedWorkout);
    }
  }
}

  removeExercise(exerciseId: number) {
    this.exerciseStore.delete(exerciseId);
  }
}
