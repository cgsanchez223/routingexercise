process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb")
let newItem = { name: "popsicle", price:1.45 }
let updateName = {name: "bonpop", price:3.00 }

beforeEach(async () => {
    items.push(newItem);
});

afterEach(async () => {
    items = [];
});

// GET /items
describe("GET /items", () => {
    test("Gets a list of items", async () => {
        const res = await request(app).get(`/items`);
        const { items } = res.body;
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});

// GET /items/:name - return data about one item
describe("GET /items/:name", () => {
    test("Gets a single item", async () => {
        const res = await request(app).get(`/items/${newItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(newItem);
    });

    test("Responds with 500 when it cannot find an item", async () => {
        const res = await request(app).get(`/items/0`);
        expect(res.statusCode).toBe(500);
    });
});

// POST /items - create item from data
describe("POST /items", () => {
    test("Creates a new item", async () => {
        const res = await request(app).post("/items").send({ name: "cheerios", price: 3.40});
        expect(res.statusCode).toBe(200);
        expect(res.body.item.name).toEqual("cheerios");
        expect(res.body.item.price).toEqual(3.40);
    });
});

// PATCH /items:name - updates the item
describe("PATCH /items/:name", () => {
    test("Updates a single item", async () => {
        const res = await request(app).patch(`/items/${updateName.name}`).send({ name: "rocket" });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({ name: "rocket" });
    });
    test("Responds with 500 if can't find item", async function() {
        const res = await request(app).patch(`/items/0`);
        expect(res.statusCode).toBe(500);
    });
});

// DELETE /items:name - deletes item
describe("DELETE /items/:name", () => {
    test("Deletes a single item", async () => {
        const res = await request(app).delete(`/items/${newItem}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted "});
    })
})