import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { JobService } from './services/job.service';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { UserProfileEditComponent } from './pages/user-profile-edit/user-profile-edit.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { loginGuard } from './guards/login-guard';
import { accountGuard } from './guards/account-guard';
import { JobEditComponent } from './pages/job-edit/job-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobsComponent,
    JobDetailsComponent,
    JobCardComponent,
    SignUpComponent,
    SignInComponent,
    MyAccountComponent,
    UserProfileEditComponent,
    ProfileCardComponent,
    JobEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [JobService,AngularFireDatabase,loginGuard,accountGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
