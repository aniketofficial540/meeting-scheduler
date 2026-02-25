//main root folder
import express, {Request, Response} from 'express';
import dotenv from "dotenv";
import sequelize from './config/dbConnection';
// import routes from "./routes/index";

import "./modules/meeting/module/meeting.model";
import "./modules/meeting/module/user.model";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());

// app.get("/", routes);

// function that will initialize the connection
const startServer = async () => {
  try {
    await sequelize.authenticate(); //check connection
    console.log('MySQL Database connected successfully.');

    await sequelize.sync({ alter: true }); 
    console.log('Database tables synced automatically.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Unable to start the server or connect to the database:', error);
  }
};

startServer();