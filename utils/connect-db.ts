import mongoose from "mongoose";

interface IConnection {
  isConnected: number;
}

const connection: IConnection = {
  isConnected: 0,
};

export async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.log(err);
  }
}
