import {Router} from "express";
import UserController from '../controllers/UserController'
import Profile from '../controllers/ProfileController'
import multer from "multer";
import CreditCardController from "../controllers/CreditCardController";
import PostController from '../controllers/PostController'
import CommentController from "../controllers/CommentController";
import {hashPassMiddleware} from '../middlewares/hashPasswordMiddleware'
import {accessTokenVerify} from "../middlewares/tokenVerifyMiddleware";
import {createDiskStorageConfig} from '../middlewares/multer'
import {isPaidCheck} from "../middlewares/isPaidCheckMiddleware";
import ValidationUser from "../utils/validationUser";
import ValidationPost from "../utils/validationPost";
import ValidationComment from "../utils/validationComment";
import ValidationProfile from "../utils/validationProfile";
import ValidationCreditCard from "../utils/validationCreditCard";
import {validation} from "../middlewares/validationMiddleware";

const upload = multer({storage : createDiskStorageConfig(multer, __dirname, '/../../public/static/images/postImages')});
const router = Router();

router.post('/user', validation(ValidationUser.create),hashPassMiddleware, UserController.create);
router.post('/login', validation(ValidationUser.login), UserController.login);
router.delete('/user/:id', UserController.delete);

router.post('/profile', validation(ValidationProfile.create), accessTokenVerify,  Profile.create);
router.put('/profile/:id', validation(ValidationProfile.update), accessTokenVerify,  Profile.update);
router.delete('/profile/:id', accessTokenVerify,  Profile.delete);
router.get('/profile/:id', accessTokenVerify,  Profile.get);
router.get('/profile', accessTokenVerify,  Profile.getAll);

router.post('/credit-card', validation(ValidationCreditCard.create), accessTokenVerify, CreditCardController.create);
router.delete('/credit-card/:id', accessTokenVerify, CreditCardController.delete);

router.post('/post', validation(ValidationPost.create), accessTokenVerify, isPaidCheck, upload.single("mainImg"), PostController.create);
router.put('/post/:id',  validation(ValidationPost.update), accessTokenVerify, isPaidCheck, upload.single("mainImg"), PostController.update);
router.delete('/post/:id',  accessTokenVerify, isPaidCheck, PostController.delete);
router.get('/post/:id',  accessTokenVerify, isPaidCheck, PostController.get);
router.get('/post',  accessTokenVerify, isPaidCheck, PostController.getAll);

router.post('/comment', validation(ValidationComment.create), accessTokenVerify, isPaidCheck, CommentController.create);
router.delete('/comment/:id', accessTokenVerify, isPaidCheck, CommentController.delete);
router.get('/comment/:id', CommentController.get);

export default router;