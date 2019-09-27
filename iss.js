// It will contain most of the logic for fetching the data from each API endpoint.

const request = require('request');




/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {

  request("https://api.ipify.org/?format=json", (error, response, body) => {

    const data = JSON.parse(body);
    console.log(data);
    if (error) {
      callback(error,null);
      return;

    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
  
    } else {

      callback(null,data.ip);
    }

  });
};

const fetchCoordsByIP = (ip, callback) => {

  request("https://ipvigilante.com/8.8.8.8", (error, response, body) =>{
    const data = JSON.parse(body);
    // console.log(data)
  
    if (error) {
      callback(error,null);
    
    } else if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {

      callback(null, data);
    }
  
  });
};

const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.data.latitude}&lon=${coordinates.data.longitude}`,(error, response,body)=> {
    const data = JSON.parse(body);
    console.log(data);
    if (error) {
      callback(error , null);

    } else if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {

      callback(null, data);

    }
  });

};



module.exports = { fetchCoordsByIP, fetchMyIP, fetchISSFlyOverTimes };

// make sure you are exporting as an object and not overwriting the module

