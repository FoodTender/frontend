import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

const baseUrl = environment.apiUrl;

@Injectable()
export class RecipeService {

  constructor(private http: Http) { }

  getRecipes(ingredients) {
    console.log('recipe service: ' + ingredients);
    // const ingredientsString = this.parseListIngredientsToUrl(ingredients);
    return this.http.get(`${baseUrl}/recipes/?ingredients=${ingredients}`)
      .map((res: Response) => res.json());
  }


}
