const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5001 });

// Store connected clients in a Set
const clients = new Set();
const messages = []
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Add the client to the set when they connect
  clients.add(ws);

  // Send messagehistory to new client
  ws.send(JSON.stringify(messages))

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // Push message to messages array
      messages.push(data)

      // Broadcast the received message to all connected clients
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messages))
        }
      }
    } catch (e) {
      console.error("Invalid JSON received:", e);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    
    // Remove the client from the set when they disconnect
    clients.delete(ws);
  });
});
