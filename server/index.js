const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = 8080;

app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(express.json());

// // Styles carousel
app.use('/api/items', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true}));

// // Similar Products
app.use('/api/products/:productId', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true}));
app.use('/api/wishlist/:productId', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true}));

// Reviews Component
app.use('/productreviews', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true}));
app.use('/productreviews/reviews', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true}));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
