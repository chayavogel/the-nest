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
                email = "hjappy@gmail.com",
                firstname = fake.word(),
                lastname = fake.word(),
                _password_hash = fake.word(),
                profile_picture = "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user1.password_hash = fake.word()
        
        user2 = User(
                email = "happy@gmail.com",
                firstname = fake.word(),
                lastname = fake.word(),
                _password_hash = fake.word(),
                profile_picture = "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user2.password_hash = fake.word()
        
        user3 = User(
                email = "pappy@gmail.com",
                firstname = fake.word(),
                lastname = fake.word(),
                _password_hash = fake.word(),
                profile_picture = "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user3.password_hash = fake.word()
        
        user4 = User(
                email = "lappy@gmail.com",
                firstname = fake.word(),
                lastname = fake.word(),
                _password_hash = fake.word(),
                profile_picture = "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user4.password_hash = fake.word()

        db.session.add_all([user1, user2, user3, user4]) 
        db.session.commit() 

        # add toys

        toy1 = Toy(
            name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
            image_url = "https://media.istockphoto.com/id/1322274556/photo/collection-of-different-toys-on-wooden-table.webp?b=1&s=612x612&w=0&k=20&c=Ca8C2DdELsvx-KLQuyM2epAMJ3J2jyFretjB1IMtN8c=",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user1
            )
        toy2 = Toy(
            name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
            image_url = "https://media.istockphoto.com/id/1322274556/photo/collection-of-different-toys-on-wooden-table.webp?b=1&s=612x612&w=0&k=20&c=Ca8C2DdELsvx-KLQuyM2epAMJ3J2jyFretjB1IMtN8c=",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user1
            )
        toy3 = Toy(
            name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
            image_url = "https://media.istockphoto.com/id/1322274556/photo/collection-of-different-toys-on-wooden-table.webp?b=1&s=612x612&w=0&k=20&c=Ca8C2DdELsvx-KLQuyM2epAMJ3J2jyFretjB1IMtN8c=",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user3
            )
        toy4 = Toy(
            name = fake.word(ext_word_list=['ball', 'doll', 'car', 'blocks']),
            image_url = "https://media.istockphoto.com/id/1322274556/photo/collection-of-different-toys-on-wooden-table.webp?b=1&s=612x612&w=0&k=20&c=Ca8C2DdELsvx-KLQuyM2epAMJ3J2jyFretjB1IMtN8c=",
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
                user_id = user4.id
            ) 
        review2 = Review(
                title = fake.word(),
                body = fake.sentence(),
                toy = toy3,
                user_id = user4.id
            ) 
        review3 = Review(
                title = fake.word(),
                body = fake.sentence(),
                toy = toy2,
                user_id = user4.id
            ) 
        review4 = Review(
                title = fake.word(),
                body = fake.sentence(),
                toy = toy1,
                user_id = user4.id
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
            age = "4-5 years"
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