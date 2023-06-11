import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit{
  jobEdit: boolean=false;
  job!:Job;
constructor(public router:Router,private ActivatedRoute:ActivatedRoute,private jobService:JobService){}
  ngOnInit(): void {
    let jobId=this.ActivatedRoute.snapshot.params["id"];
    if(jobId!=="new") {
    console.log(jobId)
    this.jobService.getJobById(jobId).subscribe(
      job => {this.job=job; if(this.jobService.currentUser.uid===job.owner) this.jobEdit=true ;console.log(job)},
      error => {console.error(error);}
    );}
  }
}
