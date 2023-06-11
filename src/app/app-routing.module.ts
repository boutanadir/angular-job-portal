import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { UserProfileEditComponent } from './pages/user-profile-edit/user-profile-edit.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { loginGuard } from './guards/login-guard';
import { accountGuard } from './guards/account-guard';
import { JobEditComponent } from './pages/job-edit/job-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'myAccount', component: MyAccountComponent, canActivate:[accountGuard] },
  { path: 'sign-in', component: SignInComponent , canActivate:[loginGuard] },
  { path: 'sign-up', component: SignUpComponent , canActivate:[loginGuard] },
  { path: 'profile-edit', component: UserProfileEditComponent , canActivate:[accountGuard] },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:id', component: JobDetailsComponent },
  { path: 'jobs/edit/:id', component: JobEditComponent , canActivate:[accountGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
