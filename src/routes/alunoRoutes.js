import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', AlunoController.index);
router.post('/',loginRequired, AlunoController.store);
router.get('/:idStudent', AlunoController.show);
router.put('/:idStudent', loginRequired, AlunoController.update);
router.delete('/:idStudent', loginRequired, AlunoController.delete);

export default router;