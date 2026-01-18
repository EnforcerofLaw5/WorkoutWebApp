import { Component, Input, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Exercise, Workout } from '@app/entities';
import { ExerciseApiService } from '@app/services/exercise-api.service';
import { WorkoutStore } from '@app/stores/workout.store';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MobxAngularModule } from 'mobx-angular';
import { ExerciseStore } from '@app/stores/exercise.store';
import { when } from 'mobx';


@Component({
  selector: 'add-exercise-form',
  standalone: true,
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.css',
  imports: [ReactiveFormsModule, MobxAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExerciseComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<Exercise>();

  exerciseSearch = '';
  searchTerm = new Subject<string>();
  apiResults: Exercise[] = [];
  form!: FormGroup;

  constructor(
    private exerciseApi: ExerciseApiService,
    private workoutStore: WorkoutStore,
    protected exersiceStore: ExerciseStore,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      sets: new FormControl(3, Validators.required),
      name: new FormControl('', Validators.required),
      primaryMuscle: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = Number(param);
      this.workoutStore.getWorkoutById(id);
    }

    when(() => this.exersiceStore.inprogress == false, () => {
      if (this.exersiceStore.selectedExercise != null) {
        this.form.patchValue({ sets: this.exersiceStore.selectedExercise.exerciseSets });
        this.form.patchValue({ name: this.exersiceStore.selectedExercise.name });
        this.form.patchValue({ category: this.exersiceStore.selectedExercise.category });
        this.form.patchValue({ primaryMuscle: this.exersiceStore.selectedExercise.primaryMuscle });
      }
    })

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
    this.exersiceStore.selectedExercise = ex;
    this.apiResults = [];
    this.cdr.detectChanges();
  }

  get workoutId(): number | null {
    return this.workoutStore.selectedWorkout?.id ?? null;
  }

  addExercise() {
    if (this.form.invalid) return;

    const result = Object.assign({}, this.form.value);

    this.exersiceStore.selectedExercise = {
      id: 0,
      workoutId: this.workoutId!,
      name: result.name,
      primaryMuscle: result.primaryMuscle,
      category: result.category,
      exerciseSets: []
    }

    this.saveEvent.emit(this.exersiceStore.selectedExercise);
  }
}