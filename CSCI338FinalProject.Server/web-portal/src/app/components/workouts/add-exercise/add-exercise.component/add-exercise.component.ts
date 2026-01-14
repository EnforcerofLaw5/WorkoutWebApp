import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Exercise, Workout } from '@app/entities';
import { ExerciseApiService } from '@app/services/exercise-api.service';
import { WorkoutStore } from '@app/stores/workout.store';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'add-exercise-form',
  standalone: true,
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.css',
  imports: [ReactiveFormsModule]
})
export class AddExerciseComponent {
  @Input() workout!: Workout;

  exerciseSearch = '';
  searchTerm = new Subject<string>();
  apiResults: Exercise[] = [];
  selectedExercise: Exercise | null = null;
  form!: FormGroup;

  constructor(
    private exerciseApi: ExerciseApiService,
    private workoutStore: WorkoutStore,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      sets: new FormControl(3, Validators.required),
      reps: new FormControl(10, Validators.required),
      rpe: new FormControl(8, [Validators.min(1), Validators.max(10)])
    });
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = Number(param);
      this.workoutStore.getWorkoutById(id).subscribe(w => {
        this.workout = w;
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

    this.workoutStore.addToWorkout(this.workout.id, newExercise)
      .subscribe(added => {
        this.workout.exercises.push(added);
        this.selectedExercise = null;
        this.exerciseSearch = '';
      });
  }
}