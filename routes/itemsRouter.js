const itemsRouter = require('express').Router()
const itemsController = require('../controllers/itemsController')

itemsRouter.get('/', itemsController.index)
itemsRouter.post('/', itemsRouter.create)
itemsRouter.get('/:id', itemsController.show)
itemsRouter.put('/:id', itemsController.update)
itemsRouter.delete('/:id', itemsController.delete)

module.exports = itemsRouter