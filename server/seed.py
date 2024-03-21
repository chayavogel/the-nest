#!/usr/bin/env python3
# seed.py

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db
from models import User, Toy, AgeRange, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Clearing existing seed data...")
        # Delete all existing user records
        User.query.delete()
        Toy.query.delete()
        AgeRange.query.delete()
    
        print("Starting seed...")
        # Seed code goes here!

        # users

        for _ in range(5):

            user = User(
                name = fake.name(),
                bio = fake.paragraph(),
                country = fake.country()
            )
            db.session.add(user) 
            db.session.commit() 

        # toys

        for _ in range(5):

            toy = Toy(
                name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
                image_url = "https://lovevery.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2F0sea1vycfyqy%2FJwOZpORwCxFJnXNMxS9v8%2F293d4cf0880b3c534f79e7924fd48e76%2FLovevery-VKS-Playkit-TheLooker-ISO-305-NOV2021.png&w=750&q=75",
                brand = fake.company(),
                description = fake.paragraph(),
                link = "https://lovevery.com/products/the-play-kits-the-looker"
            )
            
            db.session.add(toy) 
            db.session.commit() 

        # age_ranges

        zero_three_months = AgeRange(
            age = "0-3 months"
        )

        three_six_months = AgeRange(
            age = "3-6 months"
        )

        six_nine_months = AgeRange(
            age = "6-9 months"
        )

        nine_twelve_months = AgeRange(
            age = "9-12 months"
        )

        twelve_eighteen_months = AgeRange(
            age = "12-18 months"
        )

        eighteen_twentyfour_months = AgeRange(
            age = "18-24 months"
        )

        two_three_years = AgeRange(
            age = "2-3 years"
        )

        three_five_years = AgeRange(
            age = "3-5 years"
        )

        six_eight_years = AgeRange(
            age = "6-8 years"
        )

        nine_twelve_years = AgeRange(
            age = "9-12 years"
        )

        db.session.add(zero_three_months)
        db.session.add(three_six_months)
        db.session.add(six_nine_months)
        db.session.add(nine_twelve_months)
        db.session.add(twelve_eighteen_months)
        db.session.add(eighteen_twentyfour_months)
        db.session.add(two_three_years)
        db.session.add(three_five_years)
        db.session.add(six_eight_years)
        db.session.add(nine_twelve_years)
        db.session.commit()

        # reviews

        for _ in range(5):

            review = Review(
                title = fake.word(),
                text = fake.sentence()
            )

            db.session.add(review) 
            db.session.commit() 