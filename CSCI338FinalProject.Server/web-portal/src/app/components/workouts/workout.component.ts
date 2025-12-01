import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../entities';


@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {

  protected workouts$: Workout[] = [];
  protected loading$ = true;

  constructor(private workoutService: WorkoutService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    let t = this;

    t.workoutService.getAll().subscribe((ws) => {
      t.workouts$ = ws;
      t.loading$ = false;
      t.cdr.detectChanges();
    });
  }

  deleteWorkout(id: number) {
    // if (!confirm('Delete this workout?')) return;

    // this.workoutService.delete(id).subscribe(() => {
    //   this.workouts = this.workouts.filter(w => w.id !== id);
    // });
  }
}
