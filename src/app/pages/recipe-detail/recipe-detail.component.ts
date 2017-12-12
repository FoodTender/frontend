import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeId = null;
  recipe = null;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipeId = this.activatedRoute.snapshot.paramMap.get('recipeId');

    this.recipeService.getRecipeDetail(this.recipeId)
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

}
