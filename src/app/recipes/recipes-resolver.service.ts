import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
constructor(private dataservice:DataStorageService,private recipeService:RecipeService){

}
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes=this.recipeService.getRecipes();
    if(recipes.length===0)
   return this.dataservice.fetchRecipes(); 
else
return recipes;
}
}