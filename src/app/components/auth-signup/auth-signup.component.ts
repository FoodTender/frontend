import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  user = new User({
    username: '',
    email: '',
    password: ''
  });
  error: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  signup() {
    this.error = null;
    this.auth.signup(this.user).subscribe(
      () => this.router.navigate(['/']),
      (err) => this.error = err
    );
  }

  ngOnInit() { }
}
