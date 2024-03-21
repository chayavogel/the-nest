# to do: add eror handling


#!/usr/bin/env python3
# app.py

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Toy, AgeRange, Review


# Views go here!

class Home(Resource):

    def get(self):

        response_dict = {
            "message": "Welcome to the Newsletter RESTful API",
        }

        response = make_response(
            response_dict,
            200
        )

        return response

class Users(Resource):

    def post(self):

        new_record = User(
            name=request.form['name'],
            bio=request.form['bio'],
            country=request.form['country'],
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response

class UserByID(Resource):

    def get(self, id):

        response_dict = User.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response
    
class Toys(Resource):

    def get(self):

        response_dict_list = [n.to_dict() for n in Toy.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response

    def post(self):

        new_record = Toy(
            name=request.form['name'],
            image_url=request.form['image_url'],
            description=request.form['description'],
            link=request.form['link'],
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response
    
class ToyByID(Resource):

    def get(self, id):

        response_dict = Toy.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response
    
class AgeRanges(Resource):

    def get(self):

        response_dict_list = [n.to_dict() for n in AgeRange.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response
    
class AgeRangeByID(Resource):

    def get(self, id):

        response_dict = AgeRange.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response
    
class Reviews(Resource):

    def get(self):

        response_dict_list = [n.to_dict() for n in Review.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response
    
    def post(self):

        new_record = Review(
            title=request.form['title'],
            text=request.form['text']
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response
    
class ReviewByID(Resource):

    def get(self, id):

        response_dict = Review.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response

api.add_resource(Home, '/')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Toys, '/toys')
api.add_resource(ToyByID, '/toys/<int:id>')
api.add_resource(AgeRanges, '/age_ranges')
api.add_resource(AgeRangeByID, '/age_ranges/<int:id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewByID, '/reviews/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

