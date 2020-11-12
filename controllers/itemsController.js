const Item = require('../models/Item')
const itemsController = {}

itemsController.index = async (req, res, next) => {
    try {
        const foundItems = await Item.getAll()
        return res.json({
            message: "items found",
            data: foundItems
        })
    } catch(error) {
        next(error)
    }
}
itemsController.show = async (req, res, next) => {
    try {
        const foundItem = await Item.findById(req.params.id)
        return res.json({
            message: 'Item Found',
            data : foundItem
        })
    } catch(error) {
        next(error)
    }
}

itemsController.create = async (req, res, next) => {
    try {
        const newItem = new Item({price: req.body.price, description: req.body.description, seller_id: req.user.id, title: req.body.title, image: req.body.image})
        await newItem.save()
        return res.json({
            message: 'Item created',
            data: newItem
        })
    } catch(error) {
        next(error)
    }
}

itemsController.delete = async (req, res, next) => {
    try {
        const foundItem = await Item.findById(req.params.id)
        await foundItem.delete()
        return res.json({
            message: 'Item deleted',
            data: foundItem
        })
    } catch(error) {
        next(error)
    }
}

itemsController.update = async (req, res, next) => {
    try {
        const foundItem = await Item.findById(req.params.id)
        await foundItem.update(req.body)
        return res.json({
            message: 'Item updated',
            data: foundItem
        })
    } catch(error) {
        next(error)
    }
}

module.exports = itemsController