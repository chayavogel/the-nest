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
            name = "Wooden Activity Cube",
            image_url = "https://m.media-amazon.com/images/I/615f4ZW-dFL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://www.amazon.com/bopoobo-Activity-Montessori-Educational-Developmental/dp/B0B9RQJQBB/ref=sr_1_10?crid=30JHZJMSV8R6Q&dib=eyJ2IjoiMSJ9.RoOuF0tT94YZpORtethBXouAt6JpO6ka-qQ8Tg-HsW-HxQGYMn-_E6VvoHCgHI1-3MYN9ursnnWoYrSygYvguworio9FPVQp8vRIjIm2YaDdM_g5iFhoAHd6j7PvkhlhotqrqV8-zpqoHFSng5M3YwX9BjlYwPeEC6oev8O2SPnwLSCsHZruk3KokvdMeXa55vpQW9civi6cyLu-2hMBKQ2SUnX5pjjV9zcUNfvLmlAokXUT_umuV5iWO9u0Hq_hkxgzctm6LYCFljQNS6-OB8fLuhdsGr1ICHdE519Rqgk.ZkKdRvEaBuFzCx0txwdY7-r8CU1_a4VIhZTYVF7z1LE&dib_tag=se&keywords=toys+aesthetic+neutral&qid=1720620789&sprefix=toys+aesthetic+neutral%2Caps%2C89&sr=8-10",
            user = user1
            )
        toy2 = Toy(
            name = "Shape Puzzle",
            image_url = "https://m.media-amazon.com/images/I/61DshnvDLPL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://www.amazon.com/Mamimami-Home-Montessori-Preschool-Educational/dp/B09Z1SFZDG/ref=sr_1_5?crid=30JHZJMSV8R6Q&dib=eyJ2IjoiMSJ9.RoOuF0tT94YZpORtethBXouAt6JpO6ka-qQ8Tg-HsW-HxQGYMn-_E6VvoHCgHI1-3MYN9ursnnWoYrSygYvguworio9FPVQp8vRIjIm2YaDdM_g5iFhoAHd6j7PvkhlhotqrqV8-zpqoHFSng5M3YwX9BjlYwPeEC6oev8O2SPnwLSCsHZruk3KokvdMeXa55vpQW9civi6cyLu-2hMBKQ2SUnX5pjjV9zcUNfvLmlAokXUT_umuV5iWO9u0Hq_hkxgzctm6LYCFljQNS6-OB8fLuhdsGr1ICHdE519Rqgk.ZkKdRvEaBuFzCx0txwdY7-r8CU1_a4VIhZTYVF7z1LE&dib_tag=se&keywords=toys%2Baesthetic%2Bneutral&qid=1720620745&sprefix=toys%2Baesthetic%2Bneutral%2Caps%2C89&sr=8-5&th=1",
            user = user1
            )
        toy3 = Toy(
            name = "Play Tunnel",
            image_url = "https://m.media-amazon.com/images/I/61YgpcDkZoL._AC_SX466_.jpg",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://www.amazon.com/Sprouts-Tunnel-Eco-Friendly-Recycled-Fabric/dp/B0D5Z45T5M/ref=sr_1_8?crid=26SSSLB29GWAG&dib=eyJ2IjoiMSJ9.anbod-PZt60humHTMx2pt8L2S_Y94OezccTQlGMBsEE7aqOaN69s2QrKZxnTryUrQsKzd7d0d-oUaO7odD3DP5PKAlL4C-PDGE5NerDM6R7arkUZdqVHFA27pbm7xG9xy3xDTXj-78pKjeNEPYamWMAmnyq0451nG5XMJmk4kl_K9t8fq76EiR-YsG0SIgprZWLbe2DoO52nvWG6rL3D5pSEEIwvUuZ9dn2KtVuS_ixWKhT9RRXRFTXiDkq3EtA-D1zbJbwL3ISpkqmbgvG3sz8O2rBY3T7Wvqb_VLQ8zSM.DMLyNo_3ystlLo8x5r8AxpL-pTRoEtG9t4C6WRH_1l4&dib_tag=se&keywords=tunnel%2Bneutral%2Bcolors&qid=1720620681&sprefix=tunnel%2Bneutral%2Bcolor%2Caps%2C89&sr=8-8&th=1",
            user = user3
            )
        toy4 = Toy(
            name = "Musical Instruments",
            image_url = "https://m.media-amazon.com/images/I/71kr6VsQjuL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://www.amazon.com/Musical-Instruments-Joyreal-Toddlers1-3-Kids/dp/B0CTY41WC3/ref=sr_1_4_sspa?crid=2GFR6O4EA8I9U&dib=eyJ2IjoiMSJ9.g-mZ5qtNaMS8ZovoOQxuGdMaxec34cZpqhORITwvss6FQcRm45prIsLsldCmuF0JA3-MSQuleQUKCg72xKZ_1KfAMSuNeygTsbCHCSWxI7qxz1aymuvWDTbuQazExy1Qj23joN6L_omhcds4VfoUI5atKUAwUG-oYAO_rejBo4sNmARgg_ase5m4No2-Eizy-jktBiTac2ZQvx2jk1dV58sxAWlOESgMrOg2sKEM2pK9Rn4o5OWS2ufmJRZ7h6g5Qt-q03MGRZToY5JWsTnCkGdBUZ6LCi4Glr0vrnfd7PM._g5eWk-4XDz3j72Qz6zprTt4dReLhJI2bTJbncpu8Z8&dib_tag=se&keywords=aesthetic+toys&qid=1720620499&sprefix=aesthetic+toys%2Caps%2C94&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
            user = user4
            )
        toy5 = Toy(
            name = "Wooden Train Set",
            image_url = "https://m.media-amazon.com/images/I/51veAwM3auL._AC_SX466_.jpg",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://www.amazon.com/ibwaae-Wooden-Numbers-Toddler-Brithday/dp/B0BPS8T6VH/ref=sr_1_19_sspa?crid=2NJ0YN1RU0GOG&dib=eyJ2IjoiMSJ9.vI37DG8_-LGmqgqq5_QlqVsocHCuRzIKrvApQxq6rtIBgBlRwr8-Dgnt-m1e3ac4gYGA2-bys5B36orhjZXR6rPGtVRjT9N4PciDHxudc8MSO47rb7kqMnfZV_dqTC9MOe56uCT2wMAnmkrah1voNh8s7nDGFy3PnjeWh-2gSlgEWoY5YWzVaf-R9FixTiwVaOEWe87SQtJtNf4HI2nbC1j82_X5eBljO1MHUFoiVcvO1p6GxXqJ2PAphVoKixLodK52yGbZS0G6xECLnJxsthdB2p7iqV7zqdtX5dWdyr8.0RSNWZi3bO7NiIzZL-oSn61MvW7FclkF-vVxRfaaiks&dib_tag=se&keywords=wooden%2Btrain%2Bset&qid=1720620344&sprefix=wooden%2Btrain%2Bset%2Caps%2C94&sr=8-19-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1",
            user = user1
            )
        toy6 = Toy(
            name = "Wooden Car",
            image_url = "https://smilingtreetoys.com/cdn/shop/products/toy-trucks-for-kids-wooden-toys-Smiling-Tree-Toys_1200x.jpg?v=1653432233",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://lovevery.com/products/the-play-kits-the-looker",
            user = user1
            )
        toy7 = Toy(
            name = "Wooden Multi Shape Stacker",
            image_url = "https://m.media-amazon.com/images/I/71krZbm1BOL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://www.amazon.com/mushie-Preschool-Educational-Montessori-Original/dp/B0CVNMSCJ9/ref=sr_1_32?crid=24Y02HJ47N3E8&dib=eyJ2IjoiMSJ9.hmozJzzg-3M-j6bbShCr6zFSaoiIkiQKAdQ5ln1eGlhStaBRlDBRDkEcIGHoAaqSpjy02V4n6eBaivaoT3JcqqWHBrZnghlIHEpU9afM1dlMGeJwEu70CGU0JkRTuInqjd3eb2cjuOwCbx6lduU8j4qacJ27aN3nCBneX8WwJ8FOtLKzhFxU1oGK0Q8QkUskV5fK8TjJHwN3dbM9Vz0n1yxEWwnUSMxERPunAETttK7HleCQu3uETJnLQF7WwdDqn6ofhhA3mHMSrPrrFMY-96Xay7fA6eGgryGkydvjSXQ.Zw9JlMsj28vQgx9HGENuOa8Kq0ipOiZ_cE3k4hlrqFw&dib_tag=se&keywords=mushie%2Btoys&qid=1720620215&sprefix=mushie%2Btoys%2Caps%2C91&sr=8-32&th=1",
            user = user3
            )
        toy8 = Toy(
            name = "Stacking Cups",
            image_url = "https://m.media-amazon.com/images/I/51WvKGN6i4L._AC_SX466_.jpg",
            brand = fake.company(),
            description = fake.paragraph(),
            link = "https://www.amazon.com/mushie-Stacking-Cups-Denmark-Original/dp/B0858X3VDM/ref=sr_1_1_sspa?crid=24Y02HJ47N3E8&dib=eyJ2IjoiMSJ9.hmozJzzg-3M-j6bbShCr6zFSaoiIkiQKAdQ5ln1eGlhStaBRlDBRDkEcIGHoAaqSpjy02V4n6eBaivaoT3JcqqWHBrZnghlIHEpU9afM1dlMGeJwEu70CGU0JkRTuInqjd3eb2cjuOwCbx6lduU8j4qacJ27aN3nCBneX8WwJ8FOtLKzhFxU1oGK0Q8QkUskV5fK8TjJHwN3dbM9Vz0n1yxEWwnUSMxERPunAETttK7HleCQu3uETJnLQF7WwdDqn6ofhhA3mHMSrPrrFMY-96Xay7fA6eGgryGkydvjSXQ.Zw9JlMsj28vQgx9HGENuOa8Kq0ipOiZ_cE3k4hlrqFw&dib_tag=se&keywords=mushie%2Btoys&qid=1720620036&sprefix=mushie%2Btoys%2Caps%2C91&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
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
        zero_three_months.toys.append(toy5)
        zero_three_months.toys.append(toy6)
        three_six_months.toys.append(toy1)
        three_six_months.toys.append(toy2)
        three_six_months.toys.append(toy3)
        three_six_months.toys.append(toy4)
        nine_twelve_years.toys.append(toy3)
        nine_twelve_years.toys.append(toy4)
        nine_twelve_years.toys.append(toy7)
        nine_twelve_years.toys.append(toy8)
        six_eight_years.toys.append(toy5)
        six_eight_years.toys.append(toy6)
        six_eight_years.toys.append(toy7)
        six_eight_years.toys.append(toy8)

        # add toys to an age_range
        toy1.age_ranges.append(six_nine_months)
        toy1.age_ranges.append(nine_twelve_months)
        toy1.age_ranges.append(twelve_eighteen_months)

        db.session.commit()

        print("Seeded!")