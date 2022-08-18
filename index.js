const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    const newRecipe = await Recipe.create({
      title: "Brazilian Cheese Bread",
      level: "Easy Peasy",
      ingredients: [
        "1 large egg, room temperature",
        "1/3 cup extra virgin olive oil, plus more for greasing the pan",
        "2/3 cup milk",
        "1 1/2 cups (170 g) tapioca flour",
        "1/2 cup (66 g) packed grated or crumbled cheese, your preference",
        "1 teaspoon salt (or more to taste)",
      ],
      cuisine: "International",
      dishType: "snack",
      image:
        "https://www.atelierdeschefs.com/media/recette-e17908-pao-de-queijo-pain-de-fromage.jpg",
      duration: 20,
      creator: "Igor Monteiro",
    });

    await Recipe.insertMany([...data]);
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log("Rigatoni alla Genovese was successfully updated.");
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Carrot Cake successfully deleted.");
    await mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
