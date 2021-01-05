import express from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.get('/items', async (request, response) => {
    /* await: sempre que for usar uma query para o banco de dados é bom usar await,
    para aguardar a query terminar, para então ter os resultados. Para usar o await é necessário ter o async */
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            title: item.title,
            image_url: 'http://localhost:3333/uploads/${item.image}',
        };
    });

    return response.json(serializedItems)
});

export default routes;