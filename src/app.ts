import express from 'express'
import cors from 'cors'
import { PORT } from "./constants";
import sequelize from './config/sequelize'
import {errorHandler} from './errorHandlers/errorHandler'
import router from "./router";
const app: express.Application = express();


app.use(cors());
app.use(express.json());



app.use('/api',router);
app.use(errorHandler);

app.listen(PORT, async () => {
    await sequelize.sync()
});