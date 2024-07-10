import { EventEmitter } from "@angular/core";
import { ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingredientChanged=new Subject<ingredient[]>();
    startedEditting=new Subject<number>();
    ingredients:ingredient[]=[
        new ingredient("Chilly Powder",1),
        new ingredient("Fishes",10)
      ]
      getIngredients(){
        return this.ingredients.slice();
      }
      getIngredient(index:number){
        return this.ingredients[index];
      }
      updateIngredient(ingredient:ingredient,index:number){
        this.ingredients[index]=ingredient;
        this.ingredientChanged.next(this.ingredients);
      }
      insertIng(ing:ingredient){
        this.ingredients.push(ing);
        this.ingredientChanged.next(this.ingredients.slice());
      }
      addToShoppingList(ingredient:ingredient[]){
        this.ingredients.push(...ingredient);
        this.ingredientChanged.next(this.ingredients.slice())
      }
      DeleteIngredient(index:number){
        this.ingredients.splice(index,1)
        this.ingredientChanged.next(this.ingredients.slice())
      }
}