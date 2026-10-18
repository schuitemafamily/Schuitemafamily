// Schuitema Family Recipes Data
const recipes = [
  {
    id: "oma-apple-pie",
    title: "Oma's Dutch Apple Pie",
    category: "Desserts",
    servings: 8,
    prepTime: "30 min",
    cookTime: "50 min",
    description: "A beloved family recipe passed down from Oma Schuitema. The perfect balance of tart apples and a flaky crust.",
    ingredients: [
      "2 1/2 cups all-purpose flour",
      "1 cup cold butter, cubed",
      "1/4 cup ice water",
      "6 large apples (mix of Granny Smith and Honeycrisp), peeled and sliced",
      "3/4 cup sugar",
      "2 tsp cinnamon",
      "1/4 tsp nutmeg",
      "1 tbsp lemon juice",
      "2 tbsp butter for filling"
    ],
    instructions: [
      "Prepare the crust: Mix flour and butter until crumbly, add ice water until dough forms. Chill for 30 minutes.",
      "Preheat oven to 375°F (190°C).",
      "Toss apples with sugar, spices, and lemon juice.",
      "Roll out bottom crust, place in pie dish, add filling, dot with butter.",
      "Top with lattice or full crust, crimp edges, cut vents.",
      "Bake 45-50 minutes until golden and bubbling. Cool before serving."
    ],
    notes: "Oma always used a mix of tart and sweet apples. For extra flavor, add a pinch of cardamom. Best served with a scoop of vanilla ice cream. Family tip: the crust is flakier if the butter is very cold.",
    tags: ["pie", "apple", "dessert", "dutch", "family favorite", "oma"]
  },
  {
    id: "stamppot-boerenkool",
    title: "Traditional Stamppot Boerenkool",
    category: "Mains",
    servings: 6,
    prepTime: "20 min",
    cookTime: "30 min",
    description: "Classic Dutch comfort food: mashed potatoes with kale, often served with smoked sausage.",
    ingredients: [
      "2 lbs potatoes, peeled and cubed",
      "1 lb kale (boerenkool), chopped",
      "1/2 cup milk",
      "4 tbsp butter",
      "Salt and pepper to taste",
      "1 smoked sausage (rookworst) or bacon",
      "Optional: mustard and gravy"
    ],
    instructions: [
      "Boil potatoes and kale together in salted water until tender (about 20-25 minutes).",
      "Drain well, mash with butter and milk until creamy.",
      "Season generously with salt and pepper.",
      "Serve with sliced smoked sausage, a dollop of mustard, and gravy if desired."
    ],
    notes: "This is a winter staple in the Schuitema household. Some family members like it with extra butter. The kale should be finely chopped. Perfect for cold evenings.",
    tags: ["dutch", "stamppot", "kale", "comfort food", "main", "traditional"]
  },
  {
    id: "banket",
    title: "Dutch Banket (Almond Pastry)",
    category: "Desserts",
    servings: 12,
    prepTime: "45 min",
    cookTime: "25 min",
    description: "A festive almond paste-filled pastry, traditionally enjoyed during the holidays.",
    ingredients: [
      "2 cups almond paste (or homemade)",
      "1 cup sugar",
      "2 eggs",
      "1/2 tsp almond extract",
      "Puff pastry sheets (2)",
      "Egg wash for glazing",
      "Optional: sliced almonds for topping"
    ],
    instructions: [
      "Mix almond paste, sugar, eggs, and extract until smooth.",
      "Roll out puff pastry, spread filling lengthwise, roll up, seal edges.",
      "Place on baking sheet, brush with egg wash, score top lightly.",
      "Bake at 375°F for 20-25 minutes until golden brown.",
      "Cool and slice. Dust with powdered sugar if desired."
    ],
    notes: "A Christmas tradition. The almond paste can be made ahead. Family recipe calls for a slightly denser filling. Store in airtight container for up to a week.",
    tags: ["dutch", "almond", "holiday", "pastry", "christmas", "banket"]
  }
];

const categories = ["All", "Appetizers", "Mains", "Desserts", "Sides", "Breakfast", "Holiday"];