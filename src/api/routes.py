"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from sqlalchemy import select
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.utils import set_password, check_password
from base64 import b64encode
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def registerUser():
    formData = request.form
    datatest = request.json
    # data = {
    #     "username": formData.get('username'),
    #     "password": formData.get('password')
    # }
    
    username = datatest.get('username')
    password = datatest.get('password')
    pic = datatest.get("pic")
    pic_id = datatest.get("pic")
    role = datatest.get('role')
    is_active = datatest.get('is_active')
    
    # username =  data.get('username', None)
    # password = data.get('password', None)
    
    if username is None or password is None:
        return jsonify('Alguno de los campos esta vacio, porfavor verificar'), 400
    else:
        user = User()
        user = user.query.filter_by(username = username).one_or_none()
        
        if user is not None:
            return jsonify('Usuario ya existe'), 400
    salt = b64encode(os.urandom(32)).decode('utf-8')
    password = set_password(password, salt)
    
    user = User(
        username = username,
        password = password,
        salt = salt,
        pic = pic,
        pic_id = pic_id,
        role = role,
        is_active = is_active
    )
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Usuario creado"}), 201
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": f"Error al crear usuario {error}"}), 400
    
@api.route('/login', methods=['POST'])
def login():
    user = request.get_json()
    print(user)
    if not isinstance(user['username'], str) or len(user['username'].strip()) == 0:
        return jsonify({'error': '"username" must be a string'}), 400
    if not isinstance(user['password'], str) or len(user['password'].strip()) == 0:
        return jsonify({'error': '"password" must be a string'}), 400

    user_db = User()
    user_db = user_db.query.filter_by(username=user['username']).one_or_none()
    if user_db is None:
        return jsonify({"error": "incorrect credentials"}), 401


    if check_password(user_db.password, user['password'], user_db.salt):
        token = create_access_token(identity=user_db.id)
        return jsonify({"access_token": token, "role": user_db.role.value, "logged": True}), 200
    else:
        return jsonify({"error": "incorrect credentials"}), 401

     
@api.route('/user', methods=["GET"])
@jwt_required()
def get_info_user():
    users = User()
    users = users.query.all
    all_users =  list(map(lambda x:x.serialize(), users))
    return jsonify(all_users)
     

# PROTECTED ROUTE PROFILE / RUTA PROTEGIDA PERFIL
# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# PROTECTED ROUTE VALID TOKEN / RUTA PROTEGIDA VALIDACION DE TOKEN
@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    
    user_exist = User.query.filter_by(id=current_user).first()
    if user_exist is None:
        return jsonify(logged=False), 404

    return jsonify(user_exist.serialize(), logged=True), 200