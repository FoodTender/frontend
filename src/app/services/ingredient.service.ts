import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class IngredientService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  getIngredients(ingredient) {
    return this.http.get(`${this.baseUrl}/ingredients?terms=${ingredient}`)
      .map((res: Response) => res.json());
  }

}
