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
    console.log('asdfh');
    options.withCredentials = true;
    console.log(`${baseUrl}/me/bookmarks`);
    return this.http.get(`${baseUrl}/me/bookmarks`, options)
      .map((res: Response) => res.json());
  }

}

