import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.css']
})
export class BookmarksListComponent implements OnInit {
  @Input() recipe = null;

  constructor() { }

  ngOnInit() {
  }

}
