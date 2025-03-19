from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)

with open('lr.pkl', 'rb') as file:
    model = pickle.load(file)

with open('xe.pkl', 'rb') as file:
    X_encoded = pickle.load(file)

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({ 'message': 'hello' })

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    
    employee = pd.DataFrame({})

    data_encoded = pd.get_dummies(pd.DataFrame(data))
    for col in X_encoded.columns:
        employee[col] = [False]
        if col in data_encoded.columns:
            employee[col] = [True]

    prediction = model.predict(employee)

    return jsonify({ 'prediction': prediction[0] })

if __name__ == '__main__':
    app.run(port=5000)