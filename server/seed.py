#!/usr/bin/env python3
# seed.py

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db
from models import User, Toy, AgeRange, Review, toys_age_ranges

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Clearing existing seed data...")
        # Delete all existing user records
        db.session.query(toys_age_ranges).delete()
        db.session.commit()
        User.query.delete()
        Toy.query.delete()
        AgeRange.query.delete()
        Review.query.delete()
    
        print("Starting seed...")

        # add users

        user1 = User(
                name = fake.name(),
                profile_photo = "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )
        user2 = User(
                name = fake.name(),
                profile_photo = "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )
        user3 = User(
                name = fake.name(),
                profile_photo = "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )
        user4 = User(
                name = fake.name(),
                profile_photo = "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )

        db.session.add_all([user1, user2, user3, user4]) 
        db.session.commit() 

        # add toys

        toy1 = Toy(
            name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
            image_url = "https://lovevery.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2F0sea1vycfyqy%2FJwOZpORwCxFJnXNMxS9v8%2F293d4cf0880b3c534f79e7924fd48e76%2FLovevery-VKS-Playkit-TheLooker-ISO-305-NOV2021.png&w=750&q=75",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user1
            )
        toy2 = Toy(
            name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
            image_url = "https://lovevery.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2F0sea1vycfyqy%2FJwOZpORwCxFJnXNMxS9v8%2F293d4cf0880b3c534f79e7924fd48e76%2FLovevery-VKS-Playkit-TheLooker-ISO-305-NOV2021.png&w=750&q=75",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user1
            )
        toy3 = Toy(
            name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
            image_url = "https://lovevery.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2F0sea1vycfyqy%2FJwOZpORwCxFJnXNMxS9v8%2F293d4cf0880b3c534f79e7924fd48e76%2FLovevery-VKS-Playkit-TheLooker-ISO-305-NOV2021.png&w=750&q=75",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user3
            )
        toy4 = Toy(
            name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
            image_url = "https://lovevery.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2F0sea1vycfyqy%2FJwOZpORwCxFJnXNMxS9v8%2F293d4cf0880b3c534f79e7924fd48e76%2FLovevery-VKS-Playkit-TheLooker-ISO-305-NOV2021.png&w=750&q=75",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user4
            )
        
        db.session.add_all([toy1, toy2, toy3, toy4]) 
        db.session.commit() 

        # add reviews

        review1 = Review(
                title = fake.word(),
                body = fake.sentence(),
                toy = toy4,
                user = user4
            ) 
        review2 = Review(
                title = fake.word(),
                body = fake.sentence(),
                toy = toy3,
                user = user2
            ) 
        review3 = Review(
                title = fake.word(),
                body = fake.sentence(),
                toy = toy2,
                user = user3
            ) 
        review4 = Review(
                title = fake.word(),
                body = fake.sentence(),
                toy = toy1,
                user = user1
            ) 
        
        db.session.add_all([review1, review2, review3, review4]) 
        db.session.commit() 

        # add age_ranges

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

        db.session.add_all([zero_three_months, three_six_months, six_nine_months, nine_twelve_months, twelve_eighteen_months, eighteen_twentyfour_months, two_three_years, three_five_years,six_eight_years, nine_twelve_years])

        db.session.commit()

        # add age_ranges to a toy
        zero_three_months.toys.append(toy1)
        zero_three_months.toys.append(toy2)
        zero_three_months.toys.append(toy3)
        zero_three_months.toys.append(toy4)
        three_six_months.toys.append(toy1)
        three_six_months.toys.append(toy2)
        three_six_months.toys.append(toy3)
        three_six_months.toys.append(toy4)

        # add toys to an age_range
        toy1.age_ranges.append(six_nine_months)
        toy1.age_ranges.append(nine_twelve_months)
        toy1.age_ranges.append(twelve_eighteen_months)

        db.session.commit()