import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../services/workout.service';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {

  workouts: Workout[] = [];
  loading = true;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.list().subscribe(ws => {
      this.workouts = ws;
      this.loading = false;
    });
  }

  deleteWorkout(id: number) {
    if (!confirm('Delete this workout?')) return;

    this.workoutService.delete(id).subscribe(() => {
      this.workouts = this.workouts.filter(w => w.id !== id);
    });
  }
}
