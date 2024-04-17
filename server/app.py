from flask import Flask, request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, Toy, AgeRange, Review
from dotenv import load_dotenv
load_dotenv()

class CheckSession(Resource):
                
    def get(self):

        if session.get("user_id"):

            user = User.query.filter(User.id == session["user_id"]).first()

            if user:
                return user.to_dict(), 200
            else:
                return {}, 401
        
        else:
            return {}, 401

class Signup(Resource):
    
    def post(self):

        json = request.get_json()

        try:

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
        
            db.session.add(user)
            db.session.commit()

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

            return user_dict, 201    
        
        #i want to be able to raise a integrity error
    
        except Exception as err:
            return {"error": [str(err)]}, 422
        
class Login(Resource):
    
    def post(self):

        json = request.get_json()

        try:

            email = json['email']
            password = json['password']
            user = User.query.filter(User.email == email).first()
            if user:
                if user.authenticate(password):
                    session["user_id"] = user.id
                    return user.to_dict(), 200
                else:
                    return {"error":"Incorrect password"}, 401
            else: 
                return {"error":"There is no account associated with this email address"}, 401

        except Exception as err:
                return {"error": str(err)}, 401 

class Logout(Resource):
    
    def delete(self):
            
        if session.get("user_id"):

            try:

                session["user_id"] = None
                return {}, 204
            
            except Exception as err:
                return {"error": [str(err)]}, 401
        
        else:
            return {}, 401

class EditAccount(Resource):
    
    def put(self):

        if session.get("user_id"):

            user_id = session["user_id"]
            json = request.get_json()

            try:

                currentUser = User.query.filter_by(id=user_id).first()

                currentUser.firstname = json['firstname']
                currentUser.lastname = json['lastname']
                currentUser.email = json['email']
                # currentUser.password_hash = json['password']
                if json['profile_picture']:
                    currentUser.profile_picture = json['profile_picture']
                else:
                    currentUser.profile_picture = "https://t3.ftcdn.net/jpg/04/43/94/64/360_F_443946416_l2xXrFoIuUkItmyscOK5MNh6h0Vai3Ua.jpg"
                if json['bio']:
                    currentUser.bio = json['bio']
                else:
                    currentUser.bio = "Beloved member of the flock"
                currentUser.country = json['country']

                db.session.commit()

                response = make_response(
                    currentUser.to_dict(),
                    200,
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
        
        else:
            return {"error": "You are not logged in to complete this step"}, 401
        
class DeleteAccount(Resource):
    
    def delete(self):

        if session.get("user_id"):

            try:

                user_id = session["user_id"]

                currentUser = User.query.filter_by(id=user_id).first()

                currentUser.delete()

                db.session.commit()

                return {}, 204
            
            except Exception as err:
                return {"error": [str(err)]}, 401
        
        else:
            return {"error": "You are not logged in to complete this step"}, 401        

class Users(Resource):

    def get(self):

        try:

            response_dict_list = [n.to_dict() for n in User.query.all()]

            response = make_response(
                response_dict_list,
                200,
            )

            return response
        
        except Exception as err:
                return {"error": [str(err)]}, 401

class UserByID(Resource):

    def get(self, id):

        try:

            response_dict = User.query.filter_by(id=id).first().to_dict()

            response = make_response(
                response_dict,
                200,
            )

            return response
        
        except Exception as err:
                return {"error": [str(err)]}, 401
    
class Home(Resource):

    def get(self):

        if session.get("user_id"):

            try:

                response_dict = {
                    "message": "Welcome to the nest",
                }

                response = make_response(
                    response_dict,
                    200
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
        
        else:
            return {"error": "You are not logged in to complete this step"}, 401 
    
class Toys(Resource):

    def get(self):

        if session.get("user_id"):

            try:

                response_dict_list = [n.to_dict() for n in Toy.query.all()]

                response = make_response(
                    response_dict_list,
                    200,
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
        
        else:
            return {"error": "You are not logged in to complete this step"}, 401 

    def post(self):

        if session.get("user_id"):

            try:

                json = request.get_json()

                form_age_ranges = json.get('age_ranges')
                database_age_ranges = AgeRange.query.all()

                new_record = Toy(
                    name=json['name'],
                    image_url=json['image_url'],
                    brand=json['brand'],
                    description=json['description'],
                    link=json['link'],
                    user_id=session["user_id"]
                )

                for form_age_range in form_age_ranges:
                    for database_age_range in database_age_ranges:
                        if form_age_range == database_age_range.age:
                            new_record.age_ranges.append(database_age_range)

                db.session.add(new_record)
                db.session.commit()

                response_dict = new_record.to_dict()

                response = make_response(
                    response_dict,
                    201,
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
        
        else:
            return {"error": "You are not logged in to complete this step"}, 401 
    
class ToyByID(Resource):

    def get(self, id):
    
        if session.get("user_id"):

            try:

                response_dict = Toy.query.filter_by(id=id).first().to_dict()

                response = make_response(
                    response_dict,
                    200,
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
            
        else:
            return {"error": "You are not logged in to complete this step"}, 401 
    
class AgeRanges(Resource):

    def get(self):

        if session.get("user_id"):

            try:

                response_dict_list = [n.to_dict() for n in AgeRange.query.all()]

                response = make_response(
                    response_dict_list,
                    200,
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
            
        else:
            return {"error": "You are not logged in to complete this step"}, 401
    
class AgeRangeByID(Resource):

    def get(self, id):  
    
        if session.get("user_id"):

            try:

                response_dict = AgeRange.query.filter_by(id=id).first().to_dict()

                response = make_response(
                    response_dict,
                    200,
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
                
        else:
            return {"error": "You are not logged in to complete this step"}, 401 
    
class Reviews(Resource):

    def get(self):

        if session.get("user_id"):

            try:

                response_dict_list = [n.to_dict() for n in Review.query.all()]

                response = make_response(
                    response_dict_list,
                    200,
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
                
        else:
            return {"error": "You are not logged in to complete this step"}, 401 

    def post(self):

        if session.get("user_id"):

            try:

                json = request.get_json()

                new_record = Review(
                title=json['title'],
                body=json['body'],
                toy_id=json['toy_id'],
                user_id=session["user_id"]
                )

                db.session.add(new_record)
                db.session.commit()

                response_dict = new_record.to_dict()

                response = make_response(
                    response_dict,
                    201,
                )

                return response
            
            except Exception as err:
                return {"error": [str(err)]}, 401
                
        else:
            return {"error": "You are not logged in to complete this step"}, 401 
        
    
class ReviewByID(Resource):

    def get(self, id):
    
        if session.get("user_id"):

            try:

                response_dict = Review.query.filter_by(id=id).first().to_dict()

                response = make_response(
                    response_dict,
                    200,
                )

                return response
            
            except Exception as err:
                    return {"error": [str(err)]}, 401
                
        else:
            return {"error": "You are not logged in to complete this step"}, 401 

api.add_resource(CheckSession, '/check_session')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(EditAccount, '/edit_account')
api.add_resource(DeleteAccount, '/delete_account')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Home, '/')
api.add_resource(Toys, '/toys')
api.add_resource(ToyByID, '/toys/<int:id>')
api.add_resource(AgeRanges, '/age_ranges')
api.add_resource(AgeRangeByID, '/age_ranges/<int:id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewByID, '/reviews/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)