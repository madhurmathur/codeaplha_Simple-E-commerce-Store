const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// In-memory database with 100 products
let products = [
  { id: 1, name: 'Dell XPS 13 Laptop', price: 1299.99, description: 'Ultra-thin laptop with 16GB RAM and 512GB SSD', image: 'https://picsum.photos/200' },
  { id: 2, name: 'Samsung Galaxy S21', price: 799.99, description: '5G smartphone with 128GB storage and 8GB RAM', image: 'https://picsum.photos/200' },
  { id: 3, name: 'Apple iPhone 13', price: 999.99, description: 'Latest iPhone with A15 Bionic chip and dual camera', image: 'https://picsum.photos/200' },
  { id: 4, name: 'Sony WH-1000XM4 Headphones', price: 349.99, description: 'Noise-canceling headphones with 30-hour battery', image: 'https://picsum.photos/200' },
  { id: 5, name: 'Nike Air Max 270', price: 129.99, description: 'Stylish running shoes with air cushioning', image: 'https://picsum.photos/200' },
  { id: 6, name: 'Levi’s 501 Jeans', price: 69.99, description: 'Classic blue jeans for men and women', image: 'https://picsum.photos/200' },
  { id: 7, name: 'Adidas Ultraboost', price: 179.99, description: 'Running shoes with boost technology', image: 'https://picsum.photos/200' },
  { id: 8, name: 'Toshiba 43-inch LED TV', price: 299.99, description: '4K UHD TV with smart features', image: 'https://picsum.photos/200' },
  { id: 9, name: 'Canon EOS Rebel T7', price: 499.99, description: 'DSLR camera with 24.1MP sensor', image: 'https://picsum.photos/200' },
  { id: 10, name: 'Dyson V11 Vacuum', price: 599.99, description: 'Cordless vacuum with powerful suction', image: 'https://picsum.photos/200' },
  { id: 11, name: 'HP Pavilion 15', price: 799.99, description: '15-inch laptop with 8GB RAM', image: 'https://picsum.photos/200' },
  { id: 12, name: 'OnePlus 9 Pro', price: 899.99, description: '5G phone with 12GB RAM and 256GB storage', image: 'https://picsum.photos/200' },
  { id: 13, name: 'JBL Charge 5 Speaker', price: 149.99, description: 'Portable Bluetooth speaker with 20-hour battery', image: 'https://picsum.photos/200' },
  { id: 14, name: 'Ray-Ban Aviator Sunglasses', price: 159.99, description: 'Classic sunglasses with polarized lenses', image: 'https://picsum.photos/200' },
  { id: 15, name: 'Fitbit Charge 5', price: 179.99, description: 'Fitness tracker with heart rate monitor', image: 'https://picsum.photos/200' },
  { id: 16, name: 'KitchenAid Stand Mixer', price: 349.99, description: '10-speed mixer for baking enthusiasts', image: 'https://picsum.photos/200' },
  { id: 17, name: 'Samsung 65-inch QLED TV', price: 1299.99, description: '8K QLED TV with smart features', image: 'https://picsum.photos/200' },
  { id: 18, name: 'Bose QuietComfort Earbuds', price: 279.99, description: 'Noise-canceling earbuds with 6-hour battery', image: 'https://picsum.photos/200' },
  { id: 19, name: 'Under Armour Hoodie', price: 59.99, description: 'Comfortable hoodie for all seasons', image: 'https://picsum.photos/200' },
  { id: 20, name: 'Logitech MX Master 3', price: 99.99, description: 'Wireless mouse with ergonomic design', image: 'https://picsum.photos/200' },
  { id: 21, name: 'ASUS ROG Strix', price: 1399.99, description: 'Gaming laptop with RTX 3080', image: 'https://picsum.photos/200' },
  { id: 22, name: 'Google Pixel 6', price: 699.99, description: 'Android phone with 8GB RAM', image: 'https://picsum.photos/200' },
  { id: 23, name: 'Puma Suede Sneakers', price: 79.99, description: 'Casual sneakers with suede finish', image: 'https://picsum.photos/200' },
  { id: 24, name: 'LG OLED 55-inch TV', price: 1299.99, description: '4K OLED TV with HDR', image: 'https://picsum.photos/200' },
  { id: 25, name: 'Nikon Z6 Mirrorless', price: 1999.99, description: 'Full-frame mirrorless camera', image: 'https://picsum.photos/200' },
  { id: 26, name: 'Philips Air Fryer', price: 129.99, description: 'Healthy cooking with 4.1L capacity', image: 'https://picsum.photos/200' },
  { id: 27, name: 'Lenovo ThinkPad X1', price: 1499.99, description: 'Business laptop with 14-inch display', image: 'https://picsum.photos/200' },
  { id: 28, name: 'Xiaomi Mi 11', price: 749.99, description: '5G phone with 108MP camera', image: 'https://picsum.photos/200' },
  { id: 29, name: 'Timex Watch', price: 49.99, description: 'Classic analog watch for men', image: 'https://picsum.photos/200' },
  { id: 30, name: 'Beats Solo Pro', price: 299.99, description: 'Over-ear headphones with noise cancellation', image: 'https://picsum.photos/200' },
  { id: 31, name: 'H&M T-Shirt', price: 19.99, description: 'Cotton t-shirt in various colors', image: 'https://picsum.photos/200' },
  { id: 32, name: 'Razer Blade 15', price: 1899.99, description: 'Gaming laptop with 144Hz display', image: 'https://picsum.photos/200' },
  { id: 33, name: 'Oppo Find X3', price: 799.99, description: '5G phone with 65W charging', image: 'https://picsum.photos/200' },
  { id: 34, name: 'Converse All Star', price: 69.99, description: 'Iconic high-top sneakers', image: 'https://picsum.photos/200' },
  { id: 35, name: 'Panasonic Microwave', price: 149.99, description: '1.2 cu.ft. microwave with inverter', image: 'https://picsum.photos/200' },
  { id: 36, name: 'Acer Nitro 5', price: 999.99, description: 'Gaming laptop with RTX 3060', image: 'https://picsum.photos/200' },
  { id: 37, name: 'Realme GT Master', price: 399.99, description: '5G phone with 120Hz display', image: 'https://picsum.photos/200' },
  { id: 38, name: 'Zara Jacket', price: 99.99, description: 'Stylish winter jacket for men', image: 'https://picsum.photos/200' },
  { id: 39, name: 'Epson EcoTank Printer', price: 249.99, description: 'Inkjet printer with refillable tanks', image: 'https://picsum.photos/200' },
  { id: 40, name: 'Huawei P50 Pro', price: 1099.99, description: '5G phone with Leica cameras', image: 'https://picsum.photos/200' },
  { id: 41, name: 'Tommy Hilfiger Polo', price: 59.99, description: 'Classic polo shirt for men', image: 'https://picsum.photos/200' },
  { id: 42, name: 'MSI Katana GF66', price: 1299.99, description: 'Gaming laptop with RTX 3070', image: 'https://picsum.photos/200' },
  { id: 43, name: 'Vivo V23 5G', price: 449.99, description: '5G phone with 44MP selfie camera', image: 'https://picsum.photos/200' },
  { id: 44, name: 'Crocs Clogs', price: 39.99, description: 'Comfortable clogs in multiple colors', image: 'https://picsum.photos/200' },
  { id: 45, name: 'Bajaj Mixer Grinder', price: 49.99, description: '500W mixer with 3 jars', image: 'https://picsum.photos/200' },
  { id: 46, name: 'Alienware m15 R6', price: 1799.99, description: 'High-end gaming laptop', image: 'https://picsum.photos/200' },
  { id: 47, name: 'Poco X3 Pro', price: 249.99, description: '5G phone with 120Hz display', image: 'https://picsum.photos/200' },
  { id: 48, name: 'Calvin Klein Dress', price: 89.99, description: 'Elegant dress for women', image: 'https://picsum.photos/200' },
  { id: 49, name: 'Brother HL-L2350DW', price: 199.99, description: 'Monochrome laser printer', image: 'https://picsum.photos/200' },
  { id: 50, name: 'Redmi Note 11', price: 199.99, description: '4G phone with 6GB RAM', image: 'https://picsum.photos/200' },
  { id: 51, name: 'North Face Jacket', price: 149.99, description: 'Waterproof jacket for hiking', image: 'https://picsum.photos/200' },
  { id: 52, name: 'Lenovo Legion 5', price: 1199.99, description: 'Gaming laptop with AMD Ryzen 7', image: 'https://picsum.photos/200' },
  { id: 53, name: 'Oppo Reno 6', price: 499.99, description: '5G phone with 64MP camera', image: 'https://picsum.photos/200' },
  { id: 54, name: 'New Balance 990', price: 174.99, description: 'Premium running shoes', image: 'https://picsum.photos/200' },
  { id: 55, name: 'Sharp 32-inch TV', price: 199.99, description: 'HD LED TV with smart features', image: 'https://picsum.photos/200' },
  { id: 56, name: 'Fujifilm Instax Mini', price: 99.99, description: 'Instant camera for fun photography', image: 'https://picsum.photos/200' },
  { id: 57, name: 'Samsung Galaxy Watch 4', price: 249.99, description: 'Smartwatch with health tracking', image: 'https://picsum.photos/200' },
  { id: 58, name: 'H&M Skirt', price: 29.99, description: 'Fashionable skirt for women', image: 'https://picsum.photos/200' },
  { id: 59, name: 'HP Envy 13', price: 999.99, description: 'Ultrabook with 512GB SSD', image: 'https://picsum.photos/200' },
  { id: 60, name: 'Motorola Edge 20', price: 599.99, description: '5G phone with 108MP camera', image: 'https://picsum.photos/200' },
  { id: 61, name: 'Reebok Classic', price: 79.99, description: 'Casual sneakers with leather finish', image: 'https://picsum.photos/200' },
  { id: 62, name: 'Sony Bravia 50-inch', price: 799.99, description: '4K Android TV', image: 'https://picsum.photos/200' },
  { id: 63, name: 'Gap Sweatpants', price: 39.99, description: 'Comfortable sweatpants for men', image: 'https://picsum.photos/200' },
  { id: 64, name: 'Microsoft Surface Pro 8', price: 1099.99, description: '2-in-1 laptop with 16GB RAM', image: 'https://picsum.photos/200' },
  { id: 65, name: 'Nokia G20', price: 199.99, description: '4G phone with 48MP camera', image: 'https://picsum.photos/200' },
  { id: 66, name: 'Vans Old Skool', price: 64.99, description: 'Classic skate shoes', image: 'https://picsum.photos/200' },
  { id: 67, name: 'Bosch Coffee Maker', price: 89.99, description: '12-cup coffee maker with timer', image: 'https://picsum.photos/200' },
  { id: 68, name: 'Gigabyte Aorus 17', price: 1499.99, description: 'Gaming laptop with RTX 3060', image: 'https://picsum.photos/200' },
  { id: 69, name: 'Tecno Camon 18', price: 229.99, description: '5G phone with 48MP triple camera', image: 'https://picsum.photos/200' },
  { id: 70, name: 'Uniqlo Blazer', price: 79.99, description: 'Slim-fit blazer for men', image: 'https://picsum.photos/200' },
  { id: 71, name: 'Canon PIXMA TS3520', price: 59.99, description: 'All-in-one inkjet printer', image: 'https://picsum.photos/200' },
  { id: 72, name: 'Honor 50', price: 499.99, description: '5G phone with 108MP camera', image: 'https://picsum.photos/200' },
  { id: 73, name: 'Columbia Fleece', price: 69.99, description: 'Warm fleece jacket for outdoors', image: 'https://picsum.photos/200' },
  { id: 74, name: 'Apple MacBook Air M1', price: 999.99, description: 'MacBook with M1 chip and 8GB RAM', image: 'https://picsum.photos/200' },
  { id: 75, name: 'Realme Narzo 50', price: 199.99, description: '4G phone with 120Hz display', image: 'https://picsum.photos/200' },
  { id: 76, name: 'Aldo Loafers', price: 89.99, description: 'Leather loafers for men', image: 'https://picsum.photos/200' },
  { id: 77, name: 'TCL 40-inch TV', price: 249.99, description: 'Full HD LED TV', image: 'https://picsum.photos/200' },
  { id: 78, name: 'GoPro Hero 10', price: 399.99, description: 'Action camera with 5.3K video', image: 'https://picsum.photos/200' },
  { id: 79, name: 'Forever 21 Top', price: 24.99, description: 'Trendy top for women', image: 'https://picsum.photos/200' },
  { id: 80, name: 'Dell Inspiron 14', price: 699.99, description: '14-inch laptop with 256GB SSD', image: 'https://picsum.photos/200' },
  { id: 81, name: 'Infinix Zero X', price: 299.99, description: '5G phone with 90Hz display', image: 'https://picsum.photos/200' },
  { id: 82, name: 'Skechers Slip-ons', price: 54.99, description: 'Comfortable slip-on shoes', image: 'https://picsum.photos/200' },
  { id: 83, name: 'Morphy Richards Toaster', price: 39.99, description: '2-slice toaster with defrost', image: 'https://picsum.photos/200' },
  { id: 84, name: 'Asus ZenBook 14', price: 1099.99, description: 'Ultrabook with 16GB RAM', image: 'https://picsum.photos/200' },
  { id: 85, name: 'Samsung A52s', price: 349.99, description: '5G phone with 64MP camera', image: 'https://picsum.photos/200' },
  { id: 86, name: 'Zara Dress Shirt', price: 49.99, description: 'Formal dress shirt for men', image: 'https://picsum.photos/200' },
  { id: 87, name: 'Xerox WorkCentre', price: 299.99, description: 'Multifunction printer for office', image: 'https://picsum.photos/200' },
  { id: 88, name: 'IQOO 9', price: 699.99, description: '5G phone with Snapdragon 888', image: 'https://picsum.photos/200' },
  { id: 89, name: 'Patagonia Vest', price: 129.99, description: 'Insulated vest for outdoor use', image: 'https://picsum.photos/200' },
  { id: 90, name: 'Apple iPad Air', price: 599.99, description: '10.9-inch iPad with M1 chip', image: 'https://picsum.photos/200' },
  { id: 91, name: 'Tecno Pova 5', price: 179.99, description: '4G phone with 6000mAh battery', image: 'https://picsum.photos/200' },
  { id: 92, name: 'Clarks Desert Boots', price: 119.99, description: 'Classic leather desert boots', image: 'https://picsum.photos/200' },
  { id: 93, name: 'Black+Decker Drill', price: 79.99, description: '18V cordless drill for DIY', image: 'https://picsum.photos/200' },
  { id: 94, name: 'Huawei Mate 40', price: 899.99, description: '5G phone with Kirin 9000', image: 'https://picsum.photos/200' },
  { id: 95, name: 'Old Navy Shorts', price: 24.99, description: 'Casual shorts for men', image: 'https://picsum.photos/200' },
  { id: 96, name: 'Gigabyte G5', price: 1299.99, description: 'Gaming laptop with RTX 3060', image: 'https://picsum.photos/200' },
  { id: 97, name: 'Sony Xperia 5 III', price: 999.99, description: '5G phone with 120Hz OLED', image: 'https://picsum.photos/200' },
  { id: 98, name: 'Guess Handbag', price: 79.99, description: 'Stylish handbag for women', image: 'https://picsum.photos/200' },
  { id: 99, name: 'HP LaserJet Pro', price: 199.99, description: 'Color laser printer for home', image: 'https://picsum.photos/200' },
  { id: 100, name: 'Redmi Pad', price: 299.99, description: '10.1-inch tablet with 6GB RAM', image: 'https://picsum.photos/200' },
];
let users = [];
let cart = [];
let orders = [];

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/api/products', (req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push({ ...product, quantity });
    res.json({ message: 'Added to cart', cart });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/cart', (req, res) => res.json(cart));

app.delete('/api/cart/:id', (req, res) => {
  cart = cart.filter(item => item.id !== parseInt(req.params.id));
  res.json({ message: 'Removed from cart', cart });
});

app.post('/api/orders', (req, res) => {
  const order = { id: orders.length + 1, items: cart, total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0), date: new Date() };
  orders.push(order);
  cart = [];
  res.json({ message: 'Order placed', order });
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    users.push({ username, password });
    res.json({ message: 'User registered' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ message: 'Login successful', user });
  else res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));