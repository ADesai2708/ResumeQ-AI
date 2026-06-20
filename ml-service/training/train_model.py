import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# 1. Load dataset
df = pd.read_csv("../data/generated_dataset.csv")

# 2. Split features and target
X = df.drop("score", axis=1)
y = df["score"]

# 3. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. Create model
model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

# 5. Train model
model.fit(X_train, y_train)

# 6. Predictions
y_pred = model.predict(X_test)

# 7. Evaluate
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Model Trained Successfully")
print(f"MAE: {mae:.2f}")
print(f"R2 Score: {r2:.4f}")

# 8. Save model
joblib.dump(model, "../models/ats_model.pkl")
print("Model saved to models/ats_model.pkl")

# 9. Feature importance
importances = model.feature_importances_
feature_names = X.columns

print("\nFeature Importances:")
for feature, importance in zip(feature_names, importances):
    print(f"{feature}: {importance:.4f}")