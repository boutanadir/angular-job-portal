import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from './services/job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public router: Router, public jobService: JobService) {

  }
  ngOnInit(): void {
    this.jobService.signedInCheck();
  }

  signOut(){
    this.jobService.signOut().subscribe({
      next: () => {
      this.jobService.currentUser.delete();
      console.log("You are signed out");
      this.router.navigate(['/home']);
    },
      error: error =>{ console.log(error.code+" "+error.message);}
  });
    
  }

}
