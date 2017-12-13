import { Component, OnInit } from '@angular/core';

import { BookmarkService } from '../../services/bookmark.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  bookmarks = null;

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.returnBookmarks();
  }

  returnBookmarks() {
    this.bookmarkService.getBookmarks()
      .subscribe((bookmarks) => {
        this.bookmarks = bookmarks;
      });
  }

}
