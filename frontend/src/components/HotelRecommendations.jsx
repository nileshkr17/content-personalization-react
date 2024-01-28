import React, { useState, useEffect } from 'react';
import './hotel.css';

const HotelRecommendations = () => {
  const [hotelRecommendations, setHotelRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [totalPages, setTotalPages] = useState(1);

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
        setTotalPages(Math.ceil(data.hotels.length / itemsPerPage));

      } catch (error) {
        console.error('Error fetching hotel recommendations:', error);
      }
    };

    fetchHotelRecommendations();
  }, [itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hotelRecommendations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="hotel-recommendations">
      <h2>Hotel Recommendations</h2>
      <div className="hotel-list">
        {currentItems.length > 0 ? (
          currentItems.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <p className="hotel-id">Hotel ID: {hotel.property_id}</p>

              <h3 className="hotel-name">{hotel.property_name}</h3>
              <p className="hotel-rating">Star Rating: {hotel.hotel_star_rating}</p>
              <p> State: {hotel.state}</p>
              <p className="guest-recommendation">Guest Recommendation: {hotel.guest_recommendation}</p>
              <p className="hotel-description">Description: {hotel.hotel_description}</p>
            </div>
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default HotelRecommendations;
