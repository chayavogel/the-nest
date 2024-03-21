#!/usr/bin/env python3
# seed.py

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db
from models import User, Toy, AgeRange

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Clearing existing seed data...")
        # Delete all existing user records
        User.query.delete()
    
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

        for _ in range(5):
            age_range = AgeRange(
                age = fake.word(),
            )
            db.session.add(age_range) 
            db.session.commit() 