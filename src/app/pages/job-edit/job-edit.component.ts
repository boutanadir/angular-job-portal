import { Component, Input, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/model/user.model';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/model/job.model';


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit{
  
  jobForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    salary: new FormControl(0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    description: new FormControl('', [Validators.required]),
    owner: new FormControl( this.jobService.currentUser.uid),
    id: new FormControl('')
  });

  constructor(public router:Router,private ActivatedRoute:ActivatedRoute,private jobService:JobService){}
  
  ngOnInit(): void {
    let jobId=this.ActivatedRoute.snapshot.params["id"];
    console.log(jobId)
    if(jobId!=="new"){
    this.jobService.getJobById(jobId).subscribe(
      job => {
        this.jobForm.setValue(job);
      },
      error => {console.error(error);}
    );}
  }
  onSubmit() {
    let job=this.jobForm.value as Job;
    let {id: _, ...withoutId} = job;
    console.log(withoutId);
    this.jobService.jobEdit(job.id,withoutId).pipe(
      tap(() => {
        this.jobService.formSubmitted.next(true);
        this.router.navigate(['/jobs/'+job.id]);
      }),
      take(1),
    ).subscribe()
  }
}
