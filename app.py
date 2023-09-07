from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import joblib
import numpy as np


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



diabetes_model = joblib.load('diabetes_model.sav')
heart_model = joblib.load('heart_disease_model.sav')
parkinsons_model = joblib.load('parkinsons_model.sav')
diabetes_model_new = joblib.load('diabetes_inf99.sav')


@app.route("/")
def hello_world():
    return "Hello, World!"



@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
    username = request.json.get("username")
    phone_number = request.json.get("phone_number")

    # Set the default userrole to "user"
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

    session["user_id"] = str(user["_id"])

    return jsonify({
        "id": str(user["_id"]),
        "email": user["email"],
        "userrole": user.get("userrole", "user")
    })





# @app.route("/api/predict_diabetes", methods=["POST"])
# def predict_diabetes():

#     patient_name = request.json["patient_name"]
#     patient_phone = request.json["patient_phone"]
#     patient_address = request.json["patient_address"]
#     pregnancies = float(request.json["pregnancies"])
#     glucose = float(request.json["glucose"])
#     blood_pressure = float(request.json["blood_pressure"])
#     skin_thickness = float(request.json["skin_thickness"])
#     insulin = float(request.json["insulin"])
#     bmi = float(request.json["bmi"])
#     diabetes_pedigree_function = float(request.json["diabetes_pedigree_function"])
#     age = float(request.json["age"])

  
#     prediction = diabetes_model.predict([[pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age]])

    
#     if prediction[0] == 1:
#         diagnosis = 'The person is diabetic'
#     else:
#         diagnosis = 'The person is not diabetic'

    
#     patient_data = {
#         "Name": patient_name,
#         "Phone": patient_phone,
#         "Address": patient_address,
#         "Pregnancies": pregnancies,
#         "Glucose": glucose,
#         "BloodPressure": blood_pressure,
#         "SkinThickness": skin_thickness,
#         "Insulin": insulin,
#         "BMI": bmi,
#         "DiabetesPedigreeFunction": diabetes_pedigree_function,
#         "Age": age,
#         "Diagnosis": diagnosis
#     }
#     diabetes_collection.insert_one(patient_data)

#     return jsonify({"diagnosis": diagnosis})


# smoking_history_mapping = {
#     'never': 0,
#     'No Info': 1,
#     'current': 2,
#     'former': 3,
#     'ever': 4,
#     'not current': 5
# }

# gender_mapping = {'Female': 0, 'Male': 1, 'Other': 2}

# @app.route("/api/new/predict_diabetes", methods=["POST"])
# def predict_diabete():
#     patient_name = request.json["patient_name"]
#     patient_phone = request.json["patient_phone"]
#     patient_address = request.json["patient_address"]
#     gender = request.json["gender"]
#     glucose = float(request.json["glucose"])
#     blood_pressure = float(request.json["blood_pressure"])
#     skin_thickness = float(request.json["skin_thickness"])
#     insulin = float(request.json["insulin"])
#     bmi = float(request.json["bmi"])
#     diabetes_pedigree_function = float(request.json["diabetes_pedigree_function"])
#     age = float(request.json["age"])
#     smoking_history = request.json["smoking_history"]

#     smoking_history = smoking_history_mapping.get(smoking_history, -1)
#     gender = gender_mapping.get(gender, -1)

#     input_data = [gender, age, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function]
    

#     input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)
 
#     prediction = diabetes_model_new.predict(input_data_as_numpy_array)

#     if prediction[0] == 1:
#         diagnosis = 'The person is diabetic'
#     else:
#         diagnosis = 'The person is not diabetic'


#     patient_data = {
#         "Name": patient_name,
#         "Phone": patient_phone,
#         "Address": patient_address,
#         "Gender": gender,
#         "Glucose": glucose,
#         "BloodPressure": blood_pressure,
#         "SkinThickness": skin_thickness,
#         "Insulin": insulin,
#         "BMI": bmi,
#         "DiabetesPedigreeFunction": diabetes_pedigree_function,
#         "Age": age,
#         "Diagnosis": diagnosis
#     }

#     diabetes_collection.insert_one(patient_data)

#     return jsonify({"diagnosis": diagnosis})


smoking_history_mapping = {
    'never': 0,
    'No Info': 1,
    'current': 2,
    'former': 3,
    'ever': 4,
    'not current': 5
}

gender_mapping = {'Female': 0, 'Male': 1, 'Other': 2}


