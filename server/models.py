# /Users/chayavogel/Documents/Flatiron/phase-5/the-nest/server/models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
import validators
from sqlalchemy.ext.hybrid import hybrid_property
from email_validator import validate_email, EmailNotValidError
# How can i use this?
from sqlalchemy.exc import IntegrityError

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

from config import db, bcrypt

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
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String, nullable=True, default="https://t3.ftcdn.net/jpg/04/43/94/64/360_F_443946416_l2xXrFoIuUkItmyscOK5MNh6h0Vai3Ua.jpg")
    bio = db.Column(db.String, nullable=True, default="Proud member of the flock!")
    country = db.Column(db.String, nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes can't be viewed")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    # Relationships
    toys = db.relationship('Toy', back_populates='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')

    # Serialize Rules
    serialize_rules = ('-toys.user', '-toys.reviews.user', '-toys.age_ranges', '-reviews.user', '-reviews.toy', '-toys.user_id', '-_password_hash')

    # Constraints
    @validates('firstname')
    def validate_firstname(self, key, firstname):
        if len(firstname) > 50:
            raise ValueError("Firstname name has 50 character limit")
        return firstname
    
    @validates('lastname')
    def validate_lastname(self, key, lastname):
        if len(lastname) > 50:
            raise ValueError("Lastname name has 50 character limit")
        return lastname
    
    @validates('email')
    def validate_email(self, key, email):
        existing_user = User.query.filter(User.id != self.id, User.email == email).first()
        if existing_user:
            # enoch i want this to be an integrity one
            raise ValueError("An account associated with this email address already exists")
        if not validate_email(email):
            raise EmailNotValidError
        return email

    @validates('profile_picture')
    def validate_link(self, key, profile_picture):

        if not validators.url(profile_picture):
            raise ValueError("Invalid profile picture link. Try again")
        return profile_picture
    
    def delete(self):
        db.session.delete(self)

class Toy(db.Model, SerializerMixin):
    __tablename__ = 'toys'

    # Columns

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String) 
    brand = db.Column(db.String)
    description = db.Column(db.String)
    link = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    user = db.relationship('User', back_populates='toys')
    reviews = db.relationship('Review', back_populates='toy', cascade='all, delete-orphan')
    age_ranges = db.relationship('AgeRange', secondary=toys_age_ranges, back_populates='toys')

    # Serialize Rules
    serialize_rules = ('-user.toys', '-reviews.toy', '-age_ranges.toys', '-reviews.user.toys')

    # Constraints
    @validates('name')
    def validate_name(self, name):
        if len(name) > 50:
            raise ValueError("Toy name has 50 character limit")
        return name
    
    @validates('image_url')
    def validate_image_url(self, image_url):
        if image_url:
            if not validators.url(image_url):
                raise ValueError("Invalid image link")
        return image_url
    
    @validates('brand')
    def validate_brand(self, brand):
        if len(brand) > 50:
            raise ValueError("Brand name has 50 character limit")
        return brand
    
    @validates('description')
    def validate_description(self, description):
        if len(description) > 350:
            raise ValueError("Description has 250 character limit")
        return description
    
    @validates('link')
    def validate_link(self, link):
        if not validators.url(link):
            raise ValueError("Invalid toy link")
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
    toy_id = db.Column(db.Integer, db.ForeignKey('toys.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    toy = db.relationship('Toy', back_populates='reviews') 
    user = db.relationship('User', back_populates='reviews') 

    # Serialize Rules
    serialize_rules = ('-toy.reviews', '-toy.age_ranges', '-user.reviews', '-user.toys.reviews', '-toy.user.reviews',)

    # Constraints
    @validates('title')
    def validate_title(self, title):

        if len(title) > 50:
            raise ValueError("Review title has 50 character limit")
        return title
    
    @validates('body')
    def validate_body(self, body):
        if len(body) > 250:
            raise ValueError("Review body has 250 character limit")
        return body

