import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkoutService } from '../../../services/workout.service';
import { Workout } from '../../../entities';

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
    private workoutService: WorkoutService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workoutService.get(id).subscribe(w => {
      this.workout = w;
      this.cdr.detectChanges();
    });
  }

  edit() {
    this.router.navigate(['/workouts', this.workout!.id, 'edit']);
  }
}
