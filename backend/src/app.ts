import {Server} from './helpers/Server';

const server = new Server(3000);

server.listen();

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', (err) => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });
