const http = require('http');
var bodyParser = require('body-parser')
// const routes = require('./routes');

const todoList = [
    {
      id: 1,
      value: 'Node Course',
      date: new Date().toDateString(),
      complete: false
    }
  ];

const server = http.createServer((req, res) => {
    console.log('joining');
    
    if(req.url === '/todo' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.statusCode = 200;
        res.write(JSON.stringify(todoList, null , '\t'));
        return res.end();
    } else if(req.url === '/todo' && req.method === 'POST'){
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.statusCode = 200;
        let body = '';
        // Streams
        // Events - resuelven parte asincrona
        // body es muy grande
        // lo envia por partes
        req.on('data', function (data) {
            body =  body + data.toString();
        });

        req.on('end', function () {
            console.log('req end', body);
            const bodyParsed = JSON.parse(body);
            todoList.push(bodyParsed);
            res.write(JSON.stringify(bodyParsed, null , '\t'));
            // req.connection.destroy()
            return res.end();
        });
        
    }
    // res.write('hello world');
    // return res.end();
});


server.listen(3005,() => {
    console.log('Server up an running');
});
