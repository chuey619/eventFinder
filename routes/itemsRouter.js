const itemsRouter = require('express').Router()
const itemsController = require('../controllers/itemsController')

itemsRouter.get('/', itemsController.index)
itemsRouter.post('/', itemsController.create)
itemsRouter.get('/:id', itemsController.show)
itemsRouter.put('/:id', itemsController.update)
itemsRouter.delete('/:id', itemsController.delete)
// itemsRouter.put('/:id/purchase', itemsController.purchase)
module.exports = itemsRouter