# Tri-Layer Intrusion Detection System (TLIDS)

## Overview
The Tri-Layer Intrusion Detection System (TLIDS) is an advanced anomaly detection solution developed 

## Project Objective
The primary aims of the TLIDS project are:
1. Model Development: To develop a hierarchical machine learning model that performs both binary and multiclass detection for known and zero-day attacks.
2. Model Deployment: To deploy the model as a service that can be used by external systems, encapsulated within Docker.
3. Interface Creation: To develop a web interface for simulating attack requests to the deployed model and a dashboard for visualizing predictions.

## Dataset
This project uses the Canadian Institute for Cybersecurity (CIC) Intrusion Detection Evaluation Dataset (CIC-IDS2017), which contains benign and the most up-to-date common attacks. The dataset is utilized for training the model to recognize various types of network anomalies.

## Model Architecture
The TLIDS architecture is composed of three main stages:
1. Anomaly Detection: Initial filtering of network traffic to identify potential threats using a hybrid CNN-LSTM model.
2. Attack Classification: Classification of the detected anomalies into specific known attack categories using a Random Forest Classifier.
3. Refinement Stage: Further analysis to reduce false positives and identify zero-day attacks using anomaly scoring.

## Technologies Used
- Python: Main programming language.
- Keras: For constructing the CNN-LSTM hybrid model.
- Scikit-Learn: For implementing the Random Forest classifier.
- Docker: For containerizing the model and deploying it as a service.
- Flask: For creating the RESTful API.
- MongoDB: For storing test results and model predictions.
- React: For developing the frontend of the web interface.

## Deployment
The system is containerized using Docker, with Flask serving the RESTful API that facilitates interaction with the model. Deployment steps include:
1. Building a Docker image from `python:3.9-slim`.
2. Installing dependencies via `requirements.txt`.
3. Loading serialized machine learning models.
4. Exposing the `/predict` endpoint for making predictions.

## How to Use
1. Start the Docker container: Ensure Docker is running and start the container using the provided Docker commands.
2. Access the Web Interface: Navigate to the web interface to simulate attack scenarios and view the dashboard for results.
3. API Interaction: You can also interact directly with the API through the `/predict` endpoint for integrating with other systems.

