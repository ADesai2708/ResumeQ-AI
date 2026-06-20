import joblib
import pandas as pd
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "ats_model.pkl"
model = joblib.load(MODEL_PATH)

def predict_score(features: dict):
    input_df = pd.DataFrame([features])
    prediction = model.predict(input_df)[0]
    return round(float(prediction), 2)