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
  ingredients = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.paramsSub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        const ingredientsStr = params.ingredients || '';
        const ingredientsArray = ingredientsStr.split(',');
        this.ingredients = ingredientsArray.map(name => {
          return { name: name };
        });
        this.searchRecipes();
      });
  }

  searchRecipes() {
    const ingredientsFilter = this.ingredients.map(item => item.name);
    this.recipeService.getRecipes(ingredientsFilter)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

}
