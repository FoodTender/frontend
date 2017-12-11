import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { RecipeService } from '../../services/recipe.service';

declare var $: any;
@Component({
  selector: 'app-ingredients-searcher',
  templateUrl: './ingredients-searcher.component.html',
  styleUrls: ['./ingredients-searcher.component.css']
})
export class IngredientsSearcherComponent implements OnInit {
  @Output() ingredient = new EventEmitter<string>();

  ingredientValue: string;
  ingredients = null;
  ingredientsSelected: string[] = [];
  recipes = null;

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    $('#time-drop-down').material_select();
    $('.chips').material_chip();
  }

  findIngredient() {
    this.ingredientService.getIngredients(this.ingredientValue)
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
        const data = {};
        const self = this;

        if (this.ingredients !== null) {
          ingredients.forEach(ingredient => {
            data[ingredient.name] = null;
          });

          // Display matching ingredients on autocomplete
          $('input.autocomplete').autocomplete({
            data: data,
            onAutocomplete:
              function () {
                self.addIngredientToSearcher($(this).text());
                $('#autocomplete-input').val('');
              },
            minLength: 1
          });
        }
      });
  }

  addIngredientToSearcher(ingredient) {
    if (this.ingredientsSelected.indexOf(ingredient) < 0) { // If not already selected
      this.ingredientsSelected.push(ingredient);
    }
  }

  searchRecipes(ingredientsSelected) {
    this.ingredientService.getRecipes(this.ingredientsSelected)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  // searchRecipes(ingredientsSelected) {
  //   this.ingredientService.getRecipes(this.ingredientsSelected)
  //     .subscribe((recipes) => this.recipes = recipes);
  // }

}
