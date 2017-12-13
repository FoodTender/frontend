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
  @Input() ingredients = [];
  ingredientValue; // User value on autocomplete
  ingredientsSelected = [];
  allIngredients = {};

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ingredientsSelected = this.ingredients.map(ingredient => {
      return { tag: ingredient.name };
    });

    this.ingredientService.getAllIngredients()
      .subscribe((ingredients) => {
        const self = this;

        ingredients.forEach(ingredient => {
          this.allIngredients[ingredient.name] = null;
        });

        $('.chips-ingredients').material_chip({
          data: this.ingredientsSelected,
          placeholder: 'Ingredients here',
          autocompleteOptions: {
            data: this.allIngredients,
          }
        });

        // Add user input to ingredientsSelected[]
        $('.chips-ingredients').on('chip.add', function (e, chip) {
          self.addIngredientToSearcher(chip.tag);
        });

      });

    $('#time-drop-down').material_select();

    // $('.chips').material_chip();

    // $('.chips-ingredients').material_chip({
    //   placeholder: 'Your fridge ingredients here',
    // });

    // this.findIngredient();
  }

  // Remove ingredient from ingredientsSelected[] when discarted
  handleDelete(event) {
    const parent = $(event.target).parent().html();
    const discardText = parent.substr(0, parent.indexOf('<'));
    this.ingredientsSelected = this.ingredientsSelected.filter(item => {
      if (typeof item === 'string' && item === discardText) {
        return false;
      }
      else if (typeof item === 'object' && item.tag === discardText) {
        return false;
      }
      return true;
    });
  }

  parseListIngredientsToUrl() { // Do not delete, we are using this
    const ingredientsArray = this.ingredientsSelected.map(item => (typeof item === 'string') ? item : item.tag);
    let ingredientsUrl = '';
    const ingredientsStr = ingredientsArray.join(',');
    ingredientsUrl += ingredientsStr;
    this.router.navigate(['/recipes'], { queryParams: { ingredients: ingredientsUrl } });
  }

  addIngredientToSearcher(ingredient) {
    if (this.ingredientsSelected.indexOf(ingredient) < 0) { // If not already selected
      this.ingredientsSelected.push(ingredient);
    }
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
