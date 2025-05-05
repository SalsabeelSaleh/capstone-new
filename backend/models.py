from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() #declare

# === User Table Model ===
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)                    # Primary key
    username = db.Column(db.String(50), unique=True, nullable=False)  # Required, must be unique
    password_hash = db.Column(db.String(255), nullable=False)       # Store hashed password
    email = db.Column(db.String(100), unique=True, nullable=False)  # Unique email
    avatar = db.Column(db.Text)                                     # Optional avatar SVG
    language = db.Column(db.String(5))                              # "en" or "ar"