@app.route("/api/new/predict_diabetes", methods=["POST"])
def predict_diabetes():
    # Parse input data from the JSON request
    patient_name = request.json["patient_name"]
    patient_phone = request.json["patient_phone"]
    patient_address = request.json["patient_address"]
    gender = request.json["gender"]
    age = float(request.json["age"])
    hypertension = float(request.json["hypertension"])
    heart_disease = float(request.json["heart_disease"])
    smoking_history = request.json["smoking_history"]
    bmi = float(request.json["bmi"])
    HbA1c_level = float(request.json["HbA1c_level"])
    blood_glucose_level = float(request.json["blood_glucose_level"])

    # Data preprocessing
    smoking_history = smoking_history_mapping.get(smoking_history, -1)
    gender = gender_mapping.get(gender, -1)
    input_data = [gender, age, hypertension, heart_disease, smoking_history, HbA1c_level, bmi, blood_glucose_level]

    # Make predictions
    input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)
    prediction = diabetes_model_new.predict(input_data_as_numpy_array)

    # Determine diagnosis
    if prediction[0] == 1:
        diagnosis = 'The person is diabetic'
    else:
        diagnosis = 'The person is not diabetic'

    # Create response JSON
    patient_data = {
        "Name": patient_name,
        "Phone": patient_phone,
        "Address": patient_address,
        "Gender": gender,
        "Age": age,
        "Hypertension": hypertension,
        "HeartDisease": heart_disease,
        "SmokingHistory": smoking_history,
        "BMI": bmi,
        "HbA1cLevel": HbA1c_level,
        "BloodGlucoseLevel": blood_glucose_level,
        "Diagnosis": diagnosis
    }

    # You can add code here to store patient_data or perform other actions

    return jsonify({"diagnosis": diagnosis})





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

    if prediction[0] == 1:
        diagnosis = 'The person is having heart disease'
    else:
        diagnosis = 'The person is not having heart disease'

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
    fo = float(request.json["MDVP:Fo(Hz)"])
    fhi = float(request.json["MDVP:Fhi(Hz)"])
    flo = float(request.json["MDVP:Flo(Hz)"])
    Jitter_percent = float(request.json["MDVP:Jitter(%)"])
    Jitter_Abs = float(request.json["MDVP:Jitter(Abs)"])
    RAP = float(request.json["MDVP:RAP"])
    PPQ = float(request.json["MDVP:PPQ"])
    DDP = float(request.json["Jitter:DDP"])
    Shimmer = float(request.json["MDVP:Shimmer"])
    Shimmer_dB = float(request.json["MDVP:Shimmer(dB)"])
    APQ3 = float(request.json["Shimmer:APQ3"])
    APQ5 = float(request.json["Shimmer:APQ5"])
    APQ = float(request.json["MDVP:APQ"])
    DDA = float(request.json["Shimmer:DDA"])
    NHR = float(request.json["NHR"])
    HNR = float(request.json["HNR"])
    RPDE = float(request.json["RPDE"])
    DFA = float(request.json["DFA"])
    spread1 = float(request.json["spread1"])
    spread2 = float(request.json["spread2"])
    D2 = float(request.json["D2"])
    PPE = float(request.json["PPE"])


    prediction = parkinsons_model.predict([[fo, fhi, flo, Jitter_percent, Jitter_Abs, RAP, PPQ, DDP, Shimmer, Shimmer_dB, APQ3, APQ5, APQ, DDA, NHR, HNR, RPDE, DFA, spread1, spread2, D2, PPE]])

    if prediction[0] == 1:
        diagnosis = 'The person has Parkinson disease'
    else:
        diagnosis = 'The person does not have Parkinsons disease'

    patient_data = {
        "Name": patient_name,
        "Phone": patient_phone,
        "Address": patient_address,
        "MDVP:Fo(Hz)": fo,
        "MDVP:Fhi(Hz)": fhi,
        "MDVP:Flo(Hz)": flo,
        "MDVP:Jitter(%)": Jitter_percent,
        "MDVP:Jitter(Abs)": Jitter_Abs,
        "MDVP:RAP": RAP,
        "MDVP:PPQ": PPQ,
        "Jitter:DDP": DDP,
        "MDVP:Shimmer": Shimmer,
        "MDVP:Shimmer(dB)": Shimmer_dB,
        "Shimmer:APQ3": APQ3,
        "Shimmer:APQ5": APQ5,
        "MDVP:APQ": APQ,
        "Shimmer:DDA": DDA,
        "NHR": NHR,
        "HNR": HNR,
        "RPDE": RPDE,
        "DFA": DFA,
        "spread1": spread1,
        "spread2": spread2,
        "D2": D2,
        "PPE": PPE,
        "Diagnosis": diagnosis

    }

    parkinsons_collection.insert_one(patient_data)

    return jsonify({"diagnosis": diagnosis})





if __name__ == "__main__":
    app.run(debug=True)
