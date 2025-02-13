const express = require('express');
const methodOverride = require('method-override');
const app = express();

// ...existing code...

// Middleware to handle method override
app.use(methodOverride('_method'));

// ...existing code...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
