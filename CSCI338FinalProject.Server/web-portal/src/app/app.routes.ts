import { Routes } from '@angular/router';

import { WorkoutsComponent } from './components/workouts/workout.component';
import { WorkoutDetailComponent } from './components/workouts/workout-detail/workout-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'workouts/:id', component: WorkoutDetailComponent },
];
