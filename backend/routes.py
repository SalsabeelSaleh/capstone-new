from flask import Blueprint, request, jsonify
from models import db, User
import bcrypt

routes_bp = Blueprint("routes", __name__)  # Group routes under a blueprint

# === Registration Endpoint ===
@routes_bp.route("/auth/register", methods=["POST", "OPTIONS"])
def register():
    if request.method == "OPTIONS":
        return '', 204  # CORS preflight

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    language = data.get("language")

    if not all([username, password, email]):
        return jsonify({"error": "Missing fields"}), 400

    # Ensure unique username
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(
        username=username,
        password_hash=hashed_pw.decode('utf-8'),
        email=email,
        language=language
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user": {"id": new_user.id}}), 201  # Send back new user's ID

# === Login Endpoint ===
@routes_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "language": user.language,
            "avatar": user.avatar
        }
    }), 200

# === Fetch a User by ID ===
@routes_bp.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "language": user.language,
        "avatar": user.avatar
    })

# === Update a User ===
@routes_bp.route("/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.avatar = data.get("avatar", user.avatar)
    user.language = data.get("language", user.language)
    db.session.commit()

    return jsonify({"message": "User updated successfully"})

# === Export All Users to TXT ===
@routes_bp.route("/export-users", methods=["GET"])
def export_users():
    users = User.query.all()
    with open("user_data.txt", "w") as f:
        for user in users:
            f.write(f"ID: {user.id}, Email: {user.email}\n")
    return {"message": "User data exported to user_data.txt"}, 200
