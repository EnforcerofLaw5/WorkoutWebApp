import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from '@angular/router';
import { WorkoutStore } from '../../stores/workout.store';
import { Workout } from '../../entities';
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
    this.workoutStore.getAllWorkouts()
  }

  deleteWorkout(id: number) {
    this.workoutStore.deleteWorkout(id);
    //   this.workouts = this.workouts.filter(w => w.id != id);
    // });
    //if (!confirm('Delete this workout?')) return;

    //this.workoutService.delete(id).subscribe(() => {
    //this.workouts = this.workouts.filter(w => w.id !== id);
  }
}
