import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from xgboost import XGBRegressor
from dataset_generator import generate_synthetic_dataset

def train_and_export_model(data_path="data/patients_synthetic.csv", model_path="model/risk_model.pkl"):
    """
    Trains an XGBoost Regressor on synthetic patient features and exports the trained artifact.
    """
    if not os.path.exists(data_path):
        print(f"Data file not found. Generating dataset at {data_path}...")
        df = generate_synthetic_dataset(3500, data_path)
    else:
        df = pd.read_csv(data_path)

    # Feature Engineering & Preprocessing
    feature_cols = [
        "age", "is_pregnant", "trimester", "high_risk_pregnancy", 
        "newborn_age_days", "days_overdue", "previous_missed_visits", "last_visit_days_ago"
    ]
    
    # One-Hot Encoding for categorical fields
    df_encoded = pd.get_dummies(df, columns=["vaccination_status", "visit_type", "gender"], drop_first=True)
    
    # Extract feature matrix X and target y
    encoded_feature_cols = [col for col in df_encoded.columns if col not in ["patient_id", "village", "latitude", "longitude", "chronic_disease_flags", "risk_score"]]
    
    X = df_encoded[encoded_feature_cols]
    y = df_encoded["risk_score"]

    # Train / Validation / Test Split (70 / 15 / 15)
    X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.30, random_state=42)
    X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.50, random_state=42)

    # Train XGBoost Model
    model = XGBRegressor(
        n_estimators=200,
        max_depth=5,
        learning_rate=0.08,
        random_state=42
    )
    
    model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)

    # Evaluate Model
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)

    print("--- 🧠 ML Risk Model Evaluation ---")
    print(f"Mean Absolute Error (MAE): {mae:.2f} points (Target < 6.0)")
    print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
    print(f"R² Score: {r2:.4f}")

    # Export Model Artifact & Feature Column Names
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    artifact = {
        "model": model,
        "feature_cols": encoded_feature_cols
    }
    joblib.dump(artifact, model_path)
    print(f"✅ Serialized risk model artifact saved to: {model_path}")
    return model, encoded_feature_cols

if __name__ == "__main__":
    train_and_export_model()
