import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth.service';

const baseUrl = environment.apiUrl;

@Injectable()
export class RecipeService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getRecipes(ingredients) {
    // const ingredientsString = this.parseListIngredientsToUrl(ingredients);
    return this.http.get(`${baseUrl}/recipes/?ingredients=${ingredients}`)
      .map((res: Response) => res.json());
  }

  getRecipeDetail(ingredientId) {
    return this.http.get(`${baseUrl}/recipes/${ingredientId}`)
      .map((res: Response) => res.json());
  }

}
