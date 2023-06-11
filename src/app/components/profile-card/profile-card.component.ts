import { Component } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  constructor(public jobService: JobService) { }
}
