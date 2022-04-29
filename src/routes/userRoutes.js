import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';
const router = new Router();

//rotas que não deveriam estar em um sistema real(veja o contexto neh kk)
router.get('/', loginRequired, UserController.index); //lista todos os usuários
router.get('/:id', UserController.show); // lista usuário


router.post('/', UserController.create);

//Rotas que requrem login(token)
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;