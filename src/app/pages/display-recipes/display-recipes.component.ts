import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';

declare var $: any;

@Component({
  selector: 'app-display-recipes',
  templateUrl: './display-recipes.component.html',
  styleUrls: ['./display-recipes.component.css']
})
export class DisplayRecipesComponent implements OnInit {
  @Input() recipes = null;
  paramsSub: any;
  ingredients = '';
  ingredientsSelected = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.paramsSub = this.activatedRoute // Maybe change to new function getIngredientsUrl()
      .queryParams
      .subscribe(params => {
        this.ingredients += params.ingredients || 0;
      });

    this.searchRecipes();
  }

  searchRecipes() {
    console.log(this.ingredients);

    this.recipeService.getRecipes(this.ingredients)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

}
