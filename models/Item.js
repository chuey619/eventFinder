const db = require('../db/config')

class Item {
    constructor(item) {
        this.id = item.id || null
        this.title = item.title
        this.description = item.description
        this.price = item.price
        this.image = item.image
        this.seller = item.seller
    }
    static findById = async (id) => {
        try {
            const foundItem = await db.oneOrNone(`SELECT * FROM items WHERE id = $1`, id)
            return new this(foundItem)
        } catch(error) {
            throw new Error(error)
        }
    }
    save = async () => {
        try {
            const newItem = await db.one(
                `INSERT INTO items
                (title, price, description, image, seller)
                VALUES
                ($/title/, $/price/, $/description/, $/image/, $/seller/)`,
                this
            )
            return Object.assign(this, newItem)
        } catch(error) {
            throw new Error(error)
        }
    }
    delete = async() => {
        try {
            return await db.one(`DELETE FROM items WHERE id = $1 RETURNING *`, this.id)
            
        } catch(error) {
            throw new Error(error)
        }
    }
    update = async(changes) => {
        try {
            Object.assign(this, changes)
            const updatedItem = await db.one(`UPDATE items SET price = $/price/, title= $/title/, description = $/description/, image = $/image/ WHERE id = $/id/ RETURNING *`, this) 
            return Object.assign(this, updatedItem)
        } catch(error) {
            throw new Error(error)
        }   
    }
}