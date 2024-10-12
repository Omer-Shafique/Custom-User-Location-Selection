body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.info-button {
  background-color: #f0f0f0; /* Background color */
  border: 1px solid #ddd; /* Border color */
  padding: 10px; /* Padding */
  border-radius: 5px; /* Rounded corners */
  text-align: left; /* Align text to the left */
  margin-top: 15px; /* Space above the button */
  font-size: 10px; /* Font size */
  color: #333; /* Text color */
  width: 100%; /* Full width */
  display: flex; /* Flexbox to align items */
  align-items: center; /* Center items vertically */
}

.info-button .info-icon {
  color: #2683ff; /* Blue color */
  margin-right: 10px; /* Space between icon and text */
  font-size: 15px; /* Icon size */
}

.dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown-container .icon-right {
  margin-left: 10px; /* Space between input and icon */
  font-size: 16px; /* Adjust size as needed */
  color: #333; /* Adjust color as needed */
  cursor: pointer; /* Change cursor to pointer to indicate clickability */
}

.leaflet-control-zoom {
  display: none;
}
/* Pop-up Overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Pop-up Content Box */
.popup-content {
  background-color: white;
  width: 400px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  position: relative;
  margin: 0; /* Ensure no extra margin */
}

/* Pop-up Title */
h5 {
  text-align: center;
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 20px 0; /* Adjust margin */
}

/* Form Container */
.form-container {
  margin-bottom: 20px;
}

.dropdown-container {
  position: relative; /* Ensure the container is positioned relative */
  display: flex;
  flex-direction: column; /* Ensure the dropdown is positioned below the input */
}

/* Dropdown input styling */
.dropdown-search {
  width: 100%;
  padding: 10px 40px 10px 10px; /* Adjusted for icon padding on the right */
  border: 2px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  color: #333;
}

#city-search {
  margin-bottom: 5px;
}

.dropdown-content {
  position: absolute; /* Position dropdown relative to container */
  top: 100%; /* Position dropdown below the input */
  left: 0;
  width: 100%; /* Match width of the input */
  max-height: 200px; /* Optional: Set a max height to allow scrolling if needed */
  overflow-y: auto; /* Add scrolling if the content overflows */
  background-color: #fff; /* Background color of the dropdown */
  border: 1px solid #ddd; /* Border around the dropdown */
  z-index: 1000; /* Ensure it appears above other content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for better visibility */
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.dropdown-item:hover {
  background-color: #f0f0f0; /* Highlight item on hover */
}

/* Placeholder text styling */
.dropdown-search::placeholder {
  color: #999;
  font-size: 16px;
}

/* Input focus effect */
.dropdown-search:focus {
  border-color: #ff4b4b; /* Match the red color from the button */
  outline: none;
  box-shadow: 0 0 5px rgba(255, 75, 75, 0.5); /* Optional shadow */
}

/* Map styling */
#map {
  height: 200px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

/* Confirm button styling */
.confirm-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #004eb5;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-btn:hover {
  background-color: #003b8a;
}

/* Icons inside input fields */
.icon-right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  cursor: pointer;
}

/* Dropdown arrow rotation effect */
.icon-right.dropdown-arrow.open {
  transform: translateY(-50%) rotate(180deg);
  transition: transform 0.3s ease-in-out;
}

.icon-right.dropdown-arrow {
  transition: transform 0.3s ease-in-out;
}

.popup-image {
  width: 100px;
  height: 50px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 20px 0; /* Adjust margin */
}

.show {
  display: block;
}

/* Leaflet CSS */
.leaflet-control-attribution {
  display: none;
}

/* Additional styles if needed */
.city-selector {
  width: 200px;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 6px;
  padding: 10px;
  border: 1px solid #b0bec5;
  font-size: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.city-selector option {
  padding: 10px;
}

.city-selector:focus {
  border-color: #4a90e2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
}

.city-selector::placeholder {
  color: #999;
}

/* Scrollbars styling */
#area-selector::-webkit-scrollbar {
  width: 4px;
}

#area-selector::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

#area-selector::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.scrollbar-width {
  scrollbar-width: thin;
}

.scrollbar-color {
  scrollbar-color: #888 #f1f1f1;
}

/* Target the WebKit scrollbar for both area and city selector dropdowns */
#area-dropdown::-webkit-scrollbar,
#city-dropdown::-webkit-scrollbar {
  width: 8px; /* Decrease the width of the scrollbar */
}

/* Style the scrollbar track */
#area-dropdown::-webkit-scrollbar-track,
#city-dropdown::-webkit-scrollbar-track {
  background: #f0f0f0; /* Light grey background */
  border-radius: 10px; /* Rounded corners */
}

/* Style the scrollbar thumb */
#area-dropdown::-webkit-scrollbar-thumb,
#city-dropdown::-webkit-scrollbar-thumb {
  background-color: #888; /* Darker grey for the thumb */
  border-radius: 10px; /* Rounded corners */
  border: 2px solid #f0f0f0; /* Creates a space around the thumb */
}

/* Style the scrollbar thumb on hover */
#area-dropdown::-webkit-scrollbar-thumb:hover,
#city-dropdown::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Darker grey on hover */
}
