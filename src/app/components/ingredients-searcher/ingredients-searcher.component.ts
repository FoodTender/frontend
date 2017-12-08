import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
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
  
  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    $('#time-drop-down').material_select();

   }

  findIngredient() {
    this.ingredientService.getIngredients(this.ingredientValue)
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
        const data = {};

        if (this.ingredients !== null){
        ingredients.forEach(ingredient => {
          data[ingredient.name] = null;
        });
        $('input.autocomplete').autocomplete({
          data: data,
          minLength: 1
        });
      }});
    // const autocompleteInput = document.getElementById('autocomplete-input');
    // autocompleteInput.autocomplete({
    //   data: this.ingredients,
    // });


  }

  addIngredientToSearcher(ingredient) {
    if (this.ingredientsSelected.indexOf(ingredient) < 0) {
      this.ingredientsSelected.push(ingredient);
    }
  }

  searchRecipes(ingredientsSelected) {
    this.ingredientService.getRecipes(this.ingredientsSelected)
      .subscribe((recipes) => this.recipes = recipes);
  }

}
