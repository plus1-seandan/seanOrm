import cors from "cors";
import express from "express";
import "reflect-metadata";
const User = require("./Models/User");

const main = async () => {
  const app = express();

  //************** ORM TESTING
  //test create new User table
  await User.tableCreate();
  const newUser = new User();
  newUser.values["name"] = "Sean";
  newUser.values["preferredName"] = "Shidizzle";
  //insert User
  await newUser.save();
  //fetch Users
  //const getUsers = await User.select({ id: 1 });
  //const getOneUser = getUsers[0];
  //delete a User
  //getOneUser.delete();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.listen(parseInt(process.env.SERVER_PORT || "4000"), () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
