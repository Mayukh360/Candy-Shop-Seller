
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const baseurl = "https://crudcrud.com/api/1606b00affeb440db723628e8a7f9174/candylist";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiUrl = 'https://crudcrud.com/api/1606b00affeb440db723628e8a7f9174/candylist';

app.get('/candylist', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/candylist', async (req, res) => {
  try {
    const response = await axios.post(apiUrl, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.patch('/candylist/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.patch(`${apiUrl}/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(3000, () => console.log('Proxy server listening on port 3000'));
