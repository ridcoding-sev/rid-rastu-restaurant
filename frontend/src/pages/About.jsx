import React from "react";
import { assets } from "../assets/asset";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div>
            <span className="text-orange-500 font-semibold uppercase tracking-widest">
              Welcome To Our Store
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mt-5 leading-tight">
              We Deliver Fresh & Quality Food With Love
            </h1>

            <p className="text-gray-600 text-lg mt-8 leading-8">
              Our mission is to bring fresh and delicious food to every home. We
              believe that quality ingredients and excellent service create
              unforgettable experiences for our customers. Every order is
              prepared with care and delivered quickly to ensure maximum
              satisfaction.
            </p>

            <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg">
              Explore More
            </button>
          </div>

          {/* Right Side */}
          <div>
            <img
              src={assets.About1}
              alt="About"
              className="rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-orange-500 mb-5">
              Fresh Ingredients
            </h3>

            <p className="text-gray-600 leading-8">
              We carefully select high-quality ingredients to ensure freshness
              and provide healthy and delicious meals.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-orange-500 mb-5">
              Fast Delivery
            </h3>

            <p className="text-gray-600 leading-8">
              Our efficient delivery system ensures your food reaches your
              doorstep quickly and safely.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-orange-500 mb-5">
              Best Quality
            </h3>

            <p className="text-gray-600 leading-8">
              Customer satisfaction is our priority. We always maintain high
              standards in taste and service.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">Our Story</h2>

          <p className="text-gray-600 text-lg leading-9">
            Started with a passion for providing exceptional food experiences,
            our journey has been driven by dedication and customer trust. Over
            the years, we have served thousands of happy customers and continue
            to improve every day. We believe food is not just about eating; it
            is about creating memories and bringing people together.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-orange-500 text-white p-10 rounded-3xl text-center shadow-xl">
            <h1 className="text-5xl font-bold">10K+</h1>
            <p className="mt-3 text-lg">Happy Customers</p>
          </div>

          <div className="bg-white p-10 rounded-3xl text-center shadow-xl">
            <h1 className="text-5xl font-bold text-orange-500">500+</h1>
            <p className="mt-3 text-lg text-gray-600">Food Items</p>
          </div>

          <div className="bg-white p-10 rounded-3xl text-center shadow-xl">
            <h1 className="text-5xl font-bold text-orange-500">50+</h1>
            <p className="mt-3 text-lg text-gray-600">Professional Chefs</p>
          </div>

          <div className="bg-white p-10 rounded-3xl text-center shadow-xl">
            <h1 className="text-5xl font-bold text-orange-500">24/7</h1>
            <p className="mt-3 text-lg text-gray-600">Support Service</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={assets.About2}
              alt=""
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-8">
              More Than 10 Years Of Experience
            </h2>

            <p className="text-gray-600 text-lg leading-9 mb-8">
              We have been serving thousands of customers with passion and
              dedication. Our commitment to quality and customer satisfaction
              has made us one of the most trusted food delivery services.
            </p>

            <div className="space-y-6">
              <div className="bg-orange-50 p-6 rounded-2xl shadow">
                <h3 className="text-2xl font-bold text-orange-500">
                  Premium Quality
                </h3>

                <p className="text-gray-600 mt-3">
                  We maintain the highest quality standards for every order.
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-2xl shadow">
                <h3 className="text-2xl font-bold text-orange-500">
                  Professional Team
                </h3>

                <p className="text-gray-600 mt-3">
                  Our team works day and night to deliver happiness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-8">
              Our Mission & Vision
            </h2>

            <p className="text-gray-600 text-lg leading-9">
              Our mission is to provide healthy, fresh and delicious meals to
              every customer. We believe that food brings people together and
              creates unforgettable moments.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h3 className="text-3xl font-bold text-orange-500">Mission</h3>

                <p className="mt-4 text-gray-600">
                  Delivering happiness through quality food and excellent
                  service.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h3 className="text-3xl font-bold text-orange-500">Vision</h3>

                <p className="mt-4 text-gray-600">
                  Becoming the most loved and trusted food brand.
                </p>
              </div>
            </div>
          </div>

          <div>
            <img
              src={assets.About3}
              alt=""
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Customer Review */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-20">
            What Our Customers Say
          </h1>

<div className="grid md:grid-cols-3 gap-10">

  {/* Card 1 */}
  <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:-translate-y-2 duration-300">

    <div className="flex items-center gap-4 mb-6">
      <img
        src={assets.client1}
        alt="client"
        className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
      />

      <div>
        <h2 className="text-xl font-bold text-gray-800">
          John Smith
        </h2>
        <p className="text-sm text-orange-500">Happy Customer</p>
      </div>
    </div>

    <p className="text-gray-600 leading-8">
      Amazing food quality and very fast delivery. I always order from
      here.
    </p>

    <div className="text-orange-400 mt-6 text-lg">
      ★★★★★
    </div>

  </div>

  {/* Card 2 */}
  <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:-translate-y-2 duration-300">

    <div className="flex items-center gap-4 mb-6">
      <img
        src={assets.client2}
        alt="client"
        className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
      />

      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Sarah Wilson
        </h2>
        <p className="text-sm text-orange-500">Food Lover</p>
      </div>
    </div>

    <p className="text-gray-600 leading-8">
      Excellent service and delicious meals. Highly recommended.
    </p>

    <div className="text-orange-400 mt-6 text-lg">
      ★★★★★
    </div>

  </div>

  {/* Card 3 */}
  <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:-translate-y-2 duration-300">

    <div className="flex items-center gap-4 mb-6">
      <img
        src={assets.client3}
        alt="client"
        className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
      />

      <div>
        <h2 className="text-xl font-bold text-gray-800">
          David Brown
        </h2>
        <p className="text-sm text-orange-500">Regular Customer</p>
      </div>
    </div>

    <p className="text-gray-600 leading-8">
      Fresh ingredients and beautiful packaging. Love this store.
    </p>

    <div className="text-orange-400 mt-6 text-lg">
      ★★★★★
    </div>

  </div>

</div>
        </div>
      </section>
    </div>
  );
};

export default About;
