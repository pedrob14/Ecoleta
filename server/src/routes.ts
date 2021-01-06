import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsControllers';

const routes = express.Router();
const pointsControllers = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
// Criação de ponto de Coleta. Post -> Criar
routes.post('/points', pointsControllers.create);
routes.get('/points', pointsControllers.index);
routes.get('/points/:id', pointsControllers.show);

export default routes;