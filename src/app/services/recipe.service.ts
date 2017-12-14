import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

const baseUrl = environment.apiUrl;
const options = new RequestOptions();

@Injectable()
export class RecipeService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getRecipes(ingredients) {
    options.withCredentials = true;
    return this.http.get(`${baseUrl}/recipes/?ingredients=${ingredients}`, options)
      .map((res: Response) => res.json());
  }

  getRecipeDetail(ingredientId) {
    options.withCredentials = true;
    return this.http.get(`${baseUrl}/recipes/${ingredientId}`, options)
      .map((res: Response) => res.json());
  }

}
