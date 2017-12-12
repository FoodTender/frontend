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

  ingredientValue = "b"; // User value on autocomplete
  ingredients = null;
  ingredientsSelected: string[] = [];

  basics = [{}];
  basicIngredients = null;


  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ingredientService.getBasicIngredients()
      .subscribe((ingredient) => {
        // console.log('Cris', ingredient);
        // this.basics[ingredient.name] = null;

        this.basicIngredients = ingredient.map((ingredient2) => {
          return {tag : ingredient2['name']};
        });
        $('.chips-ingredients').material_chip({
          data: this.basicIngredients,
          placeholder: 'Your fridge ingredients here'
        });
        console.log(this.basicIngredients);
      });

    $('#time-drop-down').material_select();

    // $('.chips').material_chip();

    // $('.chips-ingredients').material_chip({
    //   placeholder: 'Your fridge ingredients here',
    // });

    // this.findIngredient();
  }

  // findIngredient() {
  //   this.ingredientService.getIngredients(this.ingredientValue)
  //     .subscribe((ingredients) => {
  //       this.ingredients = ingredients;
  //       const data = {};
  //       const self = this;

  //       if (this.ingredients !== null) {
  //         ingredients.forEach(ingredient => {
  //           data[ingredient.name] = null;
  //         });

  //         // Display matching ingredients on autocomplete
  //         $('.chips-ingredients').material_chip({
  //           autocompleteOptions: {
  //           data: data,
  //           // onAutocomplete:
  //           //   function () {
  //           //     self.addIngredientToSearcher($(this).text());
  //           //     $('#autocomplete-input').val('');
  //           //   },
  //             limit: Infinity,
  //           minLength: 1
  //         }});
  //       }





  //       // if (this.ingredients !== null) {
  //       //   ingredients.forEach(ingredient => {
  //       //     data[ingredient.name] = null;
  //       //   });

  //       //   // Display matching ingredients on autocomplete
  //       //   $('.chips-autocomplete').material_chip({
  //       //     autocompleteOptions: {
  //       //       data: data,
  //       //     },
  //       //     limit: Infinity,
  //       //     onAutocomplete:
  //       //       function () {
  //       //         self.addIngredientToSearcher($(this).text());
  //       //         $('#autocomplete-input').val('');
  //       //       },
  //       //     minLength: 1
  //       //   });
  //       // }
  //     });
  // }

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

  // searchRecipes(ingredientsSelected) {
  //   this.recipeService.getRecipes(this.ingredientsSelected);
  // }

  // searchRecipes(ingredientsSelected) {
  //   this.ingredientService.getRecipes(this.ingredientsSelected)
  //     .subscribe((recipes) => {
  //       this.recipes = recipes;
  //     });
  // }

}
