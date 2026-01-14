import { Component, OnInit } from '@angular/core';
import { WorkoutStore } from '@app/stores/workout.store';
import { RouterModule } from '@angular/router';
import { Workout } from '@app/entities';

@Component({
  selector: 'app-workout-list',
  imports: [
    RouterModule
],
  templateUrl: './workout-list.component.html'
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private workoutStore: WorkoutStore) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.workoutStore.getAllWorkouts();
  }

  deleteWorkout(id: number): void {
    this.workoutStore.deleteWorkout(id);
  }
}
