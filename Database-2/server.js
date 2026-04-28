const app = require("./src/app");

const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://shlok:gqBiWPCYKO8LQDFN@cluster0.kwfkgbg.mongodb.net/Database-2",
    )
    .then(() => {
      console.log("Database Connected");
    });
};

connectToDatabase();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
