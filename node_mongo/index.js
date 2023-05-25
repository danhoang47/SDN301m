const { MongoClient } = require("mongodb");
const assert = require("assert");

const url = "mongodb://127.0.0.1:27017";
const dbName = "conFusion";
const dboper = require("./operations");

const client = new MongoClient(url);

async function run() {
	try {
		const db = client.db(dbName);

		dboper
			.insertDocument(
				db,
				{ name: "King crab", description: "Seafood" },
				"dishes"
			)
			.then((result) => {
				console.log("Insert Document:\n", result.ops);

				return dboper.findDocuments(db, "dishes");
			})
			.then((docs) => {
				console.log("Found Document:\n", docs);

				return dboper.updateDocuments(
					db,
					{ name: "Pizza" },
					{ description: "Fast food" },
					"dishes"
				);
			})
			.then((result) => {
				console.log("Updated Document:\n", result.result);

				return dboper.findDocuments(db, "dishes");
			})
			.then((docs) => {
				console.log("Found Updated Documents:\n", docs);

				return client.close();
			});
	} catch (err) {
		console.error(err);
	} finally {
		
	}
}

run()