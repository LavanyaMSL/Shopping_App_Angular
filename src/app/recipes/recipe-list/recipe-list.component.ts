import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit,OnDestroy{

recipes:Recipe[];
subscription:Subscription;

constructor(private recipeService:RecipeService){

}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(){
    this.subscription=this.recipeService.updatedRecipe.subscribe((recipes)=>{
      this.recipes=recipes;
    });
    this.recipes=this.recipeService.getRecipes();
  }

// passRecipe(recipeName:Recipe){
//   this.passRecipes.emit(recipeName);
// }
}
