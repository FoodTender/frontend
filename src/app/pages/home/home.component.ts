import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IngredientService } from '../../services/ingredient.service';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  ingredients = null;
  user = null;

  constructor(
    private ingredientService: IngredientService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.me();
    this.authService.userChange$.subscribe((user) => {
      this.user = user;
    });

    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    $('.btn').on('click touchstart', e => {
    });

    this.ingredientService.getAllIngredients()
      .subscribe((ingredients) => {
        this.ingredients = ingredients.filter((ingredient) => {
          return ingredient.basic;
        });
      });
  }

  handleLogout() {
    this.authService.logout()
      .subscribe(() => this.router.navigate(['/home']));
  }

}
