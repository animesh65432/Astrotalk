"use server";
import { connect } from "mongoose";

let dbconnection = {
  connected: false,
};
async function dbconnect(): Promise<void> {
  try {
    if (!dbconnection.connected) {
      await connect(process.env.DATABASEURL as string);
      dbconnection.connected = true;
      console.log("connect to the database");
    } else {
      console.log("alredy connected to the database");
      return;
    }
  } catch (error) {
    console.log("did not  connecte to the database", error);
    dbconnection.connected = false;
  }
}

export default dbconnect;
