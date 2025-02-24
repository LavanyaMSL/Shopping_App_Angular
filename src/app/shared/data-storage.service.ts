import {Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs";

@Injectable({providedIn:"root"})
export class DataStorageService{
constructor(private http:HttpClient,private recipeService:RecipeService){}

storeRecipes(){
const recipes=this.recipeService.getRecipes();
this.http.put('https://testangular-62604-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>console.log(response));
}
fetchRecipes(){
     return this.http.get<Recipe[]>('https://testangular-62604-default-rtdb.firebaseio.com/recipes.json')
     .pipe(map(resObs=>{
         return resObs.map(t=>{return {...t,ingredient:t.ingredient||[]            
         };
     })
     }),tap(res=>this.recipeService.setRecipe(res)
    ))
    }
}