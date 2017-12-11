import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
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

  ingredientValue: string; // User value on autocomplete
  ingredients = null;
  ingredientsSelected: string[] = [];

  // basics = [{}];

  // recipes = null;

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.ingredientService.getBasicIngredients()
    //   .subscribe((ingredient) => {
    //     console.log(ingredient.name);
    //     this.basics[ingredient.name] = null;

    //   });

    $('#time-drop-down').material_select();
    $('.chips').material_chip();
    // $('.chips-initial').material_chip({
    //   data: this.basics
    // });
    // $('.chips-placeholder').material_chip({
    //   placeholder: 'Your fridge ingredients here',
    // });
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



        // if (this.ingredients !== null) {
        //   ingredients.forEach(ingredient => {
        //     data[ingredient.name] = null;
        //   });

        //   // Display matching ingredients on autocomplete
        //   $('.chips-autocomplete').material_chip({
        //     autocompleteOptions: {
        //       data: data,
        //     },
        //     limit: Infinity,
        //     onAutocomplete:
        //       function () {
        //         self.addIngredientToSearcher($(this).text());
        //         $('#autocomplete-input').val('');
        //       },
        //     minLength: 1
        //   });
        // }
      });
  }

  parseListIngredientsToUrl(ingredients) {
    console.log(ingredients);
    let ingredientsUrl = '';
    const ingredientsStr = ingredients.join(',');
    ingredientsUrl += ingredientsStr;
    console.log('Url: ' + ingredientsUrl);
    this.router.navigate(['/recipes'], { queryParams: { ingredients: ingredientsUrl } });
  }

  addIngredientToSearcher(ingredient) {
    if (this.ingredientsSelected.indexOf(ingredient) < 0) { // If not already selected
      this.ingredientsSelected.push(ingredient);
    }
  }

  searchRecipes(ingredientsSelected) {
    this.recipeService.getRecipes(this.ingredientsSelected);
  }

  // searchRecipes(ingredientsSelected) {
  //   this.ingredientService.getRecipes(this.ingredientsSelected)
  //     .subscribe((recipes) => {
  //       this.recipes = recipes;
  //     });
  // }

}
