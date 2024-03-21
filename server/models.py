# models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

from config import db

# Models go here!

toys_age_ranges = db.Table(
    'toys_age_ranges',
    db.metadata,
    db.Column('toy_id', db.Integer, db.ForeignKey(
        'toys.id'), primary_key=True),
    db.Column('age_range_id', db.Integer, db.ForeignKey(
        'age_ranges.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    profile_photo = db.Column(db.String)
    bio = db.Column(db.String)
    country = db.Column(db.String)

    # Relationships
    toys = db.relationship('Toy', back_populates='user', cascade='all, delete-orphan')

    # Serialize Rules

    # Constraints

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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ## toy < review
    reviews = db.relationship('Review', back_populates='toy', cascade='all, delete-orphan')
    age_ranges = db.relationship('AgeRange', secondary=toys_age_ranges, back_populates='toys')

    # Serialize Rules
    # error here

    # Constraints

class AgeRange(db.Model, SerializerMixin):
    __tablename__ = 'age_ranges'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.String)

    # Relationships
    toys = db.relationship(
        'Toy', secondary=toys_age_ranges, back_populates='age_ranges')

    # Serialize Rules

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    text = db.Column(db.String)

    # Relationships
    toy_id = db.Column(db.Integer, db.ForeignKey('toys.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Serialize Rules

    # Constraints

