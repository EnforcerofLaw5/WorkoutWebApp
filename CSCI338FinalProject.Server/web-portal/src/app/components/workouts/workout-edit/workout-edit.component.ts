import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { WorkoutStore } from '@app/stores/workout.store';
import { ExerciseStore } from '@app/stores/exercise.store';
import { UserStore } from '@app/stores/user.store';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component/add-exercise.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MobxAngularModule } from "mobx-angular";
import { when } from 'mobx';
import { Exercise } from '@app/entities';

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

  @ViewChild(AddExerciseComponent) addExerciseComponent: AddExerciseComponent;
  workoutId!: number;
  isEdit = false;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    protected workoutStore: WorkoutStore,
    private exerciseStore: ExerciseStore,
    private userStore: UserStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userStore.getUserById(1); // For demo purposes, load user with ID 1

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
          this.form.patchValue({ date: new Date(w.date).toISOString().substring(0, 10) });
          this.form.patchValue({ notes: w.notes });
        }
      })
    }
  }

  saveWorkout() {
      const result = Object.assign({}, this.form.value);
    if (this.workoutStore.selectedWorkout == null) {
      // New Workout
      this.workoutStore.selectedWorkout = {
        id: 0,
        name: result.name,
        type: result.type,
        date: new Date(result.date),
        notes: result.notes,
        userID: this.userStore.currentUser ? this.userStore.currentUser.id : 1,
        // user: this.userStore.currentUser!,
        exercises: []
      };
    }
    else if (this.workoutStore.selectedWorkout) {
      // Update existing workout
      this.workoutStore.selectedWorkout.name = result.name;
      this.workoutStore.selectedWorkout.type = result.type;
      this.workoutStore.selectedWorkout.date = new Date(result.date);
      this.workoutStore.selectedWorkout.notes = result.notes;
      this.workoutStore.selectedWorkout.user = this.userStore.currentUser;
    }
    if (this.isEdit) {
      this.workoutStore.update(this.workoutStore.selectedWorkout);
    } else {
      this.workoutStore.create(this.workoutStore.selectedWorkout);
    }
  }

  save() {
    if (this.form.invalid) return;
    this.saveWorkout();
    when(() => this.workoutStore.inprogress == false, () => {
      this.router.navigate(['/workouts'])
    })
  }

  removeExercise(exerciseId: number) {
    this.exerciseStore.delete(exerciseId);
  }

  saveExercise(exercise: Exercise) {
    if (this.workoutStore.selectedWorkout == null) {
      this.saveWorkout();
      when(() => this.workoutStore.inprogress == false, () => {
        this.exerciseStore.selectedExercise.workout = this.workoutStore.selectedWorkout;
        this.exerciseStore.create(exercise);
      })
    }
  }
}
