import { Component, OnInit } from '@angular/core';
import { WorkoutService, Workout } from '../../../services/workout.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-workout-list',
    imports: [
    RouterModule,
    CommonModule 
  ],
  templateUrl: './workout-list.component.html'
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.workoutService.getAll().subscribe({
      next: data => this.workouts = data,
      error: err => console.error(err)
    });
  }

  deleteWorkout(id: number): void {
    this.workoutService.delete(id).subscribe(() => this.load());
  }
}
