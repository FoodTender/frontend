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
  }

  addBookmark() {
    this.bookmarkService.addBookmark(this.recipeId)
      .subscribe(() => this.user.bookmarks.push(this.recipeId));
    //   $('.bookmark-btn').append(`<div class="add-bookmark" *ngIf="user.bookmarks.indexOf(recipe._id) === -1">
    //   <button class="bookmark-button comfortaa" (click)="addBookmark()">Bookmark me!
    //     <i class="material-icons">star_border</i>
    //   </button>
    // </div>`);
  }

  deleteBookmark() {
    //   $('.bookmark-btn').append(`<div class="delete-bookmark">
    //   <button class="no-bookmark-button comfortaa" (click)="deleteBookmark()">I'm a bookmark!
    //     <i class="material-icons">star</i>
    //   </button>
    // </div>`);

    // $('.add-bookmark').css('position', 'absolute');
    this.bookmarkService.removeBoomark(this.recipeId)
      .subscribe(() => {
        const index = this.user.bookmarks.indexOf(this.recipeId);
        this.user.bookmarks.splice(index, 1);
      });
  }
}

