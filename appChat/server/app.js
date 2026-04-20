import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

import { createServer } from 'node:http';
import { Server } from 'socket.io';

dotenv.config();
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {},
});

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN,
});

await db.execute('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)'); 


io.on('connection', async (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', async (msg) => {
    let result

    try {
      const result = await db.execute({
        sql: 'INSERT INTO messages (content) VALUES (:msg)',
        args: { msg},
      })

      io.emit('chat message', msg, result.lastInsertRowid.toString());
      
    } catch (error) {
      console.error(error)
      return
    }

  });

  if (!socket.recovered) {
        try {
            const results = await db.execute({
                sql: 'SELECT id, content FROM messages WHERE id > ?',
                args: [socket.handshake.auth.serverOffset ?? 0]
            })

            results.rows.forEach(row =>{
                socket.emit('chat message', row.content, row.id.toString())
            })
        } catch (error) {
            console.log(error)
        }
    }
});


app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});