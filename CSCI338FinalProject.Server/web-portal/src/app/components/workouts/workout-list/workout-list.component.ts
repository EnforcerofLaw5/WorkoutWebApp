import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WorkoutStore } from '@app/stores/workout.store';
import { RouterModule } from '@angular/router';
import { Workout } from '@app/entities';
import { MobxAngularModule } from 'mobx-angular';

@Component({
  selector: 'app-workout-list',
  imports: [
    RouterModule, MobxAngularModule
],
  templateUrl: './workout-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
