<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pop-Up Demo with Draggable Marker and City Selector</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

        .leaflet-control-attribution {
          display: none;
        }
      /* General body styling */
      body {
        font-family: 'Roboto', sans-serif;
        background-color: #f0f0f0;
        overflow: hidden; /* Prevent scroll when popup is open */
      }

      /* Popup overlay styling */
      .popup-overlay {
        background-color: rgba(0, 0, 0, 0.9); /* Darker semi-transparent background */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(6px) brightness(0.7); /* Adjusted blur and brightness for darker effect */
        animation: overlayFadeIn 0.5s ease-in-out;
        transition: backdrop-filter 0.3s ease;
      }

      @keyframes overlayFadeIn {
        from {
          opacity: 0;
          backdrop-filter: blur(0px) brightness(1);
        }
        to {
          opacity: 1;
          backdrop-filter: blur(6px) brightness(0.7);
        }
      }

      .popup-overlay:hover {
        backdrop-filter: blur(8px) brightness(0.6); /* Slightly darker and more blurred on hover */
      }

      .popup-overlay::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.8)); /* Darker vignette effect */
        z-index: 999;
        pointer-events: none;
      }

      /* Popup content styling */
      .popup-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 16px;
        width: 90%;
        max-width: 420px;
        min-height: 150px;
        text-align: center;
        box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3); /* Deeper shadow for a floating effect */
        border: 1px solid #ddd; /* Slightly lighter border for subtlety */
        position: relative;
        z-index: 1010;
        animation: fadeIn 0.4s ease-in-out;
        transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions for hover effects */
      }

      /* Smooth fade-in animation */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.9); /* Slight zoom-in effect on appearance */
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      /* Hover effect to enhance interactivity */
      .popup-content:hover {
        transform: translateY(-5px); /* Subtle lift on hover */
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35); /* Increased shadow depth on hover */
      }

      /* Gradient border for a modern look */
      .popup-content::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 18px;
        background: linear-gradient(135deg, #ff7e5f, #feb47b); /* Gradient border */
        z-index: -1; /* Behind the content */
        opacity: 0;
        transition: opacity 0.4s ease;
      }

      /* Heading styles */
      h5 {
        color: #333; /* Darker color for better readability */
        padding-top: 30px;
        font-size: 18px; /* Larger font size for visibility */
        font-weight: 700; /* Bold weight */
        text-align: center;
        text-transform: none;
        letter-spacing: 0.5px;
        font-family: 'Roboto', sans-serif;
        background: none;
        border: none;
        box-shadow: none;
        text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1); /* Light text shadow */
        transition: color 0.3s ease, transform 0.3s ease; /* Smooth transitions */
        position: relative;
      }

      h5:hover {
        color: #ff6f61; /* Color change on hover */
        transform: scale(1.03); /* Slight zoom effect */
      }

      /* Form container styles */
      .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-top: 15px;
      }

      /* City Selector */
      .city-selector {
        padding: 12px 16px;
        border-radius: 12px;
        border: 1px solid #b0bec5;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        outline: none;
        width: 100%;
        max-width: 300px;
      }

      /* Search Bar Container */
      .search-bar-container {
        position: relative;
        width: 100%;
        max-width: 300px;
      }

      /* Search Bar */
      .search-bar {
        padding: 12px 16px 12px 36px; /* Add padding for the search icon */
        border-radius: 12px;
        border: 1px solid #b0bec5;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        outline: none;
        width: 100%;
        height: 60px;
      }

      /* Focused state for inputs */
      .city-selector:focus,
      .search-bar:focus {
        border-color: #4a90e2;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        background-color: #f9f9f9;
      }

      /* Placeholder styles */
      .city-selector::placeholder,
      .search-bar::placeholder {
        color: #999;
        opacity: 1;
      }

      /* Map container styling */
      #map {
        height: 200px; /* Reduced height for smaller map */
        border-radius: 8px;
        margin-top: 15px;
        z-index: 1005;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      /* Hover effect for the map */
      #map:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        transform: scale(1.02);
      }

      /* Responsive styling for the map */
      @media (max-width: 768px) {
        #map {
          height: 180px; /* Adjusted for smaller screens */
        }
      }

      @media (max-width: 480px) {
        #map {
          height: 150px; /* Further reduction for very small screens */
          margin-top: 10px;
        }
      }

      /* Address display styling */
      #address {
        margin-top: 15px;
        font-size: 16px;
        color: #444;
        z-index: 1050;
        font-weight: 500;
      }

      /* Suggestions container */
      .suggestions {
        position: absolute;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1055;
        width: calc(100% - 30px);
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transition: box-shadow 0.2s ease;
      }

      /* Suggestion item styling */
      .suggestion-item {
        padding: 12px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.2s ease, color 0.2s ease;
      }

      .suggestion-item:hover {
        background-color: #f9f9f9;
        color: #007bff;
      }

      /* Confirm button styling */
      .confirm-btn {
        margin-top: 20px;
        padding: 12px 24px; /* Adjusted padding for better fit */
        background-color: #ff7404;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 18px;
        transition: background-color 0.3s ease, transform 0.2s ease;
      }

      .confirm-btn:hover {
        background-color: #ff2e04;
        transform: scale(1.02);
      }

      /* Responsive styles for the popup */
      @media (max-width: 768px) {
        .popup-content {
          width: 90%;
          max-width: 400px;
        }

        h5 {
          font-size: 20px;
        }

        .search-bar-container {
          flex-direction: column;
        }
      }

      @media (max-width: 480px) {
        .popup-content {
          width: 95%;
          max-width: 350px;
          padding: 15px;
        }

        h5 {
          font-size: 18px;
        }

        .confirm-btn {
          padding: 12px 20px;
          font-size: 16px;
        }

        .city-selector,
        .search-bar {
          font-size: 14px;
        }

        .suggestions {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div id="popup" style="display: none;">
      <div class="popup-overlay">
        <div class="popup-content">
          <h5 style="text-align: center; color: #080808; font-size: 24px; font-weight: bold; margin-top: 20px;">
            SELECT YOUR LOCATION
          </h5>

          <div class="form-container">
            <select id="city-selector" class="city-selector">
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
              <option value="faisalabad">Faisalabad</option>
              <option value="multan">Multan</option>
              <option value="bahawalpur">Bahawalpur</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="other">Other</option>
            </select>

            <div class="search-bar-container">
              <input type="text" id="search" class="search-bar" placeholder="Search for a location...">
              <div id="suggestions" class="suggestions"></div>
            </div>
          </div>

          <div id="map"></div>
          <!-- <div id="address">Your Address will be displayed here.</div> -->
          <button id="confirm-location" class="confirm-btn">Confirm</button>
        </div>
      </div>
    </div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
  window.onload = function() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';

    var cityBounds = {
      karachi: [[24.85, 66.85], [25.05, 67.2]],
      lahore: [[31.45, 74.2], [31.65, 74.4]],
      islamabad: [[33.65, 72.9], [33.85, 73.2]],
      faisalabad: [[31.35, 73], [31.55, 73.25]],
      multan: [[30.15, 71.35], [30.35, 71.55]],
      bahawalpur: [[29.35, 71.45], [29.65, 71.85]],
      hyderabad: [[25.25, 68.25], [25.45, 68.55]],
    };

    var map = L.map('map').setView([24.8607, 67.0011], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var marker = L.marker([24.8607, 67.0011], { draggable: true }).addTo(map);

    function updateCenterMarker() {
      var center = map.getCenter();
      marker.setLatLng(center);
      updateAddress(center.lat, center.lng);
    }

    updateCenterMarker(); // Initial update

    map.on('move', updateCenterMarker);

    function updateAddress(lat, lng) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
        .then(response => response.json())
        .then(data => {
          const address = data.results[0]?.formatted || 'Address not found';
          document.getElementById('address').textContent = address;
        })
        .catch(error => {
          console.error('Error fetching address:', error);
          document.getElementById('address').textContent = 'Address not found';
        });
    }

function showCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      map.setView([lat, lng], 14);
      marker.setLatLng([lat, lng]);
      updateAddress(lat, lng);
    }, function(error) {
      console.error('Error getting location:', error);
      // Fallback to a default location if there's an error
      var defaultLat = 24.8607;
      var defaultLng = 67.0011;
      map.setView([defaultLat, defaultLng], 14);
      marker.setLatLng([defaultLat, defaultLng]);
      updateAddress(defaultLat, defaultLng);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}


    showCurrentLocation();

    map.on('click', function(e) {
      var latlng = e.latlng;
      marker.setLatLng(latlng);
      updateAddress(latlng.lat, latlng.lng);
    });

    marker.on('dragend', function() {
      var latlng = marker.getLatLng();
      updateAddress(latlng.lat, latlng.lng);
    });

    document.getElementById('city-selector').addEventListener('change', function(event) {
      var selectedCity = event.target.value;

      if (cityBounds[selectedCity]) {
        var bounds = cityBounds[selectedCity];
        map.fitBounds(bounds);
        var center = map.getCenter();
        marker.setLatLng(center);
        updateAddress(center.lat, center.lng);
      } else {
        map.setView([24.8607, 67.0011], 5);
        marker.setLatLng([24.8607, 67.0011]);
        updateAddress(24.8607, 67.0011);
      }
    });

    document.getElementById('search').addEventListener('input', function() {
      var query = this.value;
      var city = document.getElementById('city-selector').value;

      if (query.length > 2) {
        var searchUrl = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=6c388253997947db9106c2ce0347c84d`;
        // var searchUrl = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5&countrycodes=pk`;

        fetch(searchUrl)
          .then(response => response.json())
          .then(data => {
            var suggestionsElement = document.getElementById('suggestions');
            suggestionsElement.innerHTML = '';

            if (data.results.length > 0) {
              let resultsFound = false;

              data.results.forEach(result => {
                var suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerText = result.formatted;

                var resultCity = result.components.city || result.components.town || result.components.village || '';

                if (
                  city === 'other' || 
                  resultCity.toLowerCase() === city.toLowerCase() || 
                  result.formatted.toLowerCase().includes(city.toLowerCase())
                ) {
                  resultsFound = true;

                  suggestionItem.addEventListener('click', function() {
                    var lat = result.geometry.lat;
                    var lon = result.geometry.lng;
                    map.setView([lat, lon], 14);
                    marker.setLatLng([lat, lon]);
                    updateAddress(lat, lon);

                    suggestionsElement.innerHTML = '';
                    document.getElementById('search').value = result.formatted;
                  });

                  suggestionsElement.appendChild(suggestionItem);
                }
              });

              if (!resultsFound) {
                // suggestionsElement.innerHTML = '<div class="suggestion-item">No results found</div>';
              }
            } else {
              // suggestionsElement.innerHTML = '<div class="suggestion-item">No results found</div>';
            }
          })
          .catch(err => {
            console.error('Error fetching search results:', err);
          });
      }
    });


document.getElementById('confirm-location').addEventListener('click', function() {
  var latlng = marker.getLatLng();
  console.log('Confirm button clicked');
  console.log('Lat:', latlng.lat, 'Lng:', latlng.lng);

  // Save location to local storage
  localStorage.setItem('selectedLocation', JSON.stringify({ lat: latlng.lat, lng: latlng.lng }));

  // Update cart notes with location data
  fetch('/cart/update.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: `${latlng.lat},${latlng.lng}` })
  })
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Location added to cart notes:', data);
    if (data && data.note) {
      var referrer = document.referrer;
      console.log('Referrer:', referrer);

      if (referrer.includes('katib.pk/cart')) {
        window.location.href = 'https://katib.pk/cart';
      } else if (referrer.includes('katib.pk/products/')) {
        var parts = referrer.split('katib.pk/products/');
        var productId = parts.length > 1 ? parts[1].split('/')[0] : null;

        if (productId) {
          window.location.href = 'https://katib.pk/products/' + productId;
        } else {
          window.location.href = 'https://katib.pk/';
        }
      }
    } else {
      alert('Failed to add location to cart notes.');
    }
    popup.style.display = 'none';
  })
  .catch(error => {
    console.error('Error adding location to cart notes:', error);
  });
});

  };


