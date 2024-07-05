#!/usr/bin/env python3

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
                email = "one@gmail.com",
                firstname = "Karen",
                lastname = "Smith",
                _password_hash = fake.word(),
                profile_picture = "https://photoaid.com/en/tools/_next/static/images/before-25ed01ce5b208e9df51888c519ef7949.webp",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user1.password_hash = fake.word()
        
        user2 = User(
                email = "two@gmail.com",
                firstname = "Annie",
                lastname = "McCormik",
                _password_hash = fake.word(),
                profile_picture = "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user2.password_hash = fake.word()
        
        user3 = User(
                email = "three@gmail.com",
                firstname = "Sarah",
                lastname = "Cohen",
                _password_hash = fake.word(),
                profile_picture = "https://media.istockphoto.com/id/945061408/photo/portrait-of-beautiful-young-businesswoman.jpg?s=612x612&w=0&k=20&c=ncJEKD8tAeFOmH7eRTSI7dpuCqO52OHctk7xMdHFhmM=",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user3.password_hash = fake.word()
        
        user4 = User(
                email = "four@gmail.com",
                firstname = "Lily",
                lastname = "Price",
                _password_hash = fake.word(),
                profile_picture = "https://www.shutterstock.com/image-photo/fashion-industry-black-woman-designer-600nw-2235667567.jpg",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user4 = User(
                email = "five@gmail.com",
                firstname = "Tracy",
                lastname = "Parker",
                _password_hash = fake.word(),
                profile_picture = "https://image.shutterstock.com/image-photo/portrait-young-smiling-woman-looking-260nw-1865153395.jpg",
                bio = fake.paragraph(),
                country = fake.country()
            )
        
        user4.password_hash = fake.word()

        db.session.add_all([user1, user2, user3, user4]) 
        db.session.commit() 

        # add toys

        toy1 = Toy(
            name = "Wooden Building Set",
            image_url = "https://m.media-amazon.com/images/I/71U8VjRnoLL._AC_SX466_.jpg",
            brand = "Melissa & Doug",
            description = "Hours of educational fun: The Melissa & Doug wooden building blocks set includes 100 durable wooden blocks in 4 different colors and 9 shapes; its a classic educational toy that provides hours of hands on, screen free play and learning",
            link = "https://www.amazon.com/Melissa-Doug-Wooden-Building-Blocks/dp/B000068CKY/ref=sr_1_1_sspa?crid=34WJK2QDRWQH1&dib=eyJ2IjoiMSJ9.IW9qyvlailnMV7x8Q7Y_SoKSBpUk_eXfUZ4PLGWZkRWyq2xpnTpm__AjB-NVzGDJGE24B8XEdj-GNK4a3H3rIeQQr_uE_Sd3rVWC5vYuIB8_IMKx_zbmvr7x-F_Tk8Uj7o5HnlSn6dS4suDEmvYivfk-H_40h-4w9mSkY1gPtVq1sZsE-u4eJP1-Ltp3wbxzcyZFOw0NiITA6S8JSeNO3N6_-NWAU1v3F9vCiYr-Xpyp7jA5Qjr_ou-PJnc__doGnXRhXInuqXfCRFylZN784rnTVATcBNDhvdD1ZC7bZzE.KRfH-T_yYiX7_n11Diye6_YvXtXGuDbzK3tup9e_H7M&dib_tag=se&keywords=blocks&qid=1713365560&sprefix=blocks%2Caps%2C83&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
            user = user1
            )
        toy2 = Toy(
            name = "Disney Toy Lightning McQueen Race Car",
            image_url = "https://m.media-amazon.com/images/I/81ih+pdKpgL._AC_SX466_.jpg",
            brand = "Mattel",
            description = "Disney and Pixar's Moving Moments toy cars bring characters to life with changing expressions.",
            link = "https://www.amazon.com/Disney-Cars-Moments-Lightning-Exclusive/dp/B0BN1449R3/ref=sr_1_18?crid=2VXYZI9POBDB5&dib=eyJ2IjoiMSJ9.a2w6297miXIpvd4c9f7MpZiWbF8XTbls51dFdxKnOtK5OIa48UEwrtNH8neivXZCPr5QarDVfoW7cvqK36Wgl4e0lKJjkTr3Jz-9719BlQz9MDqp_0OIY38iaJXTI85NNFQ4aOg2gGCF6XnH9Su4Vnp7q7b3tspNIKYXGRp-BCtf4a2UW9YdN0BhVu7vhM_HGaNAuwwV6NWEKT6VtpFXTwpbKTVeJUPwGt827LuGZ4l8sPQAU223nSvwjWs-U3HqQ6FM2mmYXXUpXuv93GCe76Y7FBA2zAMe3EqWaJLen_8.JAJOEsTlmHGLyUOFldZ8K8-kUcmaco22fVj6-xfybAc&dib_tag=se&keywords=toy%2Bcar&qid=1713365658&sprefix=toy%2Bcar%2Caps%2C120&sr=8-18&th=1",
            user = user1
            )
        toy3 = Toy(
            name = fake.word(ext_word_list=['Ball', 'Doll', 'Car', 'Blocks']),
            image_url = "https://www.ikea.com/us/en/images/products/kramig-soft-toy-white-black__0162448_pe317642_s5.jpg?f=s",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user3
            )
        toy4 = Toy(
            name = fake.word(ext_word_list=['Ball', 'Doll', 'Car', 'Blocks']),
            image_url = "https://www.happity.co.uk/blog/wp-content/uploads/2021/03/toys-for-babies-with-eczema.png",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user4
            )
        toy5 = Toy(
            name = fake.word(ext_word_list=['Ball', 'Doll', 'Car', 'Blocks']),
            image_url = "https://media.istockphoto.com/id/1322274556/photo/collection-of-different-toys-on-wooden-table.webp?b=1&s=612x612&w=0&k=20&c=Ca8C2DdELsvx-KLQuyM2epAMJ3J2jyFretjB1IMtN8c=",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user1
            )
        toy6 = Toy(
            name = fake.word(ext_word_list=['Ball', 'Ragdoll', 'Firetruck', 'Blocks', 'Scooter', 'Play Kitchen']),
            image_url = "https://smilingtreetoys.com/cdn/shop/products/toy-trucks-for-kids-wooden-toys-Smiling-Tree-Toys_1200x.jpg?v=1653432233",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user1
            )
        toy7 = Toy(
            name = fake.word(ext_word_list=['Ball', 'Doll', 'Car', 'Blocks']),
            image_url = "https://www.ikea.com/us/en/images/products/kramig-soft-toy-white-black__0162448_pe317642_s5.jpg?f=s",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user3
            )
        toy8 = Toy(
            name = fake.word(ext_word_list=['Ball', 'Doll', 'Car', 'Blocks']),
            image_url = "https://www.happity.co.uk/blog/wp-content/uploads/2021/03/toys-for-babies-with-eczema.png",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user4
            )
        
        db.session.add_all([toy1, toy2, toy3, toy4, toy5, toy6, toy7, toy8]) 
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

        print("Seeded!")