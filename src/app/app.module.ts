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
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DisplayRecipesComponent } from './pages/display-recipes/display-recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';

import { IngredientsSearcherComponent } from './components/ingredients-searcher/ingredients-searcher.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';

import { IngredientService } from './services/ingredient.service';
import { RecipeService } from './services/recipe.service';
import { BookmarkService } from './services/bookmark.service';
import { AuthService } from './services/auth.service';

import { RequireAuthGuard } from './guards/require-auth.guard';
import { AnonGuard } from './guards/anon.guard';
import { AuthInitGuard } from './guards/auth-init.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthInitGuard], component: HomeComponent },
  { path: 'auth/signup', canActivate: [AnonGuard], component: SignupPageComponent },
  { path: 'auth/login', canActivate: [AnonGuard], component: LoginPageComponent },
  { path: 'recipes', canActivate: [AuthInitGuard], component: DisplayRecipesComponent },
  { path: 'recipes/:recipeId', canActivate: [AuthInitGuard], component: RecipeDetailComponent },
  { path: 'bookmarks', canActivate: [RequireAuthGuard], component: BookmarksComponent } // Add guard: check if logged in
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsSearcherComponent,
    SignupPageComponent,
    LoginPageComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    RecipesListComponent,
    DisplayRecipesComponent,
    RecipeDetailComponent,
    BookmarksComponent
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
    IngredientService,
    AuthService,
    RequireAuthGuard,
    AnonGuard,
    AuthInitGuard,
    RecipeService,
    BookmarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
