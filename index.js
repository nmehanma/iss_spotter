// It will require and run our main fetch function.

//index.js

const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes}  = require('./iss');



fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);

  // it is using the ip parameter to invoke the fetchCoordsByIP fx
    
  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log('It worked! Returned Coordinates:' , coordinates.data.latitude + " " + coordinates.data.longitude);

    fetchISSFlyOverTimes(coordinates, (error, Nasa)=> {
      if (error) {
        console.log("It didn't work!", error);
        return;
    
      }
      console.log('It worked! Returned Nasa Coordinates:', Nasa.response);
    });
  });



  

});


// const { nextISSTimesForMyLocation } = require('./iss');

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   console.log(passTimes);
// });


