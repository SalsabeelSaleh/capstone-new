import numpy as np
import onnxruntime as ort
import cv2

# === Emotion Detection Service Class ===
class EmotionDetectionService:
    def __init__(self, model_path: str):
        self.session = ort.InferenceSession(model_path, providers=["CPUExecutionProvider"])
        self.input_name = self.session.get_inputs()[0].name
        self.output_name = self.session.get_outputs()[0].name
        self.labels = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"]

    def preprocess(self, frame):
        # Convert to grayscale, resize to 48x48, scale to [0, 1], reshape for model
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        resized = cv2.resize(gray, (48, 48))
        normalized = resized.astype("float32") / 255.0
        return normalized[..., np.newaxis][np.newaxis, :]  # Shape: (1, 1, 48, 48)

    def predict_emotion(self, frame):
        input_data = self.preprocess(frame)
        outputs = self.session.run([self.output_name], {self.input_name: input_data})[0]
        pred_idx = np.argmax(outputs)
        return self.labels[pred_idx]

# === WebSocket Event ===
def handle_emotion_detected(data):
    # Called when frontend sends base64 frame
    print("Emotion received over socket (placeholder)")
