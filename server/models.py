# models.py

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    country = db.Column(db.String)

    # Relationships
    # toys they posted

    # Serialize Rules

class Toy(db.Model, SerializerMixin):
    __tablename__ = 'toys'

    # Columns

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String) 
    brand = db.Column(db.String)
    description = db.Column(db.String)
    link = db.Column(db.String)

    # Relationships
    # who posted it, reviews, age range

    # Serialize Rules

class AgeRange(db.Model, SerializerMixin):
    __tablename__ = 'age_ranges'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.String)

    # Relationships

    # Serialize Rules

# class Review(db.Model, SerializerMixin):
#     __tablename__ = 'reviews'

    # Columns

    # Relationships

    # Serialize Rules