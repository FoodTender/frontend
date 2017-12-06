import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { RouterLink } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { IngredientsSearcherComponent } from './components/ingredients-searcher/ingredients-searcher.component';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';

import { IngredientService } from './services/ingredient.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'ingredients', component: IngredientsListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsSearcherComponent,
    IngredientsListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MaterializeModule,
    RouterModule
  ],
  providers: [
    IngredientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
