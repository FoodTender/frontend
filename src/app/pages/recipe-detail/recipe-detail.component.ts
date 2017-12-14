import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { BookmarkService } from '../../services/bookmark.service';

declare var $: any;

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeId = null;
  recipe = null;
  user = null;

  constructor(
    private recipeService: RecipeService,
    private bookmarkService: BookmarkService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.me();
    this.authService.userChange$.subscribe((user) => {
      this.user = user;
    });

    this.recipeId = this.activatedRoute.snapshot.paramMap.get('recipeId'); // Get recipe id from url

    // Get recipes details
    this.recipeService.getRecipeDetail(this.recipeId)
      .subscribe((recipe) => {
        this.recipe = recipe;
      });

    // $('.delete-bookmarked').hide();
    // $('.delete-bookmarked').click();

  }

  addBookmark(event) {
    console.log('recipeId: ', this.recipeId);

    this.bookmarkService.addBookmark(this.recipeId)
      .subscribe((recipe) => {
        this.recipe = recipe;
      });

    $(event.target).toggle();
    $('.delete-bookmark').removeClass('hide');
  }

  deleteBookmark(recipeId, event) {
    $('.delete-bookmark').addClass('hide');
    $('.add-bookmark').toggle();

  }



}

