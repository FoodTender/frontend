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

  ingredientValue; // User value on autocomplete
  ingredients = null;
  ingredientsSelected: string[] = [];

  basics = [{}];
  basicIngredients = null;
  allIngredients = {};

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ingredientService.getBasicIngredients()
      .subscribe((ingredients) => {
        const self = this;
        this.basicIngredients = ingredients.reduce((basics, ingredient) => {
          if (ingredient.basic === true) {
            basics.push({ tag: ingredient.name });
            this.ingredientsSelected.push(ingredient.name);
          }
          return basics;
        }, []);
        console.log(this.basicIngredients);
        ingredients.forEach(ingredient => {
          this.allIngredients[ingredient.name] = null;
        });
        $('.chips-ingredients').material_chip({
          data: this.basicIngredients,
          placeholder: 'Your fridge ingredients here',
          autocompleteOptions: {
            data: this.allIngredients,
          }
        });

        $('.chips-ingredients').on('chip.add', function (e, chip) {
          // console.log(chip.tag);
          self.addIngredientToSearcher(chip.tag); // Add user input to ingredientsSelected[]
        });

      });

    $('#time-drop-down').material_select();

    // $('.chips').material_chip();

    // $('.chips-ingredients').material_chip({
    //   placeholder: 'Your fridge ingredients here',
    // });

    // this.findIngredient();

    // Remove ingredient from ingredientsSelected[] when discarted

    // $('.close').click(function () { // Not using
    //   console.log('click, ingredients:');
    //   console.log(this.ingredientsSelected);
    // });

  }

  handleDelete(event) {
    const parent = $(event.target).parent().html();
    const discardText = parent.substr(0, parent.indexOf('<'));
    const discardIndex = this.ingredientsSelected.indexOf(discardText);
    if (discardIndex > -1) { this.ingredientsSelected.splice(discardIndex, 1); }
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
    let ingredientsUrl = '';
    const ingredientsStr = ingredients.join(',');
    ingredientsUrl += ingredientsStr;
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
