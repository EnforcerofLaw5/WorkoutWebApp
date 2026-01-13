import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkoutStore } from '@app/stores/workout.store';
import { ExerciseStore } from '@app/stores/exercise.store';
import { Workout } from '@app/entities';
import { SuggestionService } from '@app/services/suggestion.service';
import { DateFnsModule } from 'ngx-date-fns';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [RouterModule, DateFnsModule],
  templateUrl: './workout-detail.component.html'
})
export class WorkoutDetailComponent implements OnInit {

  workoutId!: number;
  workout?: Workout;
  suggestedWorkout?: Workout;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private workoutStore: WorkoutStore,
    private exerciseStore: ExerciseStore,
    private suggestionService: SuggestionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadWorkout();
  }

  loadWorkout() {
    this.loading = true;

    this.workoutStore.getWorkoutById(this.workoutId).subscribe({
      next: w => {
        this.workout = w;
        this.loading = false;
      }
    });
  }

  getSuggestion() {
    this.suggestedWorkout = undefined;
    if (!this.workout) return;

    this.suggestionService.getSuggestion(this.workout.id).subscribe(s => {
      this.suggestedWorkout = s.workout;
      this.cdr.detectChanges();
    });
  }

  deleteExercise(exerciseId: number) {
    if (!this.workout) return;

    this.exerciseStore.delete(exerciseId).subscribe(() => {
      this.workout!.exercises = this.workout!.exercises.filter(e => e.id !== exerciseId);
    });
  }
}
