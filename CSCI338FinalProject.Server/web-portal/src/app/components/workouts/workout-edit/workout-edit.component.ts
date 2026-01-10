import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../../services/workout.service';
import { ExerciseService } from '../../../services/exercise.service';
import { Workout } from '../../../entities';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component/add-exercise.component';

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
    private workoutService: WorkoutService,
    private exersiceService: ExerciseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');

    if (param) {
      this.isEdit = true;
      this.workoutId = Number(param);

      this.workoutService.get(this.workoutId).subscribe(w => {
        this.workout = w;
        this.cdr.detectChanges();
      });
    }
  }

  save() {
    if (this.isEdit) {
      this.workoutService.update(this.workout.id, this.workout.userID, this.workout)
        .subscribe(() => this.router.navigate(['/workouts', this.workout.id]));
    } else {
      this.workoutService.create(this.workout.userID)
        .subscribe(() => this.router.navigate(['/workouts']));
    }
  }

  removeExercise(exerciseId: number) {
    this.exersiceService.delete(exerciseId).subscribe(() => {
      this.workout.exercises = this.workout.exercises.filter(e => e.id !== exerciseId);
      this.cdr.detectChanges();
    });
  }
}
