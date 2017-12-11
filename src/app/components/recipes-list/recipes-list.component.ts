import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes = null;
  // ingredientsSelected: string[];

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() { }

  // searchRecipes() {
  //   this.recipeService.getRecipes()
  //     .subscribe((recipes) => {
  //       this.recipes = recipes;
  //     });
  // }

}
