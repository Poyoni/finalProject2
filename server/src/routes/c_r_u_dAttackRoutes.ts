import express from 'express';
import { addNewAttack, getAttack, updateAttack, deleteAttack } from '../controllers/c_r_u_dAttackControllers';

const router = express.Router();

router.route('/attackDetails/addAttack/').post(addNewAttack);
router.route('/attackDetails/getAttack/:id').get(getAttack);
router.route('/attackDetails/updateAttack/:id').put(updateAttack);
router.route('/attackDetails/deleteAttack/:id').delete(deleteAttack);

export default router;