const express = require("express");
const app = express();
const port = 8000;
const Datastore = require("nedb");

app.listen(port, () => {
	console.log(`Data Selfie app listening at http://localhost:${port}`);
});

app.use(express.static("public"));

app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/api", (request, response) => {
	console.log("I got a request!");
	const data = request.body;
	const timestamp = Date.now();
	data.timestamp = timestamp;
	database.insert(data);
	response.json(data);
});

app.get("/api", (request, response) => {
	database.find({}, (err, data) => {
		if (err) {
			response.end();
			return;
		}
		response.json(data);
	});
});
