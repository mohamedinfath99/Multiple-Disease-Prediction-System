
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import joblib
import numpy as np
from functools import wraps


app = Flask(__name__)


app.config['SECRET_KEY'] = 'RafeekMohamedInfath'

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)


mongo_uri = "mongodb+srv://finalProject:finalProject@cluster0.vk1vlvz.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client['FinalProject']
user_collection = db['users']
diabetes_collection = db['diabetes_collection']
heart_collection = db['heart_collection']
parkinsons_collection = db['parkinsons_collection']


diabetes_model = joblib.load('svm_diabetes_model.sav')
heart_model = joblib.load('heart_model.sav')
parkinsons_model = joblib.load('random_forest_parkinsons_model.sav')


@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
    username = request.json.get("username")
    phone_number = request.json.get("phone_number")

    userrole = "user"

    user_exists = user_collection.find_one({"email": email})

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = {
        "email": email,
        "password": hashed_password,
        "username": username,
        "phone_number": phone_number,
        "userrole": userrole 
    }
    user_collection.insert_one(new_user)

    session["user_id"] = str(new_user["_id"])

    return jsonify({
        "id": str(new_user["_id"]),
        "email": new_user["email"],
        "username": new_user["username"],
        "phone_number": new_user["phone_number"],
        "userrole": userrole
    })



@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = user_collection.find_one({"email": email})

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Unauthorized"}), 401
    

    response = jsonify({
        "id": str(user["_id"]),
        "email": user["email"],
        "userrole": user.get("userrole", "user")
    })

    return response



@app.route("/api/predict_diabetes", methods=["POST"])
def predict_diabetes():
    try:
        patient_name = request.json["patient_name"]
        patient_phone = request.json["patient_phone"]
        patient_address = request.json["patient_address"]
        pregnancies = float(request.json["pregnancies"])
        glucose = float(request.json["glucose"])
        blood_pressure = float(request.json["blood_pressure"])
        skin_thickness = float(request.json["skin_thickness"])
        insulin = float(request.json["insulin"])
        bmi = float(request.json["bmi"])
        diabetes_pedigree_function = float(request.json["diabetes_pedigree_function"])
        age = float(request.json["age"])

    
        prediction = diabetes_model.predict([[pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age]])

        
        if prediction[0] == 1:
            diagnosis = 'This person is suffering from diabetes disease'
        else:
            diagnosis = 'This person is a healthy person'

        
        patient_data = {
            "Name": patient_name,
            "Phone": patient_phone,
            "Address": patient_address,
            "Pregnancies": pregnancies,
            "Glucose": glucose,
            "BloodPressure": blood_pressure,
            "SkinThickness": skin_thickness,
            "Insulin": insulin,
            "BMI": bmi,
            "DiabetesPedigreeFunction": diabetes_pedigree_function,
            "Age": age,
            "Diagnosis": diagnosis
        }

        diabetes_collection.insert_one(patient_data)

        return jsonify({"diagnosis": diagnosis})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500
    


@app.route("/api/predict_heart", methods=["POST"])
def predict_heart():

    patient_name = request.json["patient_name"]
    patient_phone = request.json["patient_phone"]
    patient_address = request.json["patient_address"]
    age = float(request.json.get("age"))
    sex = float(request.json.get("sex"))
    cp = float(request.json.get("cp"))
    trestbps = float(request.json.get("trestbps"))
    chol = float(request.json.get("chol"))
    fbs = float(request.json.get("fbs"))
    restecg = float(request.json.get("restecg"))
    thalach = float(request.json.get("thalach"))
    exang = float(request.json.get("exang"))
    oldpeak = float(request.json.get("oldpeak"))
    slope = float(request.json.get("slope"))
    ca = float(request.json.get("ca"))
    thal = float(request.json.get("thal"))

    prediction = heart_model.predict([[age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]])

   
    print(f"Prediction result for: {prediction}")

    if prediction[0] == 1:
        diagnosis = 'This person is suffering from heart disease'
    else:
        diagnosis = 'This person is a healthy person'



    patient_data = {
        "Name": patient_name,
        "Phone": patient_phone,
        "Address": patient_address,
        "Age": age,
        "Sex": sex,
        "Chest Pain types": cp,
        "Resting Blood Pressure": trestbps,
        "Serum Cholestoral": chol,
        "Fasting Blood Sugar": fbs,
        "Resting Electrocardiographic": restecg,
        "Maximum Heart Rate": thalach,
        "Exercise Induced Angina": exang,
        "ST depression induced by exercise": oldpeak,
        "Slope of the peak exercise ST segment": slope,
        "Major vessels colored by flourosopy": ca,
        "Thal": thal,
        "Diagnosis": diagnosis
    }

    heart_collection.insert_one(patient_data)

    return jsonify({"diagnosis": diagnosis})


@app.route("/api/predict_parkinsons", methods=["POST"])
def predict_parkinsons():
    patient_name = request.json["patient_name"]
    patient_phone = request.json["patient_phone"]
    patient_address = request.json["patient_address"]
    
    MDVP_Jitter_percent = float(request.json["MDVP_Jitter_percent"])
    MDVP_RAP = float(request.json["MDVP_RAP"])
    MDVP_Shimmer = float(request.json["MDVP_Shimmer"])
    MDVP_Shimmer_dB = float(request.json["MDVP_Shimmer_dB"])
    MDVP_APQ = float(request.json["MDVP_APQ"])
    MDVP_PPQ = float(request.json["MDVP_PPQ"])
    Shimmer_APQ3 = float(request.json["Shimmer_APQ3"])
    Shimmer_APQ5 = float(request.json["Shimmer_APQ5"])

   
    patient_data = {
        "Name": patient_name,
        "Phone": patient_phone,
        "Address": patient_address,
        "MDVP_Jitter_percent": MDVP_Jitter_percent,
        "MDVP_RAP": MDVP_RAP,
        "MDVP_Shimmer": MDVP_Shimmer,
        "MDVP_Shimmer_dB": MDVP_Shimmer_dB,
        "MDVP_APQ": MDVP_APQ,
        "MDVP_PPQ": MDVP_PPQ,
        "Shimmer_APQ3": Shimmer_APQ3,
        "Shimmer_APQ5": Shimmer_APQ5,
    }

   
    input_data_as_numpy_array = np.asarray([MDVP_Jitter_percent, MDVP_RAP, MDVP_Shimmer, MDVP_Shimmer_dB, MDVP_APQ, MDVP_PPQ, Shimmer_APQ3, Shimmer_APQ5])
    input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

    
    prediction = parkinsons_model.predict(input_data_reshaped)

    if prediction[0] == 0:
        diagnosis = 'The person does not have Parkinsons disease'
    else:
        diagnosis = 'The person has Parkinson disease'

    patient_data["Diagnosis"] = diagnosis

  
    parkinsons_collection.insert_one(patient_data)

    return jsonify({"diagnosis": diagnosis})


if __name__ == "__main__":
    app.run(debug=True)