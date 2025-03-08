import React from 'react';
import Navbar from './navbar';

const About = () => {
  return (
    <div className="bg-CA h-full min-h-screen text-gray-900">
      <div className="flex px-5 h-full">
        <Navbar />
        <div className="flex-1 h-full w-64 m-5 px-0 lg:px-5 mt-16 lg:mt-5">
          <h1 className="text-4xl font-bold mb-5">About</h1>

          {/* App Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">About the Weather App</h2>
            <p className="text-gray-800 text-lg">
            This application is designed to provide accurate and real-time weather 
            updates for cities around the world. Using the powerful OpenWeather API, 
            users can effortlessly check current weather conditions and plan their 
            activities accordingly.
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>🌦️ Real-time weather updates for any location</li>
              <li>📅 7-day weather forecasts</li>
              <li>🔍 Easy-to-use search functionality</li>
              <li>📊 Temperature, humidity, and wind speed tracking</li>
            </ul>
          </div>

          {/* Developer Information */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Developer</h2>
            <p className="text-gray-800">
              Created by <span className="font-bold">Steven Edward O. Montalvo</span>, This weather app showcases a 
              passion for blending technology with user-friendly design. 
              Built using React.js, Tailwind CSS, and the OpenWeather API. 
              It demonstrates expertise in modern web development.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              Have questions, feedback, or want to collaborate? Feel free to reach out!
            </p>
            <a
              href="https://github.com/Sykeszs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-900 hover:bg-white hover:text-blue-900 text-white py-2 px-4 rounded shadow"
            >
              Visit My GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
