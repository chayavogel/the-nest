# models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
import validators

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
    name = db.Column(db.String, unique=True)
    profile_photo = db.Column(db.String)
    bio = db.Column(db.String)
    country = db.Column(db.String)

    # Relationships
    toys = db.relationship('Toy', back_populates='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')

    # Serialize Rules
    serialize_rules = ('-toys.user', '-toys.reviews.user', '-toys.age_ranges', '-reviews.user', '-reviews.toy', '-toys.user_id')

    # Constraints
    @validates('name')
    def validate_name(self, key, name):
        if len(name) > 50:
            raise ValueError("Name may not exceed 50 characters")
        return name
    
    @validates('profile_photo')
    def validate_link(self, key, profile_photo):

        if not validators.url(profile_photo):
            raise ValueError("Invalid profile photo URL")

        return profile_photo
    
    @validates('bio')
    def validate_bio(self, key, bio):
        if len(bio) > 250:
            raise ValueError("Bio may not exceed 250 characters")
        return bio

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
    user = db.relationship('User', back_populates='toys')
    reviews = db.relationship('Review', back_populates='toy', cascade='all, delete-orphan')
    age_ranges = db.relationship('AgeRange', secondary=toys_age_ranges, back_populates='toys')

    # Serialize Rules
    serialize_rules = ('-user.toys', '-reviews.toy', '-age_ranges.toys', '-reviews.user.toys')

    # Constraints
    @validates('name')
    def validate_name(self, key, name):
        if len(name) > 50:
            raise ValueError("Input may not exceed 50 characters")
        return name
    
    @validates('image_url')
    def validate_image_url(self, key, image_url):

        if not validators.url(image_url):
            raise ValueError("Invalid image URL")

        return image_url
    
    @validates('image')
    def validate_image(self, key, image):
        if len(image) > 50:
            raise ValueError("Input may not exceed 50 characters")
        return image
    
    @validates('brand')
    def validate_brand(self, key, brand):
        if len(brand) > 50:
            raise ValueError("Input may not exceed 50 characters")
        return brand
    
    @validates('description')
    def validate_description(self, key, description):
        if len(description) > 250:
            raise ValueError("Description may not exceed 250 characters")
        return description
    
    @validates('link')
    def validate_link(self, key, link):

        if not validators.url(link):
            raise ValueError("Invalid toy URL")

        return link

class AgeRange(db.Model, SerializerMixin):
    __tablename__ = 'age_ranges'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.String)

    # Relationships
    toys = db.relationship('Toy', secondary=toys_age_ranges, back_populates='age_ranges')

    # Serialize Rules
    serialize_rules = ('-toys.age_ranges', '-toys.reviews', '-toys.user')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)

    # Relationships
    toy_id = db.Column(db.Integer, db.ForeignKey('toys.id'))
    toy = db.relationship('Toy', back_populates='reviews') 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='reviews') 

    # Serialize Rules
    serialize_rules = ('-toy.reviews', '-toy.age_ranges', '-user.reviews', '-user.toys.reviews', '-toy.user.reviews',)

    # Constraints
    @validates('title')
    def validate_title(self, key, title):
        if len(title) > 50:
            raise ValueError("Review title may not exceed 50 characters")
        return title
    
    @validates('body')
    def validate_body(self, key, body):
        if len(body) > 250:
            raise ValueError("Review body may not exceed 250 characters")
        return body

