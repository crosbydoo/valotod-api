const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_VALO_URL = process.env.URL_VALO;

router.get('/:endpointName', async (req, res) => {
    const { endpointName } = req.params;

    try {
        // Buat permintaan ke endpoint eksternal dengan nama dinamis
        const response = await axios.get(`${API_VALO_URL}${endpointName}`);
        const data = response.data; 
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mengambil data dari endpoint eksternal' });
    }
});

router.get('/:endpointName/:uuid', async (req, res) => {
    const { endpointName, uuid } = req.params;
    try {
       
        const response = await axios.get(`${API_VALO_URL}${endpointName}/${uuid}`);
        const data = response.data; 
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mengambil data dari endpoint eksternal' });
    }
});

module.exports = router;
