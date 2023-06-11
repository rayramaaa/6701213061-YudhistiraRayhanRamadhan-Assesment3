const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();

// Middleware untuk mengizinkan permintaan dari alamat asal tertentu
app.use(cors());

// Parsing body request
app.use(express.json());


let datas = [
  { id: 1, nama: 'Data 1', besar: '30mb', type: 'csv' },
  { id: 2, nama: 'Data 2', besar: '40mb', type: 'csv' },
  { id: 3, nama: 'Data 3', besar: '50mb', type: 'csv' }
];

// GET: Mendapatkan semua data data
app.get('/data', (req, res) => {
  res.json(datas);
});

// GET: Mendapatkan data data berdasarkan ID
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = datas.find(g => g.id === id);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: 'data tidak ditemukan' });
  }
});

// POST: Menambahkan data data baru
app.post('/data', (req, res) => {
  const data = req.body;
  data.id = datas.length + 1;
  datas.push(data);
  res.status(201).json(data);
});

// PUT: Mengupdate data data berdasarkan ID
app.put('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dataIndex = datas.findIndex(g => g.id === id);
  if (dataIndex !== -1) {
    datas[dataIndex] = { ...datas[dataIndex], ...req.body };
    res.json(datas[dataIndex]);
  } else {
    res.status(404).json({ message: 'data tidak ditemukan' });
  }
});

// DELETE: Menghapus data data berdasarkan ID
app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dataIndex = datas.findIndex(g => g.id === id);
  if (dataIndex !== -1) {
    const data = datas[dataIndex];
    datas.splice(dataIndex, 1);
    res.json(data);
  } else {
    res.status(404).json({ message: 'data tidak ditemukan' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
