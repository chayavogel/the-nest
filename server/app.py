# /Users/chayavogel/Documents/Flatiron/phase-5/the-nest/server/app.py
# app.py

# Standard library imports

# Remote library imports
from flask import Flask, request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Toy, AgeRange, Review


# Views go here!

class Signup(Resource):
    
    def post(self):

        json = request.get_json()

        user = User(
            firstname=json['firstname'],
            lastname=json['lastname'],
            email=json['email'],
        )

        user.password_hash = json['password']

        if json['profile_picture']:
            user.profile_picture=json['profile_picture']
        if json['bio']:
            user.bio=json['bio']
        if json['country']:
            user.country=json['country']

        try:
            db.session.add(user)
            db.session.commit()

            print("in app, user instance", user)

            session["user_id"] = user.id

            user_dict = {
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
                "profile_picture": user.profile_picture,
                "bio": user.bio,
                "country": user.country,
                "id": user.id
            }

            print("in app, user_dict", user_dict)

            return user_dict, 201                
        
        except IntegrityError as e:
            db.session.rollback()
            error = {"error": "Integrity constraint violation: " + str(e)}
            return error, 422
        
        except KeyError as e:
            error = {"error": "Key error: " + str(e)}
            return error, 422

class CheckSession(Resource):
                
    def get(self):

        if "user_id" in session and session["user_id"]:

            user = User.query.filter(User.id == session["user_id"]).first()

            if user:
                return user.to_dict(), 200
            else:
                return {"error": "user not found"}, 404
        
        else:
            return {}, 401

class Login(Resource):
    
    def post(self):

        json = request.get_json()

        email = json['email']
        password = json['password']
        user = User.query.filter(User.email == email).first()
        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                print(session["user_id"])
                return user.to_dict(), 200
            else:
                return {"error":"Email or password is incorrect"}, 401
        else: 
            return {"error":"There is no account associated with this email address"}, 401 

class Logout(Resource):
    
    def delete(self):
            
        if "user_id" in session and session["user_id"]:

            session["user_id"] = None
            return {}, 204
        
        else:
            return {
                    "error": "user not logged in"
                }, 401

class Home(Resource):

    def get(self):

        response_dict = {
            "message": "Welcome to the nest",
        }

        response = make_response(
            response_dict,
            200
        )

        return response

class Users(Resource):

    def get(self):

        response_dict_list = [n.to_dict() for n in User.query.all()]

        response = make_response(
            response_dict_list,
            200,
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

        json = request.get_json()

        new_record = Toy(
            name=json['name'],
            image_url=json['image_url'],
            brand=json['brand'],
            description=json['description'],
            link=json['link'],
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

api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
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