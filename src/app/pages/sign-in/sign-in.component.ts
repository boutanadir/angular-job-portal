import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private formBuilder: FormBuilder,public router:Router, private jobService: JobService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    this.jobService.signIn(''+this.loginForm.value.email,''+this.loginForm.value.password);
  
  }
}
