const deviceRoute = require('./device.route');

const routes = app =>{
    app.use('/api/devices', deviceRoute);
    app.get('/',(req, res)=>{
        res.send('Hello, world!!!');
    });
}

module.exports = routes;