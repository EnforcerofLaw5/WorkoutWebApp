import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkoutStore } from '@app/stores/workout.store';
import { Workout } from '@app/entities';
import { DateFnsModule } from 'ngx-date-fns';
import { MobxAngularModule } from 'mobx-angular';


@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [RouterLink, DateFnsModule, MobxAngularModule],
  templateUrl: './workouts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutsComponent implements OnInit {

  protected workouts: Workout[] = [];

  constructor(protected workoutStore: WorkoutStore) { }

  ngOnInit() {
    this.workoutStore.getAllWorkouts();
  }

  deleteWorkout(id: number) {
    this.workoutStore.deleteWorkout(id);
  }
}
