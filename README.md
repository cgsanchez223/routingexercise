- 34.2 Routing and Middleware
- Routers can be connected to app.js
    - const router = new express.Router();
    - app.use("/users", userRoutes);
        - will be drawn from a userRoutes.js file

- Middleware - used with a req and res cycle. Can be used to call the next step or function.
    - express.json() - example of a middleware
    - can access 404 or other error handlers
    - to use:
        - const middleware = require("./middleware");
        - app.use(middleware.logger);
- External middleware can be implemented with a command called morgan
    - npm install morgan
    - const morgan = require(“morgan”);
    - app.use(morgan(‘dev’));

- Integration Tests - Makes sure everything runs
    - npm i --save-dev supertest


_______________________________________________________
- Assignment
- Routing and Middleware
- We created a Shopping List JSON API with Array
- fakeDb.js contains the array with the stored items

- Routes:
    - GET /items - renders JSON list of shopping items
    - POST /items - accepts JSON data to be added to shopping list
    - GET /items/:name - get specified name
    - PATCH /items/:name - can update specified item
    - DELETE /items/:name