import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../entities';
import { enUS } from 'date-fns/locale';
import { DateFnsModule } from 'ngx-date-fns';


@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule, RouterLink, DateFnsModule],
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {

  protected workouts: Workout[] = [];
  protected loading$ = true;

  constructor(private workoutService: WorkoutService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    let that = this;

    that.workoutService.getAll().subscribe((ws) => {
      that.workouts = ws;
      that.loading$ = false;
      that.cdr.detectChanges();
    });
  }

  deleteWorkout(id: number) {
    this.workoutService.delete(id).subscribe(() => {
      this.workouts = this.workouts.filter(w => w.id != id);
    });
     //if (!confirm('Delete this workout?')) return;

     //this.workoutService.delete(id).subscribe(() => {
     //this.workouts = this.workouts.filter(w => w.id !== id);
  }
}
