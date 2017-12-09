import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const baseUrl = environment.apiUrl;

@Injectable()
export class IngredientService {

  constructor(private http: Http) { }

  getIngredients(ingredient) {
    return this.http.get(`${baseUrl}/ingredients/?terms=${ingredient}`)
      .map((res: Response) => res.json());
  }

  getRecipes(ingredients) {
    const ingredientsString = this.parseListIngredientsToUrl(ingredients);
    return this.http.get(`${baseUrl}/recipes/?ingredients=${ingredientsString}`)
      .map((res: Response) => res.json());
  }

  parseListIngredientsToUrl(ingredients) {
    console.log(ingredients);
    let ingredientsUrl = '';

    const concat = ingredients.length > 1 ? true : false;

    const ingredientsStr = ingredients.join(',');
    console.log(ingredientsStr);
    ingredientsUrl += ingredientsStr;

    // ingredients.forEach(ingredient => {
    // ingredient = ingredient.name.replace(/ /g, '_'); // Replace white spaces to '_'
    // ingredientsUrl += ingredient;
    // if (concat) {
    //   ingredientsUrl += ',';
    // }
    // });
    // if (concat) {
    //   ingredientsUrl = ingredientsUrl.slice(0, -1); // Delete last ','
    // }

    console.log(ingredientsUrl);

    return ingredientsUrl;
  }

}
