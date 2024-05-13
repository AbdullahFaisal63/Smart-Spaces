import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
function About() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="mb-4 text-gray-600">
            Smart Spaces is a leading real estate platform dedicated to revolutionizing the way people buy, sell, and invest in properties. Our mission is to empower individuals and families with the tools, resources, and expertise they need to make informed and confident decisions in the ever-evolving real estate market.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Who We Are</h2>
          <p className="mb-4 text-gray-600">
            At the heart of Smart Spaces is a team of passionate real estate professionals, technology innovators, and customer-centric advocates. We have combined our deep industry knowledge, cutting-edge digital solutions, and unwavering commitment to customer satisfaction to create a seamless and empowering real estate experience.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Services</h2>
          <p className="mb-4 text-gray-600">
            <strong className="text-blue-600">Sell Your Property:</strong> Whether you're looking to sell your family home, investment property, or commercial space, our team of experienced real estate agents is here to guide you every step of the way. We utilize advanced marketing strategies, cutting-edge listing tools, and a vast network of buyers to ensure your property reaches the right audience and achieves the highest possible sale price.
          </p>
          <p className="mb-4 text-gray-600">
            <strong className="text-blue-600">Buy Your Dream Home:</strong> Navigating the real estate market can be daunting, but our team of knowledgeable and dedicated agents are here to make the process smooth and stress-free. From conducting comprehensive market research to negotiating the best possible terms, we're committed to helping you find the perfect property that fits your lifestyle and budget.
          </p>
          <p className="mb-4 text-gray-600">
            <strong className="text-blue-600">Invest in Real Estate:</strong> Real estate is one of the most reliable and lucrative investment opportunities available. Our team of investment specialists can provide you with in-depth market analysis, identify promising properties, and guide you through the entire investment process, ensuring you make informed decisions that maximize your returns.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Commitment to You</h2>
          <p className="mb-4 text-gray-600">
            At Smart Spaces, we believe that the real estate experience should be empowering, transparent, and tailored to your unique needs. That's why we've invested in cutting-edge technology, fostered a culture of innovation, and assembled a team of the industry's best and brightest. We're dedicated to providing you with the resources, support, and guidance you need to achieve your real estate goals, whether you're buying, selling, or investing.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
          <p className="mb-4 text-gray-600">Ready to take the next step in your real estate journey? Reach out to our team today at <a href="mailto:info@smartspaces.com" className="text-blue-500">info@smartspaces.com</a> or <span className="font-bold">123-456-7890</span>. We're here to help you unlock the full potential of your real estate opportunities.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
