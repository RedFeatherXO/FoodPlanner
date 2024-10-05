require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 3000; // Port für den Server

// Verwende die tatsächlichen Anmeldeinformationen
const username = encodeURIComponent(process.env.REACT_APP_USERNAME_MONG);
const password = encodeURIComponent(process.env.REACT_APP_PASSWORD_MONG);
const uri = `mongodb+srv://${username}:${password}@cluster0.g3cqb7j.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set headers to ensure UTF-8 encoding
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

client
  .connect()
  .then(() => {
    db = client.db("Rezeptverwaltung");
    console.log("connected to Mongodb");
  })
  .catch((error) => {
    console.error("Failed to connect to Mongodb", error);
    console.log("Server is now shutdown");
    process.exit(1);
  });

  app.put("/api/UpdateRecipe/:id", async (req, res) => {
    if (!db) return res.status(500).send("Database connection not established");
    
    try {
      const recipeId_string = req.params.id;
      const recipeId = new ObjectId(recipeId_string); // Umwandeln in ObjectId für MongoDB
      
      // Neue Rezeptdaten aus dem Request-Body
      const updatedRecipe = req.body;
  
      // Hole die Rezepte-Kollektion
      const Rezepte = db.collection("rezepte");
  
      // Aktualisiere das Rezept mit der entsprechenden ID
      const result = await Rezepte.updateOne(
        { _id: recipeId }, // Filter: Finde das Rezept mit der ID
        { $set: updatedRecipe } // Setze die neuen Rezeptdaten
      );
  
      // Überprüfe, ob das Rezept erfolgreich aktualisiert wurde
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Recipe updated successfully", id: recipeId_string });
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    } catch (error) {
      console.error("Error updating recipe", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

app.delete("/api/DeleteRecipe/:id/:date", async (req, res) => {
  if (!db) return res.status(500).send("Database connection not established");
  try {
    const Users = db.collection("user");
    const username = { name: "dev" };
    const user = await Users.findOne(username);
    const date_string = req.params.date;
    const recipeId_string = req.params.id;
    const recipeId = new ObjectId(recipeId_string);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Lösche das Rezept aus dem Array
    const result = await Users.updateOne(
      { name: username.name }, // Filter
      {
        $pull: {
          ausgewählteRezepte: {
            datum: date_string, // Datum
            rezepte_id: recipeId, // Rezept-ID
          },
        },
      }
    );

    if (result.modifiedCount === 1) {
      res.status(200).send("Recipe deleted successfully");
    } else {
      res.status(404).send("Recipe not found");
    }
  } catch (error) {
    console.error("Error deleting recipe", error);
    res.status(500).send("Internal Server Error");
  }
});

// Beispiel-Endpunkt für eine Datenbankabfrage
app.get("/api/recipe", async (req, res) => {
  if (!db) return res.status(500).send("Database connection not established");
  try {
    const Rezepte = db.collection("rezepte");
    const query = { name: "Spaghetti Bolognese" };
    const rezept = await Rezepte.findOne(query);
    res.json(rezept);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/recipe", async (req, res) => {
  if (!db) return res.status(500).send("Database connection not established");
  try {
    const recipes = db.collection("rezepte");
    const doc = req.body; // Annahme, dass das Rezept im Anfragekörper gesendet wird
    const result = await recipes.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(201).json({ message: "Recipe inserted", id: result.insertedId });
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/SelectedRecipeForDay", async (req, res) => {
  if (!db) return res.status(500).send("Database connection not established");
  try {
    const userCollection = db.collection("user");
    const { date, recipeID, userID } = req.body;
    const userObjectId = new ObjectId(userID);
    const recipeObjectId = new ObjectId(recipeID);
    // Suche den Benutzer in der Datenbank
    const user = await userCollection.findOne({ _id: userObjectId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prüfe, ob bereits ein Rezept für das gegebene Datum existiert
    const existingRecipeIndex = user.ausgewählteRezepte.findIndex((entry) => entry.datum === date);

    if (existingRecipeIndex >= 0) {
      // Wenn bereits ein Rezept für das Datum existiert, aktualisiere es
      user.ausgewählteRezepte[existingRecipeIndex].rezept_id = recipeObjectId;
    } else {
      // Wenn noch kein Rezept für das Datum existiert, füge es hinzu
      user.ausgewählteRezepte.push({
        datum: date,
        rezepte_id: recipeObjectId,
      });
    }
    // Aktualisiere den Nutzerdatensatz in der Datenbank
    await userCollection.updateOne({ _id: userObjectId }, { $set: { ausgewählteRezepte: user.ausgewählteRezepte } });

    res.status(201).json({ message: "Recipe selected for the day" });
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/GetRecipeCatalog", async (req, res) => {
  if (!db) return res.status(500).send("Database connection not established");
  try {
    const Rezepte = db.collection("rezepte");
    const rezepteArray = await Rezepte.find({}).toArray();
    res.json(rezepteArray);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

const imagesDir = path.join(__dirname, "../dist/images");

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Speicherort und -namen festlegen
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(imagesDir, req.file.filename);

  // Überprüfen, ob die Datei existiert
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist:", filePath);
      return res.status(500).send("File upload failed: File not found after upload.");
    }

    res.json({ message: "File uploaded successfully", filePath: `/images/${req.file.filename}` });
  });
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

// ----------------------------------- TEST -----------------------------------------------------

app.get("/api/Test", async (req, res) => {
  if (!db) return res.status(500).send("Database connection not established");
  try {
    const Users = db.collection("user");
    var date = String(req.query.date);
    const query = { name: "dev", "ausgewählteRezepte.datum": date };
    const user = await Users.findOne(query, {
      projection: {
        ausgewählteRezepte: {
          //Durch "$elemMatch" verwendet, um nur das Element in ausgewählteRezepte zurückzugeben, das dem gesuchten Datum entspricht
          $elemMatch: { datum: date },
        },
      },
    });
    res.json(user);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/Test2", async (req, res) => {
  if (!db) return res.status(500).send("Database connection not established");
  try {
    const Users = db.collection("user");
    const query = { name: "dev" };
    const user = await Users.findOne(query);
    res.json(user);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/recipeTest", async (req, res) => {
  if (!db) return res.status(500).send("Database connection not established");
  try {
    const Rezepte = db.collection("rezepte");
    var Recipe_id = String(req.query.Recipe_id);
    var x = new ObjectId(Recipe_id);
    const query = { _id: x };
    const rezept = await Rezepte.findOne(x);
    // const user = await Users.findOne(query,{
    //     projection: {
    //       "ausgewählteRezepte":{ //Durch "$elemMatch" verwendet, um nur das Element in ausgewählteRezepte zurückzugeben, das dem gesuchten Datum entspricht
    //         $elemMatch: { "datum": date }
    //       }
    //     }
    // });
    res.json(rezept);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});
