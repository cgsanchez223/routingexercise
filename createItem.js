const items = require("./fakeDb")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static findAll(){
        return items
    }

    // Update item
    static update(name, data) {
        let updateItem = Item.find(name);
        if (updateItem === undefined) {
            throw {message: "Not Found", status: 404}
        }
        update.name = data.name;
        updateItem.price = data.price;

        return updateItem;
    }

    // Find and return item with matching name
    static find(name) {
        const foundItem = items.find(v => v.name === name);
        if(foundItem === undefined){
            throw { message: "Not Found", stauts: 404 }
        }
        return foundItem
    }

    // Remove item with matching id
    static remove(name) {
        let removeId = items.findIndex(v => v.name === name);
        if (removeId === -1) {
            throw {message: "Not Found", status: 404}
        }
        items.splice(removeId, 1);
    }
}

module.exports = Item;