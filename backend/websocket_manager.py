import json
from typing import List, Dict, Any
from fastapi import WebSocket

class WebSocketConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {
            "emergencies": [],
            "routes": [],
            "messages": []
        }

    async def connect(self, websocket: WebSocket, channel: str = "emergencies"):
        await websocket.accept()
        if channel not in self.active_connections:
            self.active_connections[channel] = []
        self.active_connections[channel].append(websocket)
        print(f"📡 WebSocket client connected to channel: {channel}")

    def disconnect(self, websocket: WebSocket, channel: str = "emergencies"):
        if channel in self.active_connections and websocket in self.active_connections[channel]:
            self.active_connections[channel].remove(websocket)
            print(f"🔌 WebSocket client disconnected from channel: {channel}")

    async def broadcast(self, message: Dict[str, Any], channel: str = "emergencies"):
        if channel in self.active_connections:
            disconnected = []
            for connection in self.active_connections[channel]:
                try:
                    await connection.send_json(message)
                except Exception:
                    disconnected.append(connection)
            
            for conn in disconnected:
                self.disconnect(conn, channel)

ws_manager = WebSocketConnectionManager()
