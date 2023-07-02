/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('login', 'Api/V1/AuthController.login')
      Route.post('logout', 'Api/V1/AuthController.logout').middleware(['auth'])
      Route.get('me', 'Api/V1/AuthController.me').middleware(['auth'])
    }).prefix('/auth')

    Route.resource('vote-items', 'Api/V1/VoteItemsController').middleware({
      index: ['auth'],
      store: ['auth'],
      show: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })
    Route.post('vote-items/clear', 'Api/V1/VoteItemsController.clear').middleware(['auth'])

    Route.post('votes/:voteItemId', 'Api/V1/VotesController.vote').middleware(['auth'])
  }).prefix('/v1')
}).prefix('/api')
