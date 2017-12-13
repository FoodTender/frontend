import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const baseUrl = environment.apiUrl;
const options = new RequestOptions();


@Injectable()
export class IngredientService {

  constructor(private http: Http) { }

  getIngredients(ingredient) {
    options.withCredentials = true;
    return this.http.get(`${baseUrl}/ingredients/?terms=${ingredient}`, options)
      .map((res: Response) => res.json());
  }


  getBasicIngredients() {
    options.withCredentials = true;
    return this.http.get(`${baseUrl}/ingredients/basic`, options)
      .map((res: Response) => res.json());
  }

  // getBasicIngredients() {
  //   return this.http.get(`${baseUrl}/ingredients/basics`)
  //     .map((res: Response) => res.json());
  // }

  /// --- Moved to RecipeService --- //

  // getRecipes(ingredients) {
  //   const ingredientsString = this.parseListIngredientsToUrl(ingredients);
  //   return this.http.get(`${baseUrl}/recipes/?ingredients=${ingredientsString}`)
  //     .map((res: Response) => res.json());
  // }

  // parseListIngredientsToUrl(ingredients) {
  //   console.log(ingredients);
  //   let ingredientsUrl = '';

  //   const concat = ingredients.length > 1 ? true : false;

  //   const ingredientsStr = ingredients.join(',');
  //   console.log(ingredientsStr);
  //   ingredientsUrl += ingredientsStr;
  //   console.log(ingredientsUrl);

  //   return ingredientsUrl;
  // }

}
