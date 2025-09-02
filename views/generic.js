// generic.js
import mongoose from "mongoose";

export function getCollectionModel(collectionName) {
  return mongoose.model(
    collectionName,
    new mongoose.Schema({}, { strict: false }),
    collectionName // <-- explicitly set collection name
  );
}
