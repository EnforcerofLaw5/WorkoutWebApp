import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkoutStore } from '@app/stores/workout.store';
import { ExerciseStore } from '@app/stores/exercise.store';
import { Workout } from '@app/entities';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component/add-exercise.component';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [
    RouterModule,
    AddExerciseComponent
],
  templateUrl: './workout-edit.html'
})
export class WorkoutEditComponent implements OnInit {

  workoutId!: number;
  isEdit = false;

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
    private router: Router,
    private workoutStore: WorkoutStore,
    private exerciseStore: ExerciseStore,
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');

    if (param) {
      this.isEdit = true;
      this.workoutId = Number(param);

      this.workoutStore.getWorkoutById(this.workoutId).subscribe(w => {
        this.workout = w;
      });
    }
  }

  save() {
    if (this.isEdit) {
      this.workoutStore.update(this.workout.id, this.workout.userID, this.workout)
        .subscribe(() => this.router.navigate(['/workouts', this.workout.id]));
    } else {
      this.workoutStore.create(this.workout.userID)
        .subscribe(() => this.router.navigate(['/workouts']));
    }
  }

  removeExercise(exerciseId: number) {
    this.exerciseStore.delete(exerciseId).subscribe(() => {
      this.workout.exercises = this.workout.exercises.filter(e => e.id !== exerciseId);
    });
  }
}
