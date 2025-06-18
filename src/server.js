console.log("--- SERVER.JS WIRD GELADEN ---");
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

// HINWEIS: Verwende eine einzige Umgebungsvariable 'MONGO_URI' in deinen Vercel-Einstellungen.
// Das ist sicherer und die gängige Praxis.
const uri = process.env.MONGO_URI;

// Sicherheitscheck, ob die Variable in Vercel gesetzt wurde
if (!uri) {
  throw new Error("Die Umgebungsvariable MONGO_URI wurde nicht gefunden.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Diese Middleware stellt die Datenbankverbindung für jede API-Anfrage sicher.
const connectToDb = async (req, res, next) => {
  try {
    // Verbinde den Client mit dem Server (falls noch nicht verbunden)
    await client.connect();
    // Stelle die DB-Instanz für die Routen bereit
    req.db = client.db("Rezeptverwaltung");
    console.log("Successfully connected to MongoDB.");
    next();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    res.status(500).send("Database connection error");
  }
};

// Globale Middlewares für alle Anfragen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// Wende die Datenbank-Middleware auf alle API-Routen an
app.use("/api", connectToDb);

// --- DEINE API-ROUTEN, ANGEPASST FÜR VERCELL ---

app.put("/api/UpdateRecipe/:id", async (req, res) => {
  try {
    const Rezepte = req.db.collection("rezepte");
    const recipeId = new ObjectId(req.params.id);
    const updatedRecipe = req.body;

    const result = await Rezepte.updateOne(
      { _id: recipeId },
      { $set: updatedRecipe }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Recipe updated successfully", id: req.params.id });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error("Error updating recipe", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/DeleteRecipe/:id/:date", async (req, res) => {
  try {
    const Users = req.db.collection("user");
    const user = await Users.findOne({ name: "dev" });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const date_string = req.params.date;
    const recipeId = new ObjectId(req.params.id);

    const result = await Users.updateOne(
      { name: "dev" },
      { $pull: { ausgewählteRezepte: { datum: date_string, rezepte_id: recipeId } } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).send("Recipe deleted successfully");
    } else {
      res.status(404).send("Recipe not found or already deleted");
    }
  } catch (error) {
    console.error("Error deleting recipe", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/recipe", async (req, res) => {
  try {
    const Rezepte = req.db.collection("rezepte");
    const query = { name: "Spaghetti Bolognese" };
    const rezept = await Rezepte.findOne(query);
    res.json(rezept);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/recipe", async (req, res) => {
  try {
    const recipes = req.db.collection("rezepte");
    const doc = req.body;
    const result = await recipes.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(201).json({ message: "Recipe inserted", id: result.insertedId });
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/SelectedRecipeForDay", async (req, res) => {
  try {
    const userCollection = req.db.collection("user");
    const { date, recipeID, userID } = req.body;
    const userObjectId = new ObjectId(userID);
    const recipeObjectId = new ObjectId(recipeID);

    const user = await userCollection.findOne({ _id: userObjectId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingRecipeIndex = user.ausgewählteRezepte.findIndex((entry) => entry.datum === date);

    if (existingRecipeIndex >= 0) {
      user.ausgewählteRezepte[existingRecipeIndex].rezept_id = recipeObjectId;
    } else {
      user.ausgewählteRezepte.push({
        datum: date,
        rezepte_id: recipeObjectId,
      });
    }

    await userCollection.updateOne({ _id: userObjectId }, { $set: { ausgewählteRezepte: user.ausgewählteRezepte } });
    res.status(201).json({ message: "Recipe selected for the day" });
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/GetRecipeCatalog", async (req, res) => {
  console.log("ROUTE: /api/GetRecipeCatalog wurde aufgerufen."); // 1. Kommt die Anfrage hier an?
  try {
    const Rezepte = req.db.collection("rezepte");
    console.log("DB-QUERY: Führe find({}).toArray() aus..."); // 2. Wird die Abfrage gestartet?w
    const rezepteArray = await Rezepte.find({}).toArray();
    console.log("DB-ANTWORT: Daten gefunden, Anzahl:", rezepteArray.length); // 3. Was kommt zurück?
    res.json(rezepteArray);
  } catch (error) {
    console.error("FEHLER in /api/GetRecipeCatalog:", error); // 4. Gibt es einen Absturz?
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/health", (req, res) => {
  console.log("Health check endpoint called");
  res.status(200).send("Server is healthy");
});

// --- ACHTUNG: LOKALER DATEI-UPLOAD ---
// Der folgende Code für Datei-Uploads mit `multer` funktioniert auf Vercel NICHT,
// da das Dateisystem nur temporär ist. Ich habe ihn auskommentiert, damit dein
// Deployment nicht fehlschlägt.
//
// LÖSUNG: Verwende einen Cloud-Speicherdienst wie Vercel Blob, AWS S3 oder Cloudinary.

/*
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imagesDir = path.join(__dirname, "../dist/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
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
  res.json({ message: "File upload functionality needs to be migrated to a cloud storage service." });
});
*/

// --- TEST-ROUTEN ---

app.get("/api/Test", async (req, res) => {
  try {
    const Users = req.db.collection("user");
    var date = String(req.query.date);
    const query = { name: "dev", "ausgewählteRezepte.datum": date };
    const user = await Users.findOne(query, {
      projection: {
        ausgewählteRezepte: {
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
  try {
    const Users = req.db.collection("user");
    const query = { name: "dev" };
    const user = await Users.findOne(query);
    res.json(user);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/recipeTest", async (req, res) => {
  try {
    const Rezepte = req.db.collection("rezepte");
    var Recipe_id = String(req.query.Recipe_id);
    var x = new ObjectId(Recipe_id);
    const rezept = await Rezepte.findOne({ _id: x });
    res.json(rezept);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

// --- EXPORT FÜR VERCELL ---
// Vercel benötigt den Export der `app`, um den Server zu starten.
// Der `app.listen`-Teil wird entfernt.
module.exports = app;