import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const baseUrl = environment.apiUrl + '/ingredients';

@Injectable()
export class IngredientService {
  

  constructor(private http: Http) { }

  getIngredients(ingredient) {
    return this.http.get(`${baseUrl}/?terms=${ingredient}`)
      .map((res: Response) => res.json());
  }

}
