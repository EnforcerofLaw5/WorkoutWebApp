import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkoutService, Workout } from '../../../services/workout.service';
import { provideHttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './workout-edit.html'
})
export class WorkoutEditComponent implements OnInit {

  workout: Workout = {
    id: 0,
    userId: 1,
    date: '',
    notes: ''
  };

  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');

    if (param) {
      this.isEdit = true;
      const id = Number(param);

      this.workoutService.get(id).subscribe(w => this.workout = w);
    }
  }

  save() {
    if (this.isEdit) {
      this.workoutService.update(this.workout.id, this.workout)
        .subscribe(() => this.router.navigate(['/workouts', this.workout.id]));
    } else {
      this.workoutService.create(this.workout)
        .subscribe(() => this.router.navigate(['/workouts']));
    }
  }
}
