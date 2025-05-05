from flask import Flask
from flask_cors import CORS                    # For handling CORS (cross-origin)
from flask_socketio import SocketIO            # For real-time emotion detection
from models import db  
from routes import routes_bp
import base64
import numpy as np
import cv2
from flask_socketio import emit
from detection import EmotionDetectionService
from routes import routes_bp

# === App Configuration ===
app = Flask(__name__)
app.config["SECRET_KEY"] = "your-secret-key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"  # SQLite DB file
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# === Extensions ===
db.init_app(app)  
socketio = SocketIO(cors_allowed_origins="*")
socketio.init_app(app)    
CORS(app)                      # Allow requests from frontend
# socketio = SocketIO(app, cors_allowed_origins="*")  # Allow real-time communication

# === Routing & Events ===
# from routes import routes_bp
# from detection import handle_emotion_detected  # Socket event handler

app.register_blueprint(routes_bp)              # Register main API routes
# socketio.on_event("emotion_detected", handle_emotion_detected)  # WebSocket event

detector = EmotionDetectionService("emotion_model.onnx")

@socketio.on("video_frame")
def handle_video_frame(data):
    try:
        frame_data = data.get("frame")
        if not frame_data:
            emit("emotion_result", {"emotion": "No frame provided"})
            return

        # Decode base64 to image
        decoded = base64.b64decode(frame_data)
        nparr = np.frombuffer(decoded, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Predict emotion
        predicted = detector.predict_emotion(img)
        print(f"[Socket] Detected emotion: {predicted}")
        emit("emotion_result", {"emotion": predicted})
    except Exception as e:
        print(f"[Socket] Error: {e}")
        emit("emotion_result", {"emotion": "Error"})

# === Root route ===
@app.route("/")
def index():
    return {"message": "Live Emotion Detection API running"}, 200

# === Run server ===
if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if not exist
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
