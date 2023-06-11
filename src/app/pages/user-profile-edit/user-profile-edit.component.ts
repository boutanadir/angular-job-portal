import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/model/user.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit{
  
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder,public router:Router, private jobService: JobService) { }
  ngOnInit(): void {
    if(this.jobService.currentUser.profile!=='')this.profileForm.setValue(this.jobService.currentUser.profile);
  }

  onSubmit(){
    console.log(this.profileForm.value)
    this.jobService.userProfileEdit(this.profileForm.value as user);
  }
}
