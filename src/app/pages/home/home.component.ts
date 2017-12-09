import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
declare var $: any;


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

  ngOnInit() {
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('.btn').on('click touchstart', e => {
      console.log('working');
    });
  }

}
