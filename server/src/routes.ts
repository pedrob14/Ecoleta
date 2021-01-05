import express from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.get('/items', async (request, response) => {
    /* await: sempre que for usar uma query para o banco de dados é bom usar await,
    para aguardar a query terminar, para então ter os resultados. Para usar o await é necessário ter o async */
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: 'http://localhost:3333/uploads/${item.image}',
        };
    });

    return response.json(serializedItems)
});
// Criação de ponto de Coleta. Post -> Criar
routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const insertedIds = await knex('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id
        };
    });

    await knex('point_items').insert(pointItems);

    return response.json({ sucess: true});
});

export default routes;