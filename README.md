feathers-mongoose-swagger
===============================

Passes your mongoose Schema as model definition to Swagger while you declare a `feathers-mongose` service.
Behind the scenes, this package uses [mongoose-to-swagger](https://github.com/giddyinc/mongoose-to-swagger)


### Code Example

```js
// books.service.js

const createService = require('feathers-mongoose-swagger');
const createModel = require('../../models/books.model');

module.exports = (app) = {
    // Pass the model name as the first argument,
    // Then the mongoose options object...
    const service = createService('book', {
        Model: createModel(app)
    });

    // The package will add book and book list models to service.docs.
    // It will also wire the response definitions to point to those models.

    app.use('/books', service);

    app.hooks({
        // ...
    });
}
```
