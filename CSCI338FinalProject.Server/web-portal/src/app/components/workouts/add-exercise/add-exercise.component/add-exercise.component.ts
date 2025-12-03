import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutExerciseService } from '../../../../services/workout-exercise.service';
import { HttpClient } from '@angular/common/http';
import { ExerciseApiService } from '../../../../services/exercise-api.service';
import { WorkoutService } from '../../../../services/workout.service';
import { Exercise, Workout, WorkoutExercise } from '../../../../entities';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'add-exercise-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.css',
})

export class AddExerciseComponent {
  @Input() workoutId!: number;
  @Input() workout!: Workout;

    exerciseSearch!: string;
    searchTerm = new Subject<string>();
    exercises: Exercise[] = [];
    apiResults: Exercise[] = [];
    selectedExercise: Exercise | null = null;
    form = {
    exerciseId: 0,
    sets: 0,
    reps: 0,
    rpe: 1
  };

  constructor(
    private weService: WorkoutExerciseService,
    private http: HttpClient,
    private exerciseApi: ExerciseApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = Number(param);
      this.workoutService.get(id).subscribe(w => {
        this.workout = w;
        this.cdr.detectChanges();
      })
    }

  this.searchTerm.pipe(
    debounceTime(300),          // wait 300ms after the last keystroke
    distinctUntilChanged(),     // ignore same consecutive values
    switchMap(term => this.exerciseApi.searchExercises(term))
  ).subscribe(results => {
    this.apiResults = results.map(x => ({
      id: x.id || 0,
      name: x.name,
      primaryMuscle: x.primaryMuscle,
      category: x.category
    }));
  });

    this.http.get<any[]>('/api/exercise').subscribe(x => this.exercises = x);
}

  save() {
    this.weService.addToWorkout(this.workoutId, this.form)
    .subscribe(() => window.location.reload());
  }

  addSelectedExercise() {
    if (!this.selectedExercise) return;

    const payload = {
      workoutId: this.workout.id,
      exerciseId: this.selectedExercise.id ?? 0,  
      sets: 3,
      reps: 10
    };

    this.http.post<WorkoutExercise>(
      "https://localhost:7114/api/workoutexercise",
      payload
    ).subscribe(added => {

      this.workout.workoutExercises.push(added);
      this.selectedExercise = null;
      this.exerciseSearch = "";
    });
  }

selectExercise(ex: Exercise) {
  this.form.exerciseId = ex.id;
  this.selectedExercise = ex;
  this.apiResults = []; 
}
}
