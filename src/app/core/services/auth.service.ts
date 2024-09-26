import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  
  constructor() { }

  public get userAuthenticated(): boolean{
    return this.isAuthenticated
  }
}
