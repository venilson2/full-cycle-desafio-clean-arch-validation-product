import { app, sequelize } from '../express';
import request from 'supertest'

describe('E2E test for product', ()=> {

  beforeEach(async ()=> {
    await sequelize.sync({ force: true })
  })

  afterAll(async ()=> {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app)
    .post('/products')
    .send({
      name: 'Product 1',
    })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Product 1')
  })

  it('should list a product', async () => {

    const product1 = await request(app)
    .post('/products')
    .send({
      name: 'Product 1',
    })
    expect(product1.status).toBe(200)

    const product2 = await request(app)
    .post('/products')
    .send({
      name: 'Product 2',
    })
    expect(product2.status).toBe(200)

    const response = await request(app)
    .get('/products')
    .send()

    expect(response.status).toBe(200)
    expect(response.body.products.length).toBe(2)
    expect(response.body.products[0].name).toBe('Product 1')
    expect(response.body.products[1].name).toBe('Product 2')
  })

  it('should list a product in XML', async () => {

    const product1 = await request(app)
    .post('/products')
    .send({
      name: 'Product 1',
    })
    expect(product1.status).toBe(200)

    const product2 = await request(app)
    .post('/products')
    .send({
      name: 'Product 2',
    })
    expect(product2.status).toBe(200)

    const response = await request(app)
    .get('/products')
    .set("Accept", "application/xml")
    .send()

    expect(response.status).toBe(200)
    expect(response.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(response.text).toContain(`<products>`)
    expect(response.text).toContain(`<product>`)
    expect(response.text).toContain(`<name>Product 1</name>`)
    expect(response.text).toContain(`<name>Product 2</name>`)
  })
})