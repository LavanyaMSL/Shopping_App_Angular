import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  id:number;
  editMode:boolean=false;
  recipeForm:FormGroup;
constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router){}
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.editMode=params['id']!=null;
    })
    this.initForm();
  }
  onSubmit(){
    let recipe=new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],
    this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,recipe)
    }
    else
    this.recipeService.AddRecipe(recipe);
    this.cancelAction();
  }
get control(){
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
}
cancelAction(){
  this.router.navigate(["../"],{relativeTo:this.route});
}

  private initForm(){
    let recipeName="";
    let recipeImagePath="";
    let recipeDescription="";
    let recipeIngredients=new FormArray([]);
    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe.ingredient){
        for(let ing of recipe.ingredient){
          recipeIngredients.push(new FormGroup({
            'name':new FormControl(ing['name'],Validators.required),
            'amount':new FormControl(ing['amount'],[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeForm=new FormGroup({
      name:new FormControl(recipeName,Validators.required),
      imagePath:new FormControl(recipeImagePath,Validators.required),
      description:new FormControl(recipeDescription,Validators.required),
      ingredients:recipeIngredients
    })
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
  DeleteIngredient(i){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}
