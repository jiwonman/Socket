const socket = require('socket.io');

module.exports = (server) => {
    const io = socket(server, { path: '/socket.io'});

    io.on('connection', (socket) => {
        const req = socket.request;

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        
        console.log('새로운 클라이언트 접속 !', ip, socket.id, req.ip);

        // socket.on('disconnect', () => {
        //     console.log('클라이언트 접속 해제', ip, socket.id);
        //     clearInterval(socket.interval);
        // });
        socket.on('login', (data) => {
            console.log('Client logged-in:\n name: ' + data.name + '\n userid: ' + data.userid);
            
            socket.name = data.name;
            socket.userid = data.userid;

            io.emit('login', data.name);
        })


        socket.on('error', (error) => {
            console.log(error);
        });

        socket.on('reply', (data) => {
            console.log(data);
        });

        socket.on('chat', (data) => {
            console.log('Message from %s: %s', socket.name, data.msg);

            let msg = {
                from : {
                name : socket.name,
                userid : socket.userid
            },
            msg : data.msg
        };
        socket.broadcast.emit('chat', msg);
        socket.emit('chat', msg);
    });
        

        socket.on('chat message', (msg) => {
            console.log('msg : ' + msg);
            io.emit('chat message', msg);
        })

        // socket.interval = setInterval(() => {
        //     socket.emit('news', 'Hello Socket.IO');
        // }, 3000);
    });
}