import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  ingredients = null;

  constructor(private ingredientService: IngredientService) { }


  findIngredient(userIngredient) {

  }

  ngOnInit() { }

}
