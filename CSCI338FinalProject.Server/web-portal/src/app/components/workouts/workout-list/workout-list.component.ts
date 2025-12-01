import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../../services/workout.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Workout } from '../../../entities';

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

  constructor(private workoutService: WorkoutService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.workoutService.getAll().subscribe({
      next: data => {
        this.workouts = data;
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  deleteWorkout(id: number): void {
    this.workoutService.delete(id).subscribe(() => this.load());
  }
}
