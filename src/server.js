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

// Beispiel-Endpunkt für eine Datenbankabfrage
app.get("/api/movie", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    const query = { title: "Back to the Future" };
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

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

// async function run() {
//   try {
//     // Verbinde den Client mit der Datenbank
//     await client.connect();

//     // Wähle die Datenbank und die Sammlung
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');

//     // Abfrage für einen Film mit dem Titel 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } catch (error) {
//     console.error('Connection failed', error);
//   } finally {
//     // Schließe den Client, wenn du fertig bist
//     await client.close();
//   }
// }

// run().catch(console.dir);
