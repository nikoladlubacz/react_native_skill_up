class Drink {
  drinkId: string;
  nameDrink: string;
  image: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  ingredients: string[];

  constructor(
    id: string,
    nameDrink: string,
    image: string,
    category: string,
    alcoholic: string,
    glass: string,
    instructions: string,
    ingredients: string[]
  ) {
    this.drinkId = id;
    this.nameDrink = nameDrink;
    this.image = image;
    this.category = category;
    this.alcoholic = alcoholic;
    this.glass = glass;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}

export default Drink;
