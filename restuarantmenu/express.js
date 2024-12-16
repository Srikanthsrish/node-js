const express = require('express');
const app = express();
const port = 3008;
const cors=require("cors");

app.use(express.json());
app.use(cors())
// Sample restaurant menu data
const menu = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Classic pizza with tomato, mozzarella, and basil.",
    price: 8.99,
    category: "Main Course"
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing.",
    price: 5.99,
    category: "Salads"
  },
  {
    id: 3,
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone.",
    price: 4.50,
    category: "Dessert"
  },
  {
    id: 4,
    name: "Spaghetti Carbonara",
    description: "Pasta with creamy sauce, pancetta, and parmesan.",
    price: 10.99,
    category: "Main Course"
  }
];

// API endpoint to fetch the menu
app.get('/api/menu', (req, res) => {
  res.json(menu);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
