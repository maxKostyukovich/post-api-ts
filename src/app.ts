import express from 'express'
import cors from 'cors'
import { PORT } from "./constants";
import sequelize from './config/sequelize'
import {User} from './models/User'
import {errorHandler} from './errorHandlers/errorHandler'
import router from "./router";
const app: express.Application = express();


app.use(express.json());
app.use(cors());


app.use('/api',router);
app.use(errorHandler);
// app.post('/user', (req, res) => {
//    const user: User = new User(req.body);
//    user.save();
//    res.send(user);
//
// });

/*(async () => {
   await sequelize.sync()
})();*/ //for creating database))
app.listen(PORT);