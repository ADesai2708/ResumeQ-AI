from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.feature_schema import ResumeFeatures
from app.predict import predict_score

app = FastAPI(
    title="ResumeQ AI ML Service",
    description="ATS score prediction service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "success": True,
        "message": "ResumeQ AI ML Service is running"
    }

@app.post("/predict")
def predict_resume_score(payload: ResumeFeatures):
    features = payload.model_dump()
    predicted_score = predict_score(features)

    return {
        "success": True,
        "predictedScore": predicted_score,
        "features": features
    }