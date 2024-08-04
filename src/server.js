require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set headers to ensure UTF-8 encoding
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Beispiel-Endpunkt für eine Datenbankabfrage
app.get("/api/recipe", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("Rezeptverwaltung");
    const movies = database.collection("rezepte");
    console.log(movies);
    const query = { name: "Spaghetti Bolognese" };
    console.log(query);
    const movie = await movies.findOne(query);
    console.log('Movie found:', movie);
    res.json(movie);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});

app.post("/api/recipe", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("Rezeptverwaltung");
    const recipes = database.collection("rezepte");
    
    const doc = req.body; // Annahme, dass das Rezept im Anfragekörper gesendet wird
    const result = await recipes.insertOne(doc);
    
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(201).json({ message: "Recipe inserted", id: result.insertedId });
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
