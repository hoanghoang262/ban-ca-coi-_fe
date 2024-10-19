import { Fish, Users, Award, Leaf } from 'lucide-react';
import koiImage from '../../assets/koi-koi-about-us.webp';

export default function AboutUs() {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Koi Expert',
      image: '/placeholder.svg?height=300&width=300&text=John',
    },
    {
      name: 'Jane Smith',
      role: 'Aquaculture Specialist',
      image: '/placeholder.svg?height=300&width=300&text=Jane',
    },
    {
      name: 'Mike Johnson',
      role: 'Customer Care Manager',
      image: '/placeholder.svg?height=300&width=300&text=Mike',
    },
    {
      name: 'Emily Brown',
      role: 'Pond Design Consultant',
      image: '/placeholder.svg?height=300&width=300&text=Emily',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 sm:text-5xl">
            About FishMart
          </h2>
          <p className="mt-4 text-xl text-blue-600">
            Discover the beauty and serenity of Koi fish with us
          </p>
        </div>

        <section className="mt-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="relative">
              <img
                src={koiImage}
                alt="Beautiful Koi Pond"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 rounded-2xl"></div>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-3xl font-bold text-blue-900 mb-4">
                Our Passion for Koi Logistics
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                At FishMart, we've dedicated over two decades to the logistics
                of Koi breeding and care. Our journey began with a small pond
                and a handful of colorful Koi, evolving into a thriving business
                that shares the magic of these living jewels with enthusiasts
                worldwide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We take pride in offering only the finest quality Koi, carefully
                selected from reputable Japanese breeders. Our team of experts
                ensures that each fish meets our stringent standards,
                guaranteeing that our customers receive healthy, vibrant Koi
                that will bring joy and tranquility to their ponds for years to
                come.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { icon: Fish, text: 'Premium Koi Selection' },
                  { icon: Users, text: 'Expert Guidance' },
                  { icon: Award, text: '20+ Years Experience' },
                  { icon: Leaf, text: 'Sustainable Practices' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <item.icon className="h-8 w-8 text-blue-500 mr-3" />
                    <span className="text-gray-800 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <h3 className="text-3xl font-bold text-blue-900 text-center mb-16">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-gradient-to-b from-blue-50 to-white">
                  <h4 className="text-xl font-semibold text-blue-900">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 mt-2">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-16 max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-extrabold text-white mb-6">
              Ready to start your Koi journey?
            </h3>
            <p className="mt-4 text-xl text-blue-100 leading-relaxed">
              Let us help you create your own slice of paradise with our expert
              advice and premium Koi selection.
            </p>
            <a
              href="#"
              className="mt-10 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold inline-block transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Contact Us Today
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
