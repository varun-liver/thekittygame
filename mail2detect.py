import asyncio
import websockets
import json

async def echo(websocket, path):
    async for message in websocket:
        print(f"Received from client: {message}")
        
        # Try to parse JSON, if it fails treat it as plain text
        try:
            data = json.loads(message)
            print(f"Parsed data: {data}")
        except json.JSONDecodeError:
            print("Received a plain string message")

        # Send response back to the client
        response = f"Server received: {message}"
        await websocket.send(response)

# Start the WebSocket server
start_server = websockets.serve(echo, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
