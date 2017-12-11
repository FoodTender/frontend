import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-display-recipes',
  templateUrl: './display-recipes.component.html',
  styleUrls: ['./display-recipes.component.css']
})
export class DisplayRecipesComponent implements OnInit {
  @Input() recipes = null;
  paramsSub: any;
  ingredients = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.paramsSub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.ingredients += params.ingredients || 0;
      });
    console.log('Ingredients on init: ' + this.ingredients);
    this.searchRecipes();
  }

  searchRecipes() {
    this.recipeService.getRecipes(this.ingredients)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

}
