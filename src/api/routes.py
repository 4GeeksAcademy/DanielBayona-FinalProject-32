"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Issue
from sqlalchemy import delete, update
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.utils import set_password, check_password
from base64 import b64encode
import os
import cloudinary.uploader as uploader

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def registerUser():
    form_data = request.form
    data_files = request.files 
    #data = request.json
    
    username = form_data.get('username')
    password = form_data.get('password')
    role = form_data.get('role')
    pic = data_files.get("pic")


    if username is None or password is None:
        return jsonify('Alguno de los campos esta vacio, porfavor verificar'), 400
    else:
        user = User()
        user = user.query.filter_by(username = username).one_or_none()
        if user is not None:
            return jsonify('Usuario ya existe'), 400
    salt = b64encode(os.urandom(32)).decode('utf-8')
    password = set_password(password, salt)
    
    result_cloud = uploader.upload(pic)
    pic_url = result_cloud.get("secure_url")
    pic_id = result_cloud.get("public_id")
    
    user = User(
        username = username,
        password = password,
        salt = salt,
        pic = pic_url,
        pic_id = pic_id,
        role = role,
    ) 
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created"}), 201
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": f"Error at creating user {error}"}), 400

@api.route('/user', methods=["GET"])
def get_users():
    users = User()
    users = User().query.all()
    all_users =  list(map(lambda x:x.serialize(), users))
    return jsonify(all_users)

@api.route('/user/<int:id>', methods=["GET"])
def get_user():
    form_data = request.form
    id = form_data.get('id')
    user= user()
    try:
        user= user.query.filter_by(id = id).first
        return (user.serialize())
    except Exception as error:
        return jsonify({"message": f"Error at finding user{error}"}), 400

@api.route('/user/int<int:id>', methods=["PUT"])
def update_user():
    form_data = request.form
    data_files = request.files 
    #data = request.json
    
    username = form_data.get('username')
    id = form_data.get('id')
    password = form_data.get('password')
    role = form_data.get('role')
    pic = data_files.get("pic")

    if username is None or password is None:
        return jsonify('Missing fields.'), 400
    else:
        user = User()
        user = user.query.filter_by(id = id).one_or_none()
        if user is None:
            return jsonify('User doesnt exist'), 400
    salt = b64encode(os.urandom(32)).decode('utf-8')
    password = set_password(password, salt)
    
    result_cloud = uploader.upload(pic)
    pic_url = result_cloud.get("secure_url")
    pic_id = result_cloud.get("public_id")

    user = User()

    try: 
        user= update(user).where(id = id).values(
        username = username,
        password = password,
        salt = salt,
        pic = pic_url,
        pic_id = pic_id,
        role = role,)

        db.session.commit()
        return jsonify({"message": "User updated"}), 201
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": f"Error at updating user {error}"}), 400

@api.route('/user', methods=["DELETE"])
def delete_user():
    form_data = request.form
    id = form_data.get('id')

    try:
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "User has been deleted successfully"}, 201)
        else:
            return jsonify({"message": "User not found"}, 404)
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": f"Error at deleting user {error}"}, 400)

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
    
    try:
        user_exist = User.query.filter_by(id=current_user).first()
        if user_exist is None:
            return jsonify({"logged": False}), 404

        return jsonify({"user": user_exist.serialize(), "logged":True}), 200
    except Exception as error:
        print(error.args)
        return jsonify(error.args)
    
@api.route("/issue", methods=["GET"])
def  get_issues():
    issues= Issue()
    issues= issues.query.all
    all_issues =  list(map(lambda x:x.serialize(), issues))
    return jsonify(all_issues)

@api.route('/issue/int<int:id>', methods=["GET"])
def get_issue():
    form_data = request.form
    id = form_data.get('id')
    issue= Issue()
    try:
        issue= issue.query.filter_by(id = id).first
        return (issue.serialize())
    except Exception as error:
        return jsonify({"message": f"Error at finding issue{error}"}), 400

@api.route("/issue", methods=["POST"])
@jwt_required()
def create_issue():
    form_data = request.form
    data_files = request.files 
    
    name = form_data.get('name')
    desc = form_data.get('desc')
    user_id= get_jwt_identity()
    proof = data_files.get("proof") 

    result_cloud = uploader.upload(proof)
    proof_url = result_cloud.get("secure_url")
    proof_id = result_cloud.get("public_id")

    issue = Issue(
        name = name,
        desc = desc,
        user_id = user_id,
        proof = proof_url,
        proof_id = proof_id
    )

    try:
        db.session.add(issue)
        db.session.commit()
        return jsonify({"message": "Issue created"}), 201
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": f"Error at creating issue {error}"}), 400

@api.route("/issue/<int:id>", methods=["PUT"])
def update_issue():
    form_data = request.form
    data_files = request.files 
    
    name = form_data.get('name')
    id = form_data.get('id')
    desc = form_data.get('desc')
    status = data_files.get('status')
    proof = data_files.get("proof") 

    result_cloud = uploader.upload(proof)
    proof_url = result_cloud.get("secure_url")
    proof_id = result_cloud.get("public_id")

    issue = Issue()

    try:
        issue = update(issue).where(id = id).values(
        name = name,
        desc = desc,
        proof = proof_url,
        proof_id = proof_id,
        status = status
        )
        db.session.commit()
        return jsonify({"message": "Issue updated"}), 201
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": f"Error at updating issue {error}"}), 400
    
@api.route("/issue/<int:id>", methods=["DELETE"])
def delete_issue():
    form_data = request.form
    id = form_data.get('id')
    issue = Issue()
    try:
        issue = delete(issue).where(id = id)
        db.session.commit()
        return jsonify({"message": "Issue has been deleted successfully"}, 201)
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": f"Error at deleting issue {error}"}), 400