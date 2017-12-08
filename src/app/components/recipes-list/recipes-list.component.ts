import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes = null;
  ingredientsSelected: string[];

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() { }

  searchRecipes(ingredientsSelected) {
    this.ingredientService.getRecipes(this.ingredientsSelected)
      .subscribe((recipes) => this.recipes = recipes);
  }

}
