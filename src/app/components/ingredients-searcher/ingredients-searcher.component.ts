import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredients-searcher',
  templateUrl: './ingredients-searcher.component.html',
  styleUrls: ['./ingredients-searcher.component.css']
})
export class IngredientsSearcherComponent implements OnInit {
  @Output() ingredient = new EventEmitter<string>();
  ingredientValue: string;
  ingredients = null;


  constructor(private ingredientService: IngredientService) { }

  ngOnInit() { }

  findIngredient() {
    this.ingredient.emit(this.ingredientValue);
    this.ingredientService.getIngredients()
      .subscribe((ingredients) => this.ingredients = ingredients);
    console.log(this.ingredientValue);
    console.log(this.ingredients);
  }

}
