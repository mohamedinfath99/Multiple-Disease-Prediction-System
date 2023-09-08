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



diabetes_model = joblib.load('svm_diabetes_model.sav')
heart_model = joblib.load('heart_model.sav')
parkinsons_model = joblib.load('random_forest_parkinsons_model.sav')



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





@app.route("/api/predict_diabetes", methods=["POST"])
def predict_diabetes():

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
        diagnosis = 'The person is diabetic'
    else:
        diagnosis = 'The person is not diabetic'

    
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

    # Print the prediction result to the console
    print(f"Prediction result for: {prediction}")

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





# @app.route("/api/predict_parkinsons", methods=["POST"])
# def predict_parkinsons():

#     patient_name = request.json["patient_name"]
#     patient_phone = request.json["patient_phone"]
#     patient_address = request.json["patient_address"]
#     fo = float(request.json["MDVP:Fo(Hz)"])
#     fhi = float(request.json["MDVP:Fhi(Hz)"])
#     flo = float(request.json["MDVP:Flo(Hz)"])
#     Jitter_percent = float(request.json["MDVP:Jitter(%)"])
#     Jitter_Abs = float(request.json["MDVP:Jitter(Abs)"])
#     RAP = float(request.json["MDVP:RAP"])
#     PPQ = float(request.json["MDVP:PPQ"])
#     DDP = float(request.json["Jitter:DDP"])
#     Shimmer = float(request.json["MDVP:Shimmer"])
#     Shimmer_dB = float(request.json["MDVP:Shimmer(dB)"])
#     APQ3 = float(request.json["Shimmer:APQ3"])
#     APQ5 = float(request.json["Shimmer:APQ5"])
#     APQ = float(request.json["MDVP:APQ"])
#     DDA = float(request.json["Shimmer:DDA"])
#     NHR = float(request.json["NHR"])
#     HNR = float(request.json["HNR"])
#     RPDE = float(request.json["RPDE"])
#     DFA = float(request.json["DFA"])
#     spread1 = float(request.json["spread1"])
#     spread2 = float(request.json["spread2"])
#     D2 = float(request.json["D2"])
#     PPE = float(request.json["PPE"])


#     prediction = parkinsons_model.predict([[fo, fhi, flo, Jitter_percent, Jitter_Abs, RAP, PPQ, DDP, Shimmer, Shimmer_dB, APQ3, APQ5, APQ, DDA, NHR, HNR, RPDE, DFA, spread1, spread2, D2, PPE]])

#     if prediction[0] == 1:
#         diagnosis = 'The person has Parkinson disease'
#     else:
#         diagnosis = 'The person does not have Parkinsons disease'

#     patient_data = {
#         "Name": patient_name,
#         "Phone": patient_phone,
#         "Address": patient_address,
#         "MDVP:Fo(Hz)": fo,
#         "MDVP:Fhi(Hz)": fhi,
#         "MDVP:Flo(Hz)": flo,
#         "MDVP:Jitter(%)": Jitter_percent,
#         "MDVP:Jitter(Abs)": Jitter_Abs,
#         "MDVP:RAP": RAP,
#         "MDVP:PPQ": PPQ,
#         "Jitter:DDP": DDP,
#         "MDVP:Shimmer": Shimmer,
#         "MDVP:Shimmer(dB)": Shimmer_dB,
#         "Shimmer:APQ3": APQ3,
#         "Shimmer:APQ5": APQ5,
#         "MDVP:APQ": APQ,
#         "Shimmer:DDA": DDA,
#         "NHR": NHR,
#         "HNR": HNR,
#         "RPDE": RPDE,
#         "DFA": DFA,
#         "spread1": spread1,
#         "spread2": spread2,
#         "D2": D2,
#         "PPE": PPE,
#         "Diagnosis": diagnosis

#     }

#     parkinsons_collection.insert_one(patient_data)

#     return jsonify({"diagnosis": diagnosis})



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

    # Create a dictionary with the extracted feature values
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

    # Convert input data to a numpy array and reshape it
    input_data_as_numpy_array = np.asarray([MDVP_Jitter_percent, MDVP_RAP, MDVP_Shimmer, MDVP_Shimmer_dB, MDVP_APQ, MDVP_PPQ, Shimmer_APQ3, Shimmer_APQ5])
    input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

    # Predict using the loaded SVM model
    prediction = parkinsons_model.predict(input_data_reshaped)

    if prediction[0] == 0:
        diagnosis = 'The person does not have Parkinsons disease'
    else:
        diagnosis = 'The person has Parkinson disease'

    patient_data["Diagnosis"] = diagnosis

    # Insert patient data into the collection (You should define 'parkinsons_collection' somewhere)
    parkinsons_collection.insert_one(patient_data)

    return jsonify({"diagnosis": diagnosis})




if __name__ == "__main__":
    app.run(debug=True)
