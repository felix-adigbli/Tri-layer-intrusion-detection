from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model


app = Flask(__name__)
CORS(app)

# define parameters
tau_b = 0.5
tau_m = 0.98
tau_u = 0.8
sequence_length = 5
# load models
stage1_model = load_model('models/stage1_model.h5')
stage2_model = joblib.load('models/stage2_model.joblib')
scaler = joblib.load('models/scaler.joblib')
# load columns to scale
columns_to_scale = []

# Open the text file and read each line
with open('columns_to_scale.txt', 'r') as file:
    for line in file:
        # Strip any leading/trailing whitespace and append the line to the list
        columns_to_scale.append(line.strip())

# function to create sequence


def create_sequence_from_single_row(row, sequence_length):
    return np.array([np.tile(row, (sequence_length, 1))])

# app to predict

# Function to classify based on threshold tau_m


def classify_stage2(X, tau_m):
    proba = stage2_model.predict_proba(X)
    max_proba = np.max(proba, axis=1)
    predictions = np.where(max_proba > tau_m, stage2_model.classes_[
                           np.argmax(proba, axis=1)], 13)
    return predictions


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # Convert the features to a DataFrame
        df = pd.DataFrame(data['features'])

        # Scale only the specified columns
        df[columns_to_scale] = scaler.transform(df[columns_to_scale])

        # create sequence
        X_sequences = create_sequence_from_single_row(df, sequence_length)

        stage1_prob = stage1_model.predict([X_sequences, X_sequences])
        stage1_prob_rounded = np.round(stage1_prob, decimals=9)
        print(stage1_prob_rounded)
        if stage1_prob >= tau_b:

            df['Label_binary'] = 1
            stage2_pred = classify_stage2(df, tau_m)
            attack_type = int(stage2_pred[0])
            if attack_type == 13 and stage1_prob <= tau_u:
                return jsonify({
                    'classification': 'Benign',
                    'class': 'NA',
                    'attack_type': 'NA'
                })
            elif attack_type == 13 and stage1_prob > tau_u:
                return jsonify({
                    'classification': 'Attack',
                    'class': attack_type,
                    'attack_type': 'zeroday'
                })
            else:
                return jsonify({
                    'classification': 'Attack',
                    'class': attack_type,
                    'attack_type': 'known'
                })

        else:
            return jsonify({
                'classification': 'Benign',
                'class': 'NA',
                'attack_type': 'NA'
            })

    except KeyError as e:
        print(f"KeyError: {e}")
        return jsonify({'error': 'Invalid request format'}), 400
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify(f"An unexpected error occurred: {e}"), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8050)
