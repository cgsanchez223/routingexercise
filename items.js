const express = require("express")
const router = express.Router()
const Item = require("./createItem")
const items = require("./fakeDb")
const ExpressError = require("./expressError")


// GET /items - this should render a list of shopping items.
// Response looks like this - [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get("", (req, res, next) => {
    try {
        return res.json({ items: Item.findAll() })
    } catch(err) {
        return next(err)
    }
});

// POST /items - this route should accept JSON data and add it to the shopping list.
// Response looks like this - {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
router.post("", (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({ item: newItem });
    } catch (err) {
        return next(err)
    }
});

// GET /items/:name - this route should display a single item’s name and price.
// Response looks like this - {“name”: “popsicle”, “price”: 1.45}
router.get('/:name', (req, res, next) => {
    try {
        // if(!req.params.name) throw new ExpressError("Name is required", 400);
        let foundItem = Item.find(req.params.name);
        return res.json({ item: foundItem });
    } catch(err) {
        return next(err)
    }
});
// router.get("/:name", function (req, res) {
//     let foundItem = Item.find(req.params.name);
//     if (foundItem === undefined) {
//         throw new ExpressError("Item not found", 404)
//     }
//     res.json({ item: foundItem });
// })

// PATCH /items/:name, this route should modify a single item’s name and/or price.
// Response looks like this - {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}
router.patch('/:name', (req, res, next) => {
    try {
        let foundItem = Item.update(req.params.name, req.body);
        return res.json({ item: foundItem });
    } catch (err) {
        return next(err)
    }
});

// DELETE /items/:name - this route should allow you to delete a specific item from the array.
// Response looks like this - {message: “Deleted”}
router.delete('/:name', (req, res, next) => {
    try {
        Item.remove(req.params.name);
        return res.json({ message: 'Deleted' })
    } catch (err) {
        return next(err)
    }
});

module.exports = router;