import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
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
export class AddExerciseComponent implements OnInit {
  @Input() workout!: Workout;

  exerciseSearch = '';
  searchTerm = new Subject<string>();
  apiResults: Exercise[] = [];
  selectedExercise: Exercise | null = null;
  form!: FormGroup;

  exercise: Exercise = {
    id: 0,
    workoutId: 0,
    name: '',
    primaryMuscle: '',
    category: '',
    exerciseSets: []
  };

  constructor(
    private exerciseApi: ExerciseApiService,
    private workoutStore: WorkoutStore,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      sets: new FormControl(3, Validators.required),
      name: new FormControl('',  Validators.required),
      primaryMuscle: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = Number(param);
      this.workoutStore.getWorkoutById(id);
    }

    if (this.exercise.exerciseSets) this.form.patchValue({ sets: this.exercise.exerciseSets });
    if (this.exercise.name)  this.form.patchValue({ name: this.exercise.name });
    if (this.exercise.category) this.form.patchValue({  category: this.exercise.category});
    if (this.exercise.primaryMuscle) this.form.patchValue({ primaryMuscle: this.exercise.primaryMuscle });

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

    if (this.form.invalid) return;

    const result = Object.assign({}, this.form.value);

    this.exercise.name = result.name;
    this.exercise.exerciseSets = result.sets;
    this.exercise.category = result.category;
    this.exercise.primaryMuscle = result.primaryMuscle;

    const newExercise: Exercise = {
      id: 0,
      workoutId: this.workout.id,
      name: this.selectedExercise.name,
      primaryMuscle: this.selectedExercise.primaryMuscle,
      category: this.selectedExercise.category,
      exerciseSets: []
    };

    this.workoutStore.addToWorkout(this.workout.id, newExercise);
  }
}