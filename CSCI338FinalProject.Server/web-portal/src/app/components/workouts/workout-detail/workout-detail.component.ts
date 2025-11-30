import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkoutService, Workout } from '../../../services/workout.service';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workout-detail.component.html'
})
export class WorkoutDetailComponent implements OnInit {
  workout?: Workout;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workoutService.get(id).subscribe(w => this.workout = w);
  }

  edit() {
    this.router.navigate(['/workouts', this.workout!.id, 'edit']);
  }
}
