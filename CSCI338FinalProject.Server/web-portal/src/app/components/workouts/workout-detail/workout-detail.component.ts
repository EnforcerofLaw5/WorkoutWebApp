import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkoutStore } from '@app/stores/workout.store';
import { ExerciseStore } from '@app/stores/exercise.store';
import { Workout } from '@app/entities';
import { SuggestionService } from '@app/services/suggestion.service';
import { DateFnsModule } from 'ngx-date-fns';
import { MobxAngularModule } from 'mobx-angular';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [RouterModule, DateFnsModule, MobxAngularModule],
  templateUrl: './workout-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutDetailComponent implements OnInit {

  workoutId!: number;
  suggestedWorkout?: Workout;

  constructor(
    private route: ActivatedRoute,
    protected workoutStore: WorkoutStore,
    private exerciseStore: ExerciseStore,
    private suggestionService: SuggestionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadWorkout();
  }

  loadWorkout() {

    this.workoutStore.getWorkoutById(this.workoutId);
  }

  getSuggestion() {
    this.suggestedWorkout = undefined;
    if (!this.workoutStore.selectedWorkout) return;

    this.suggestionService.getSuggestion(this.workoutStore.selectedWorkout.id).subscribe(s => {
      this.suggestedWorkout = s.workout;
      this.cdr.detectChanges();
    });
  }

  deleteExercise(exerciseId: number) {
    if (!this.workoutStore.selectedWorkout) return;

    this.exerciseStore.delete(exerciseId);
  }
}
