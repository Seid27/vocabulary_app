require('./models/Vocabulary')
const app = require('./app');
require('dotenv').config(); 

const server = app.listen(3000,()=>{
    console.log(`Express is running on ${server.address().port}`);
})