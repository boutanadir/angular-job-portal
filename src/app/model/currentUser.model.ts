export class currentUser {
  get uid(): string { return ''+localStorage.getItem("userUid")};
  set uid(uid: string) { localStorage.setItem("userUid",uid)};
  get profile(): any { return JSON.parse(''+localStorage.getItem("profile")); };
  set profile(profile:any) { localStorage.setItem("profile",JSON.stringify(profile))};
  delete() { this.uid=''; this.profile='';};
};
