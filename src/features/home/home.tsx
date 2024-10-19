import React, { useEffect } from 'react';
import {
  ShoppingCart,
  ChevronRight,
  Star,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import bannerImage from '../../assets/ca_koi_nhat_8-min.jpg';
import saleImage from '../../assets/ca-koi-sanke1-1.jpg';
import aboutImage from '../../assets/about_us.jpg';

const products = [
  {
    id: 1,
    name: 'Kohaku Koi',
    price: 1000000,
    image: saleImage,
  },
  {
    id: 2,
    name: 'Showa Koi',
    price: 1500000,
    image: saleImage,
  },
  {
    id: 3,
    name: 'Sanke Koi',
    price: 1200000,
    image: saleImage,
  },
  {
    id: 4,
    name: 'Taisho Sanshoku',
    price: 1800000,
    image: saleImage,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    content: 'The Koi fish here are beautiful and of high quality!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    content: "Excellent customer service, I'm very satisfied.",
    rating: 4,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    content: "I've bought fish here many times, always guaranteed quality.",
    rating: 5,
  },
];

const HomePage: React.FC = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <section
          id="home"
          className="relative bg-cover bg-center flex items-center h-[calc(100vh-96px)]"
          style={{ backgroundImage: `url(${bannerImage})` }} // Use the imported banner image
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-4 z-10 text-white">
            <h2 className="text-5xl font-bold mb-4">
              Discover the Beauty of Koi Fish
            </h2>
            <p className="text-xl mb-8">
              Where you'll find the most beautiful and highest quality Koi fish
            </p>
            <a
              href="#products"
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors inline-flex items-center"
            >
              View Products <ChevronRight className="ml-2" />
            </a>
          </div>
        </section>

        <section id="products" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-semibold mb-10 text-center">
              Featured Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {product.price.toLocaleString('en-US')} VND
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors w-full flex items-center justify-center">
                      <ShoppingCart className="mr-2" size={20} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <img
                  src={aboutImage}
                  alt="About Us"
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
              <div className="md:w-1/2 md:pl-10">
                <h3 className="text-3xl font-semibold mb-6">About Us</h3>
                <p className="text-gray-700 mb-6">
                  We are experts in the field of Koi fish with over 20 years of
                  experience. We are committed to providing our customers with
                  the most beautiful, healthiest Koi fish, carefully cared for
                  from reputable farms in Japan.
                </p>
                <ul className="text-gray-700">
                  <li className="mb-2 flex items-center">
                    <ChevronRight className="mr-2 text-blue-500" /> High-quality
                    Koi fish
                  </li>
                  <li className="mb-2 flex items-center">
                    <ChevronRight className="mr-2 text-blue-500" /> Dedicated
                    customer care service
                  </li>
                  <li className="mb-2 flex items-center">
                    <ChevronRight className="mr-2 text-blue-500" /> Professional
                    consultation
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 text-blue-500" /> Warranty and
                    after-sales support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-semibold mb-10 text-center">
              What Our Customers Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-current"
                        size={20}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-semibold mb-10 text-center">
              Contact Us
            </h3>
            <div className="flex flex-col md:flex-row md:space-x-10">
              <div className="md:w-1/2 flex flex-col justify-between">
                <form className="space-y-4 flex-grow">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-1 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </form>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors mt-4"
                >
                  Send Message
                </button>
              </div>
              <div className="md:w-1/2 md:pl-10 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-semibold mb-4">
                    Contact Information
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Mail className="mr-4 text-blue-500" />
                      <span>info@koifishstore.com</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="mr-4 text-blue-500" />
                      <span>+84 123 456 789</span>
                    </li>
                    <li className="flex items-center">
                      <MapPin className="mr-4 text-blue-500" />
                      <span>
                        123 ABC Street, XYZ District, Ho Chi Minh City
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.137488374634!2d106.69714931533492!3d10.77565899232164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292920b1b1b1%3A0x1b1b1b1b1b1b1b1b!2s123%20ABC%20Street%2C%20XYZ%20District%2C%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1616161616161!5m2!1sen!2s"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="rounded-lg shadow-md w-full h-64"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
