import { ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredient:ingredient[];

    constructor(name:string,description:string,imagePath:string,ingredient:ingredient[]){
        this.name=name;
        this.description=description;
        this.imagePath=imagePath;
        this.ingredient=ingredient;
    }
}