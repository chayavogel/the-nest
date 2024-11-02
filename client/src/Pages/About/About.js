import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from "../../Slices/UsersSlice";

function About() {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const memberCount = users.length;

    return (
        <div className="container my-5">

            <img src="https://momcommunity.org/wp-content/uploads/2020/05/about-us.png" alt="text where we all belong" className="img-fluid rounded mx-auto d-block mb-1" />
            <img 
                src="/IMG_3277.jpg" 
                alt="Two kids looking at the water" 
                className="img-fluid rounded mx-auto d-block mb-4" 
                style={{ height: '600px', objectFit: 'cover' }} 
            />

            <section className="mb-4">
                <h3 className="title">Our Story</h3>
                <p>
                    Hi, I'm Chaya, a mom of two and the creator of The Nest. After I had my first child, I realized how isolating and confusing motherhood can be. My friends and I were all asking each other the same questions, over and over again. We were all lost about the same things! I wanted to create a central place for everything mom-related. And that’s how The Nest was born.
                </p>
            </section>

            <section className="mb-4">
                <h3 className="title">What We Offer</h3>
                <p>At The Nest, we understand that motherhood is a journey filled with joys, challenges, and endless surprises. We created a space where you can find everything you need to nurture your little ones and yourself; a beautiful, vibrant family where moms from all walks of life come together to share their experiences, exchange advice, and nurture each other's journeys.</p>
                <ul className="list-unstyled mt-3">
                    <li><strong>Toy Recommendations:</strong> Explore a curated selection of toys for every age range, or share your own favorites with our community.</li>
                    <li><strong>Gear Recommendations:</strong> Do I really need a wipes warmer? Find out which gear is worth your money (...and might just save your life). *Coming Soon!*</li>
                    <li><strong>Local Connections:</strong> Connect with other moms in your area and join interest-based groups. *Coming Soon!*</li>
                    <li><strong>Live Discussions:</strong> Participate in live discussions, events, and Q&A sessions on all things motherhood. *Coming Soon!*</li>
                </ul>
            </section>

            <section className="mb-4">
                <h3 className="title">Join Our Growing Community</h3>
                <p>Join {memberCount} other moms (and counting!) in The Nest, where we build a community that empowers every mom to navigate the beautiful chaos of motherhood.</p>
                <p><em>In this big tree, there’s always room for one more nest.</em></p>
            </section>

            <hr className="my-5" />

            <section className="mb-4 text-center">
                <h3 className="title">Testimonials</h3>
                <div className="testimonial bg-light p-3 rounded mb-3">
                    <p>“The Nest has been a lifesaver! I've found advice and recommendations that I couldn’t get anywhere else.”</p>
                    <footer>— Sarah, Mom of 2</footer>
                </div>
                <div className="testimonial bg-light p-3 rounded">
                    <p>“Finally, a place where I can connect with other moms who just get it. I love being part of this community!”</p>
                    <footer>— Emily, First-Time Mom</footer>
                </div>
            </section>
        </div>
    );
}

export default About;
