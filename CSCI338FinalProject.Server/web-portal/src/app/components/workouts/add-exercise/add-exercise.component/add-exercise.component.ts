import { Component, Input, ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Exercise, Workout } from '../../../../entities';
import { ExerciseApiService } from '../../../../services/exercise-api.service';
import { WorkoutService } from '../../../../services/workout.service';

@Component({
  selector: 'add-exercise-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.css',
})
export class AddExerciseComponent {
  @Input() workout!: Workout;

  exerciseSearch = '';
  searchTerm = new Subject<string>();
  apiResults: Exercise[] = [];
  selectedExercise: Exercise | null = null;

  constructor(
    private exerciseApi: ExerciseApiService,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = Number(param);
      this.workoutService.get(id).subscribe(w => {
        this.workout = w;
        this.cdr.detectChanges();
      });
    }

    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.exerciseApi.searchExercises(term))
    ).subscribe(results => {
      this.apiResults = results;
      this.cdr.detectChanges();
    });
  }

  selectExercise(ex: Exercise) {
    this.selectedExercise = ex;
    this.apiResults = [];
  }

  addExercise() {
    if (!this.selectedExercise) return;

    const newExercise: Exercise = {
      id: 0,
      workoutId: this.workout.id,
      name: this.selectedExercise.name,
      primaryMuscle: this.selectedExercise.primaryMuscle,
      category: this.selectedExercise.category,
      exerciseSets: []
    };

    this.workoutService.addToWorkout(this.workout.id, newExercise)
      .subscribe(added => {
        this.workout.exercises.push(added);
        this.selectedExercise = null;
        this.exerciseSearch = '';
        this.cdr.detectChanges();
      });
  }
}