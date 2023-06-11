import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, from, map, take, tap, throwError } from 'rxjs';
import { Job } from '../model/job.model';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, UserCredential,signOut, User, onAuthStateChanged } from "firebase/auth";
import {Auth} from '@angular/fire/auth';
import { user } from '../model/user.model';
import { Database, child, equalTo, get, getDatabase, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";
import { Router } from '@angular/router';
import { currentUser } from '../model/currentUser.model';
import { FirebaseError } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class JobService{
  currentUser: currentUser = new currentUser;
  formSubmitted = new BehaviorSubject(false);

  constructor(private http: HttpClient, private auth :Auth,private router: Router) { }


  signedInCheck(){
  onAuthStateChanged(this.auth, (user) => {
    console.log("onAuthStateChanged called");
    if (user) {
            this.currentUser.uid = user.uid;
            const db = getDatabase();
            get(child(ref(db), 'users/'+this.currentUser.uid)).then((snapshot) => {
              if (snapshot.exists()) this.currentUser.profile=snapshot.val();
              else this.router.navigate(['/profile-edit']);
            })
            .catch((error) => { console.log(error.code+" "+error.message);});
    } else 
            {
              console.log("You are signed off "+this.currentUser.uid);
              this.currentUser.delete();
          }
  });
}

  public getJobs(): Observable<any> {
    return this.http.get('https://job-portal-4c1dc-default-rtdb.firebaseio.com/jobs.json').pipe(
      map(responseObj => {
        const resultArr = [];
        const objResponse = responseObj as Job[];
        for (let item in objResponse) {
          resultArr.push({ ...objResponse[item], id: item })
        }
        return resultArr;
      })
    )
  }

  getJobById(id:string): Observable<any>{
    return this.http.get('https://job-portal-4c1dc-default-rtdb.firebaseio.com/jobs/'+id+'.json').pipe(
      map(data => {let job=data as Job; job.id=id; return job}));
  }

  getJobsByUser(uid:string): Observable<Job[]> {
    
    return new Observable((observer)=>{
      const db = getDatabase();
      let rep= query(ref(db, 'jobs'), orderByChild('owner'),equalTo(uid));
      onValue(rep, (snapshot) => {
        if(snapshot.val()){
        let jobs: Job[]= [];
        Object.keys(snapshot.val()).forEach((key) => {
          let job=snapshot.val()[key];
          job.id=key;
          jobs.push(job);
      });
      observer.next(jobs);}
    });
  })
  }

  jobEdit(id: string, job: any): Observable<any> {
    if (id==="")
    return this.http.post('https://job-portal-4c1dc-default-rtdb.firebaseio.com/jobs.json', job);
    else{
      
    return new Observable((observer)=>{
    const db = getDatabase();
    set(ref(db, 'jobs/'+id), job)
    .then(() => {
      observer.next("updated");
      })
      .catch((error) => { observer.next(error);});})}
  }



signIn(email:string, password:string)
{
  signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      this.currentUser.uid= userCredential.user.uid;

      const db = getDatabase();
      get(child(ref(db), 'users/'+this.currentUser.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          this.currentUser.profile=snapshot.val();
          console.log(this.currentUser.profile+" signed in");
          this.router.navigate(['/home']);

        } 
        else this.router.navigate(['/profile-edit']);
        
      })
      .catch((error) => { console.log(error.code+" "+error.message);});

    })
    .catch((error) => { console.log(error.code+" "+error.message);});
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut()).pipe(
      catchError((error: FirebaseError) =>  throwError(() => new Error(error.code+" "+error.message))
    ));
        
  }
  
  signUp(email: string, password: string) 
  {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      this.currentUser.uid=userCredential.user.uid;
      this.router.navigate(['/profile-edit']);
      })
      .catch((error) => { console.log(error.code+" "+error.message);});
  }

  userProfileEdit(user:user)
  {
    const db = getDatabase();
    set(ref(db, 'users/'+this.currentUser.uid), user)
    .then(() => {
      this.currentUser.profile=user;
      this.router.navigate(['/home']);
      })
      .catch((error) => { console.log(error.code+" "+error.message);});
  }
 

  
  
}
