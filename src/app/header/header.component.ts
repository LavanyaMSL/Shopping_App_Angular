import { Component,EventEmitter,Input, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{
    constructor(private dataStorageService:DataStorageService){

    }
@Output() changeTofeatureEvent=new EventEmitter<string>();

changefeature(feature:string){
    this.changeTofeatureEvent.emit(feature)
}
onSaveData(){
    this.dataStorageService.storeRecipes();
}
onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
}
}