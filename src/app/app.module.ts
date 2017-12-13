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

import { IngredientsSearcherComponent } from './components/ingredients-searcher/ingredients-searcher.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';

import { IngredientService } from './services/ingredient.service';
import { RecipeService } from './services/recipe.service';
import { AuthService } from './services/auth.service';

import { RequireAuthGuard } from './guards/require-auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth/signup', component: SignupPageComponent },
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'recipes', component: DisplayRecipesComponent },
  { path: 'recipes/:recipeId', component: RecipeDetailComponent }
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
    RecipeDetailComponent
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
    LoggedInGuard,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