// document.getElementById('confirm-location').addEventListener('click', function() {
//     var latlng = marker.getLatLng();
//     console.log('Confirm button clicked');
//     console.log('Lat:', latlng.lat, 'Lng:', latlng.lng);

//     // Save location to local storage
//     localStorage.setItem('selectedLocation', JSON.stringify({ lat: latlng.lat, lng: latlng.lng }));

//     // Update cart notes with location data
//     fetch('/cart/update.js', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ note: `${latlng.lat},${latlng.lng}` })
//     })
//     .then(response => {
//         console.log('Response status:', response.status);
//         return response.json();
//     })
//     .then(data => {
//         console.log('Location added to cart notes:', data);
//         if (data && data.note) {
//             // Extract the checkout URL from the referrer
//             var referrer = document.referrer;
//             console.log('Referrer:', referrer);

//             if (referrer.includes('katib.pk/checkouts/')) {
//                 // Redirect to the exact checkout URL including the identifier
//                 window.location.href = referrer;
//             } else {
//                 // Fallback to a general checkout URL if referrer doesn't include checkout path
//                 window.location.href = 'https://katib.pk/checkouts';
//             }
//         } else {
//             alert('Failed to add location to cart notes.');
//         }
//         popup.style.display = 'none';
//     })
//     .catch(error => {
//         console.error('Error adding location to cart notes:', error);
//     });
// });
    </script>
  </body>
</html>
