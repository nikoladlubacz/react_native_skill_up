class Drink {
  name: string;
  image: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  ingredients: string[];

  constructor(
    name: string,
    image: string,
    category: string,
    alcoholic: string,
    glass: string,
    instructions: string,
    ingredients: string[]
  ) {
    this.name = name;
    this.image = image;
    this.category = category;
    this.alcoholic = alcoholic;
    this.glass = glass;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}

export default Drink;
