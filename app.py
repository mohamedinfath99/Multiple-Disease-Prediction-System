

from flask import Flask, request, jsonify, session, make_response
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import joblib
import numpy as np
from functools import wraps
from bson.objectid import ObjectId
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity



app = Flask(__name__)


app.config['SECRET_KEY'] = 'Your Secret Key Type Here'
app.config['JWT_SECRET_KEY'] = 'Your Secret Key Type Here'
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)


mongo_uri = "Your MongoDB URL Type Here"
client = MongoClient(mongo_uri)
db = client['FinalProject']
user_collection = db['users']
diabetes_collection = db['diabetes_collection']
heart_collection = db['heart_collection']
parkinsons_collection = db['parkinsons_collection']


diabetes_model = joblib.load('diabetes_model.sav')
heart_model = joblib.load('heart_model.sav')
parkinsons_model = joblib.load('parkinsons_model.sav')



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
    
    
    session["user_id"] = str(user["_id"])
    access_token = create_access_token(identity=str(user["_id"]))

    response = jsonify({
        "access_token": access_token,
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
        diagnosis = 'This person is suffering from Parkinson disease'
    else:
        diagnosis = 'This person is a healthy person'

    patient_data["Diagnosis"] = diagnosis

  
    parkinsons_collection.insert_one(patient_data)

    return jsonify({"diagnosis": diagnosis})




@jwt_required()
def get_current_user_id():
    return session.get("user_id", None)




@app.route("/edit_user", methods=["PUT"])
def edit_user():
    try:
        
        user_id = get_current_user_id()

        if not user_id:
            return jsonify({"error": "User not authenticated"}), 401

        user = user_collection.find_one({"_id": ObjectId(user_id)})

        
        if not user:
            return jsonify({"error": "User not found"}), 404

       
        updated_data = request.json

       
        if "username" in updated_data:
            user["username"] = updated_data["username"]

        
        if "phone_number" in updated_data:
            user["phone_number"] = updated_data["phone_number"]

       
        if "password" in updated_data:
            hashed_password = bcrypt.generate_password_hash(updated_data["password"]).decode('utf-8')
            user["password"] = hashed_password

      
        user_collection.update_one({"_id": ObjectId(user_id)}, {"$set": user})

        return jsonify({"message": "User updated successfully"})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500




@app.route("/api/get_all_diabetes_data", methods=["GET"])
def get_all_diabetes_data():
    try:
        diabetes_data = list(diabetes_collection.find({}, {"_id": 0}))

        if not diabetes_data:
            return jsonify({"message": "No diabetes data found"})

        return jsonify({"diabetes_data": diabetes_data})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500




@app.route("/api/delete_diabetes_data/<string:data_id>", methods=["DELETE"])
def delete_diabetes_data(data_id):
    try:
        
        data_id = ObjectId(data_id)

      
        if not diabetes_collection.find_one({"_id": data_id}):
            return jsonify({"error": "Diabetes data not found"}), 404

      
        diabetes_collection.delete_one({"_id": data_id})

        return jsonify({"message": "Diabetes data deleted successfully"})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500




@app.route("/api/get_all_heart_data", methods=["GET"])
def get_all_heart_data():
    try:
        heart_data = list(heart_collection.find({}, {"_id": 0}))

        if not heart_data:
            return jsonify({"message": "No heart data found"})

        return jsonify({"heart_data": heart_data})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500





@app.route("/api/get_all_parkinson_data", methods=["GET"])
def get_all_parkinson_data():
    try:
        parkinsons_data = list(parkinsons_collection.find({}, {"_id": 0}))

        if not parkinsons_data:
            return jsonify({"message": "No parkinsons data found"})

        return jsonify({"parkinsons_data": parkinsons_data})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500


@app.route("/logout", methods=["GET"])
def logout():
   
    response = make_response(jsonify({"message": "Logged out successfully"}))
    response.delete_cookie("userrole")
    response.delete_cookie("email")
    response.delete_cookie("user_id")
    return response




if __name__ == "__main__":
    app.run(debug=True)
