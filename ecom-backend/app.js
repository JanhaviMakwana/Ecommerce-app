const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/admin');
const authRoutes = require('./src/routes/auth');
const shopRoutes = require('./src/routes/shop');
const db = require('./src/models');


app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type', 'Origin', 'Authorization'],
    'credentials': true,
    'origin': 'http://localhost:3000',
    'methods': 'GET, HEAD, PUT,POST,DELETE'
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(shopRoutes);
app.use(authRoutes);
app.use(routes);


const server = require('http').createServer(app);

db.sequelize.sync({ force: false })
    .then(res => {
        db.user.findOne({ where: { role: 'admin' } })
        .then(user => {
            if(!user) {
                db.user.create({ email: 'admin@123.com', password: 'admin123', role: 'admin' });
            }
        });
        server.listen(8080);
    })
    .catch(err => console.log(err));


