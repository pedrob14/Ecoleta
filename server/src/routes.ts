import express from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.get('/items', async (request, response) => {
    /* await: sempre que for usar uma query para o banco de dados é bom usar await,
    para aguardar a query terminar, para então ter os resultados. Para usar o await é necessário ter o async */
    const items = await knex('items').select('*');

    return response.json(items)
});

export default routes;