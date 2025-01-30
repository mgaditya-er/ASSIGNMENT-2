import { Routes } from '@angular/router';
import { PatientComponent } from './component/patient/patient.component';
import { DoctorFormComponent } from './component/doctor/doctor-form/doctor-form.component';
import { AdminFormComponent } from './component/admin/admin-form/admin-form.component';
import { canDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [


    { path: 'patient', component: PatientComponent ,canDeactivate : [canDeactivateGuard]},
  { path: 'doctor', component: DoctorFormComponent },
  { path: 'admin', component: AdminFormComponent },
  { path: '', redirectTo: '/patient', pathMatch: 'full' }  // Default route
];
