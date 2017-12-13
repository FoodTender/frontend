import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

const baseUrl = environment.apiUrl;
const options = new RequestOptions();

@Injectable()
export class BookmarkService {

  constructor(
    private http: Http
  ) { }

  getBookmarks() {
    options.withCredentials = true;
    return this.http.get(`${baseUrl}/bookmarks`, options)
      .map((res: Response) => res.json());
  }

}

