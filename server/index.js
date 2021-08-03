// server/index.js
const api = require('./api.js');
const express = require("express");
const { query } = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

/// endpoints
app.get("/", (request, response) => {
    response.send({ message: "Hello from server!" });
});

///api/items?q=:query
app.get("/api/items",async (request, response) => {
    const api_query=request.query.q;
    console.dir('search: '+ api_query);
    const data= await api.findProduct(api_query).catch((err)=>{
      response.status(400).send({'error':err.message});      
    });
    response.json(data);
});

app.get('/api/items/:id', async(request, response) => {
    const prod_id=request.params.id;
    console.dir('id: '+ prod_id);
    const data= await api.getProduct(prod_id).catch((err)=>{
      console.error( err.message);
      response.status(400).send({'error':err.message});      
    });
    response.json(data);
});

///
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});