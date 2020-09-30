require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select "productId",
         "name",
         "price",
         "image",
         "shortDescription"
    from "products"
  `;
  db.query(sql)
    .then(result => {
      return res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.sstatus(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
  select *
    from "products"
    where "productId" = $1
    `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        return next(new ClientError(`Cannot find product with "productId" ${productId}`, 404));
      } else {
        return res.status(200).json(product);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (req.session.cartId) {
    const cartId = req.session.cartId;
    const sql = `
    select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = $1
  `;
    const params = [cartId];
    db.query(sql, params)
      .then(result => {
        return res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  } else {
    return res.json([]);
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
    select "price"
      from "products"
    where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        return next(new ClientError(`Cannot find product with "productId" ${productId}`, 400));
      } else {
        if (req.session.cartId) {
          const obj = {};
          obj.cartId = req.session.cartId;
          obj.price = product.price;
          return obj;
        } else {
          const sqlTwo = `
        insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId"
        `;
          return db.query(sqlTwo)
            .then(result => {
              const cartId = result.rows[0].cartId;
              req.session.cartId = cartId;
              const obj = {};
              obj.cartId = cartId;
              obj.price = product.price;
              return obj;
            });
        }
      }
    })
    .then(dbResult => {
      const sql = `
      insert into "cartItems"("cartId", "productId", "price")
      values($1, $2, $3)
      returning "cartItemId"
      `;
      const params = [dbResult.cartId, productId, dbResult.price];
      return db.query(sql, params)
        .then(result => {
          return result.rows[0].cartItemId;
        });
    })
    .then(dbResult => {
      const sql = `
      select "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using("productId")
      where "c"."cartItemId" = $1
      `;
      const params = [dbResult];
      db.query(sql, params)
        .then(result => {
          return res.status(201).json(result.rows[0]);
        });
    });
});

app.post('/api/orders', (req, res, next) => {
  if (req.session.cartId) {
    if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
      return res.status(400).json({
        error: '"name", "creditCard", and "shippingAddress" must be filled out'
      });
    }
    const sql = `
    insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
    values ($1, $2, $3, $4)
    returning *
  `;
    const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
    db.query(sql, params)
      .then(result => {
        delete req.session.cartId;
        return res.status(201).json(result.rows[0]);
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({
          error: 'An unexpected error occured.'
        });
      });
  } else {
    return res.status(400).json({
      error: 'There is no cartId stored in the current session.'
    });
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
