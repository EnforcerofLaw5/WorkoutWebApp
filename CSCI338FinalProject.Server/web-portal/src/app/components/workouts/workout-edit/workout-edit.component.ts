import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../../services/workout.service';
import { Workout, Exercise, WorkoutExercise } from '../../../entities';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component/add-exercise.component';
import { HttpClient } from '@angular/common/http';
import { ExerciseApiService } from '../../../services/exercise-api.service';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AddExerciseComponent
  ],
  templateUrl: './workout-edit.html'
})
export class WorkoutEditComponent implements OnInit {

  workoutId!: number;
  workout!: Workout;
  exercises: Exercise[] = [];
  selectedExercise: Exercise | null = null;

  isEdit = false;
  //protected workout: Workout = { id: 0, name: '', type: '', date: new Date(), user: { id: 0, name: '', age: 0, weight: 0, goal: '', workouts: [] }, userID: 0, notes: '', workoutExercises: [] };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private exerciseApi: ExerciseApiService
  ) { }

  ngOnInit(): void {
    this.exerciseApi.getExercises().subscribe(data => {
   this.exercises = data.map(x => ({
    id: 0,
    name: x.name,
    primaryMuscle: x.primaryMuscle,
    category: x.category
  }));
});

    const param = this.route.snapshot.paramMap.get('id');

    if (param) {
      this.isEdit = true;
      const id = Number(param);

      this.workoutService.get(id).subscribe(w => {
        this.workout = w;
        this.cdr.detectChanges();
      });
    }
  }

  save() {
    if (this.isEdit) {
      this.workoutService.update(this.workout.id, this.workout)
        .subscribe(() => this.router.navigate(['/workouts', this.workout.id]));
    } else {
      this.workoutService.create(this.workout)
        .subscribe(() => this.router.navigate(['/workouts']));
    }
  }


  removeExercise(exerciseId: number) {
    this.http.delete(`https://localhost:7114/api/workoutexercise/${exerciseId}`).subscribe(() => {
      this.workout.workoutExercises = this.workout.workoutExercises.filter(x => x.id !== exerciseId);
    })
  }
}
