import React, { useState, useEffect } from 'react';
import './hotel.css';

const HotelRecommendations = () => {
  const [hotelRecommendations, setHotelRecommendations] = useState([]);

  useEffect(() => {
    const fetchHotelRecommendations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/hotels', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hotel recommendations');
        }

        const data = await response.json();
        setHotelRecommendations(data.hotels);

      } catch (error) {
        console.error('Error fetching hotel recommendations:', error);
      }
    };

    fetchHotelRecommendations();
  }, []);

  return (
    <div className="hotel-recommendations">
      <h2>Hotel Recommendations</h2>
      <div className="hotel-list">
        {hotelRecommendations.length > 0 ? (
          hotelRecommendations.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <h3 className="hotel-name">{hotel.property_name}</h3>
              <p className="hotel-rating">Star Rating: {hotel.hotel_star_rating}</p>
              <p className="guest-recommendation">Guest Recommendation: {hotel.guest_recommendation}</p>
              <p className="hotel-description">Description: {hotel.hotel_description}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HotelRecommendations;
