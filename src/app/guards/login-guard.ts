import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { JobService } from "../services/job.service";

@Injectable()
export class loginGuard implements CanActivate{
    constructor(private jobService:JobService){}

    canActivate(): boolean {    
        if(this.jobService.currentUser.uid!='') return false;else return true;
    }
}