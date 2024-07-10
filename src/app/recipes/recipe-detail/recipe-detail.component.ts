import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private routes:Router){}
  recipeDetail:Recipe;
  id:number;
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>this.id=params['id']);
    this.recipeDetail=this.recipeService.getRecipe(this.id);
  }

  editRecipe(){
    this.routes.navigate(['edit'],{relativeTo:this.route,queryParamsHandling:'preserve'})
  }
  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.routes.navigate(["/recipes"]);
  }
moveToShoppingList(){
  this.recipeService.AddToShoopingList(this.recipeDetail.ingredient);
}
}
