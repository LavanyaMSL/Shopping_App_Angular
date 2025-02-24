import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{
  clickedRecipe:Recipe;
  constructor(private recipeService:RecipeService){
  }
  ngOnInit(){
    this.recipeService.selectedRecipe.subscribe((selectedRec:Recipe)=>this.clickedRecipe=selectedRec);
  }
}
