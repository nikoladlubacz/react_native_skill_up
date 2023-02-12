class Drink {
  drinkId: string;
  nameDrink: string;
  image: string;
  instructions: string;
  ingredients: string[];

  constructor(
    drinkId: string,
    nameDrink: string,
    image: string,
    instructions: string,
    ingredients: string[]
  ) {
    this.drinkId = drinkId;
    this.nameDrink = nameDrink;
    this.image = image;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}

export default Drink;
