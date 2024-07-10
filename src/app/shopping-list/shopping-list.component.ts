import { Component, OnDestroy, OnInit } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit,OnDestroy{
ingredients:ingredient[]
subscribe:Subscription
constructor(private shoppinglistService:ShoppingListService){}
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
  ngOnInit() {
    this.ingredients=this.shoppinglistService.getIngredients();
    this.subscribe=this.shoppinglistService.ingredientChanged.subscribe((ingredient)=>this.ingredients=ingredient);
  }
  EditItem(index:number){
this.shoppinglistService.startedEditting.next(index);
  }
}
