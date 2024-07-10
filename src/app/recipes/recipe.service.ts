import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    selectedRecipe=new EventEmitter<Recipe>();
    updatedRecipe=new Subject<Recipe[]>();
    constructor(private shoppinglistService:ShoppingListService){}
  //  private recipes:Recipe[]=[
  //       new Recipe('Fish Fry',
  //       'Made with Fish',
  //       'https://vanitascorner.com/wp-content/uploads/2018/02/Surmai-fry.jpg',
  //   [new ingredient('fish',1),new ingredient('chilly',2),new ingredient('salt',2)]),
  //       new Recipe('Fish curry',
  //       'Made with Fish',
  //       'https://vanitascorner.com/wp-content/uploads/2018/02/Surmai-fry.jpg',
  //       [new ingredient('fish',1),new ingredient('red chilly',2),new ingredient('table salt',2)])
  //     ];
  private recipes:Recipe[]=[];
      getRecipes(){
        return this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      AddToShoopingList(ingredient:ingredient[]){
        this.shoppinglistService.addToShoppingList(ingredient);
      }
      updateRecipe(index:number,recipe:Recipe){
        this.recipes[index]=recipe;
        this.updatedRecipe.next(this.getRecipes())
      }
      AddRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.updatedRecipe.next(this.getRecipes())
      }
      deleteRecipe(id){
        this.recipes.splice(id,1);
        this.updatedRecipe.next(this.getRecipes())
      }
      setRecipe(recipes:Recipe[]){
        this.recipes=recipes;
        this.updatedRecipe.next(this.recipes.slice())
      }
}