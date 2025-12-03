import { Routes } from '@angular/router';

import { WorkoutsComponent } from './components/workouts/workout.component';
import { WorkoutDetailComponent } from './components/workouts/workout-detail/workout-detail.component';
import { WorkoutEditComponent } from './components/workouts/workout-edit/workout-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'workouts/edit/:id', component: WorkoutEditComponent },
  { path: 'workouts/new', component: WorkoutEditComponent },
  { path: 'workouts/view/:id', component: WorkoutDetailComponent}
];
