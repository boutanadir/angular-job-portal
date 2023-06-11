import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { equalTo, getDatabase, onValue, orderByChild, query, ref } from 'firebase/database';
import { Observable } from 'rxjs';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit{
  @Input() jobEdit: boolean=false;
  jobs!: Job[];
  
constructor(private JobService : JobService,public router:Router){}
  ngOnInit(): void {
      if(this.jobEdit) this.JobService.getJobsByUser(this.JobService.currentUser.uid).subscribe( jobs => this.jobs = jobs )  
      else  this.JobService.getJobs().subscribe( jobs => this.jobs = jobs )  
  }

}
