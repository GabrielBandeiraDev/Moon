import { WebSocketServer } from 'ws';
import { promises as fs } from 'fs';
import path from 'path';

const pointsFilePath = path.join('/tmp', 'points.json');

export default async (req, res) => {
  if (req.method === 'GET') {
    // Inicializar WebSocket Server
    const wss = new WebSocketServer({ noServer: true });

    // Carregar pontos do arquivo
    let points = 0;
    try {
      const data = await fs.readFile(pointsFilePath, 'utf8');
      points = JSON.parse(data).points;
    } catch (error) {
      // Arquivo não encontrado ou erro de leitura
    }

    // Manipular conexões WebSocket
    wss.on('connection', (ws) => {
      ws.send(JSON.stringify({ points }));

      ws.on('message', async (message) => {
        const data = JSON.parse(message);
        if (data.points !== undefined) {
          points = data.points;
          await fs.writeFile(pointsFilePath, JSON.stringify({ points }));

          // Enviar os novos pontos para todos os clientes
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ points }));
            }
          });
        }
      });
    });

    // Configurar o servidor para suportar WebSocket
    const server = req.socket.server;
    server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });

    res.status(200).send('WebSocket server is running');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
