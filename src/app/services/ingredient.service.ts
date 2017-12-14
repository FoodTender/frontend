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

  getIngredients(ingredient) { // Get ingredients on autocomplete input
    options.withCredentials = true;
    return this.http.get(`${baseUrl}/ingredients/?terms=${ingredient}`, options)
      .map((res: Response) => res.json());
  }

  getAllIngredients() {
    return this.http.get(`${baseUrl}/ingredients/all`)
      .map((res: Response) => res.json());
  }

}
