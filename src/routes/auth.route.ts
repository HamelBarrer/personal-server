import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const route = Router();

route.post('/', login);

export default route;
