import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  loading = true;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.authService.me();
    this.authService.userChange$.subscribe((user) => {
      this.loading = false;
      this.user = user;
    });
  }


  login() {
    this.router.navigate(['/auth/login']);
  }

  signup() {
    this.router.navigate(['/auth/signup']);
  }

  // profile() {
  //   this.router.navigate(['/profile']);
  // }

  logout() {
    this.authService.logout()
      .subscribe(() => this.router.navigate(['/auth/login']));
  }

}


