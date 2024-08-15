require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId  } = require("mongodb");
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
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

client.connect()
  .then(() => {
    db = client.db("Rezeptverwaltung");
    console.log("connected to Mongodb")
  })
  .catch(error => {
    console.error("Failed to connect to Mongodb", error);
    console.log("Server is now shutdown")
    process.exit(1);
  })

// Beispiel-Endpunkt für eine Datenbankabfrage
app.get("/api/recipe", async (req, res) => {
  try {
    const Rezepte = db.collection("rezepte");
    const query = { name: "Spaghetti Bolognese" };
    // console.log(Rezepte);
    const rezept = await Rezepte.findOne(query);
    // console.log('rezept found:', rezept);
    res.json(rezept);
  } catch (error) {
    console.error("Connection failed", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/recipe", async (req, res) => {
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

app.get('/api/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});




// ----------------------------------- TEST -----------------------------------------------------

app.get('/api/Test', async (req, res) => {
  try {
    const Users = db.collection("user");
    // console.log("-------------------");
    // console.log(req.query.name);
    var date = String(req.query.date);
    // console.log(date);
    // console.log("-------------------");
    const query = { name: "dev", "ausgewählteRezepte.datum": date };
    const user = await Users.findOne(query,{
      projection: {
        "ausgewählteRezepte":{ //Durch "$elemMatch" verwendet, um nur das Element in ausgewählteRezepte zurückzugeben, das dem gesuchten Datum entspricht
          $elemMatch: { "datum": date } 
        }
      }
  });
    // console.log(user)
    res.json(user);
  } catch (error) {
      console.error("Connection failed", error);
      res.status(500).send("Internal Server Error");
  }
});

app.get('/api/Test2', async (req, res) => {
  try {
    const Users = db.collection("user");
    // console.log("-------------------");
    // console.log(req.query.name);
    // console.log("-------------------");
    const query = { name: "dev"};
    const user = await Users.findOne(query);
    // console.log(user)
    res.json(user);
  } catch (error) {
      console.error("Connection failed", error);
      res.status(500).send("Internal Server Error");
  }
});

app.get("/api/recipeTest", async (req, res) => {
  try {
    const Rezepte = db.collection("rezepte");
    var Recipe_id = String(req.query.Recipe_id);
    var x = new ObjectId(Recipe_id);
    console.log(typeof(Recipe_id));
    console.log(typeof('66af31e4f75170870ed2fe78'));
    const query = { _id: x };
    console.log(query)
    const rezept = await Rezepte.findOne(x);
    console.log('rezept found:', rezept);
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




