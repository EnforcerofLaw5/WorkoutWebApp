import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkoutService } from '../../../services/workout.service';
import { ExerciseService } from '../../../services/exercise.service';
import { Workout } from '../../../entities';
import { SuggestionService } from '../../../services/suggestion.service';
import { DateFnsModule } from 'ngx-date-fns';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFnsModule],
  templateUrl: './workout-detail.component.html'
})
export class WorkoutDetailComponent implements OnInit {

  workoutId!: number;
  workout?: Workout;
  suggestedWorkout?: Workout;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService,
    private exersiceService: ExerciseService,
    private suggestionService: SuggestionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadWorkout();
  }

  loadWorkout() {
    this.loading = true;

    this.workoutService.get(this.workoutId).subscribe({
      next: w => {
        this.workout = w;
        this.loading = false;
      },
      complete: () => this.cdr.detectChanges()
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

    this.exersiceService.delete(exerciseId).subscribe(() => {
      this.workout!.exercises = this.workout!.exercises.filter(e => e.id !== exerciseId);
      this.cdr.detectChanges();
    });
  }
}
