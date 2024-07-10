import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
// @ViewChild('localName') localNameRef:ElementRef;
// @ViewChild('localAmount') localAmountRef:ElementRef;
//@Output() addIng=new EventEmitter<ingredient>();
@ViewChild('f') formData:NgForm;
subscription:Subscription;
editMode=false;
editedItemIndex:number;
tobeEditedIngredient:ingredient;
constructor(private shoppinglistService:ShoppingListService){}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription=this.shoppinglistService.startedEditting.subscribe((index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.tobeEditedIngredient=this.shoppinglistService.getIngredient(this.editedItemIndex);
      this.formData.setValue({
        name:this.tobeEditedIngredient.name,
        amount:this.tobeEditedIngredient.amount
      })
    })
  }
addIngredient(f:NgForm){
const name=f.value.name;
const amount=f.value.amount;
if(this.editMode)
  this.shoppinglistService.updateIngredient(new ingredient(name,amount),this.editedItemIndex);
else
  this.shoppinglistService.insertIng(new ingredient(name,amount));
this.editMode=false;
f.reset();
}
resetIngredient(){
  this.formData.reset();
  this.editMode=false;
}
DeleteIngredient(){
  this.shoppinglistService.DeleteIngredient(this.editedItemIndex);
  this.resetIngredient();
}
}
