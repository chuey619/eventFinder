const Item = require('../models/Item')
const itemsController = {}

itemsController.index = async (req, res, next) => {
    try {
        const foundItems = await Item.getAll()
        res.json({
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
        res.json({
            message: 'Item Found',
            data : foundItem
        })
    } catch(error) {
        next(error)
    }
}

itemsController.create = (req, res, next) => {
    try {
        const newItem = new Item(req.body)
        await newItem.save()
        res.json({
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
        res.json({
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
        res.json({
            message: 'Item updated',
            data: foundItem
        })
    } catch(error) {
        next(error)
    }
}