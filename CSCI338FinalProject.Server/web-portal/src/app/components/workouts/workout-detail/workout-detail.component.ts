import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkoutService } from '../../../services/workout.service';
import { Workout } from '../../../entities';
import { Exercise } from '../../../entities';
import { SuggestionService } from '../../../services/suggestion.service';
import { WorkoutExerciseService } from '../../../services/workout-exercise.service';
import { WorkoutExerciseDetail } from '../../../models/workout-exercise';
import { enUS } from 'date-fns/locale';
import { DateFnsModule, IsThisHourPipeModule } from 'ngx-date-fns';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFnsModule],
  templateUrl: './workout-detail.component.html'
})
export class WorkoutDetailComponent implements OnInit {
  workoutId!: number;
  suggestedWorkout?: Workout;
  workout?: Workout;
  exercise?: Exercise;
  exercises: WorkoutExerciseDetail[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService,
    private cdr: ChangeDetectorRef,
    private suggestionService: SuggestionService,
    private workoutExerciseService: WorkoutExerciseService
  ) { }

  ngOnInit(): void {
    this.workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.workoutExerciseService.getForWorkout(this.workoutId).subscribe({
      next: res => {
        this.exercises = res;
        this.loading = false;
      },
      complete: () => this.cdr.detectChanges()
    })

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workoutService.get(id).subscribe(w => {
      this.workout = w;
      this.cdr.detectChanges();
    });
  }

  getSuggestion() {
    this.suggestedWorkout = undefined;
    if (this.workout != null)
      this.suggestionService.getSuggestion(this.workout.id).subscribe(s => {
        this.suggestedWorkout = s.workout;
        this.cdr.detectChanges();
      })
  }

  delete(id: number) {
    this.workoutExerciseService.delete(id).subscribe(() => {
      this.exercises = this.exercises.filter(x => x.id !== id);
      this.cdr.detectChanges();
    })
  }
}
