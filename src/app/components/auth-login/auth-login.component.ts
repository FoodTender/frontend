import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  user = new User({
    username: '',
    password: ''
  });
  error: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  login() {
    this.error = null;
    this.auth.login(this.user)
      .subscribe(
      () => this.router.navigate(['/']),
      (err) => this.error = err
      );
  }
}
