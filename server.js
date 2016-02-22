app = require('./app.js');
config = require('./config.js')

// listen on port 8000 (for localhost)
var port = config.web.port;
app.listen(port);
console.log('Server running on localhost:' + port);

