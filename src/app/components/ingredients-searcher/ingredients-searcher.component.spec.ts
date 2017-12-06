import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsSearcherComponent } from './ingredients-searcher.component';

describe('IngredientsSearcherComponent', () => {
  let component: IngredientsSearcherComponent;
  let fixture: ComponentFixture<IngredientsSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
