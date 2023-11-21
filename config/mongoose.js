import mongoose from "mongoose";

const MongoConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "Authentication",
    })
    .then(() => console.log("MONGO CONNECTED"))
    .catch((e) => console.log(`error while connecting mongoDB ${e}`));
};
export default MongoConnection;
