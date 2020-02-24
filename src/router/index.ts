import {Router} from "express";
import UserController from '../controllers/UserController'
import Profile from '../controllers/ProfileController'
import CreditCardController from "../controllers/CreditCardController";
import {hashPassMiddleware} from '../middlewares/hashPasswordMiddleware'
import {accessTokenVerify} from "../middlewares/tokenVerifyMiddleware";

const router = Router();

router.post('/user', hashPassMiddleware, UserController.create);
router.post('/login', UserController.login);
router.delete('/user/:id', UserController.delete);

router.post('/profile', accessTokenVerify,  Profile.create);
router.put('/profile/:id', accessTokenVerify,  Profile.update);
router.delete('/profile/:id', accessTokenVerify,  Profile.delete);
router.get('/profile/:id', accessTokenVerify,  Profile.get);
router.get('/profile', accessTokenVerify,  Profile.getAll);

router.post('/credit-card', accessTokenVerify, CreditCardController.create);
router.delete('/credit-card/:id', accessTokenVerify, CreditCardController.delete);


export default router;