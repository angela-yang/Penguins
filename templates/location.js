if ("geolocation" in navigator) {
  let previousPosition;
  let currentPosition;

  // Function to calculate and log velocity with error checking
  function calculateAndLogVelocity(previousPosition, currentPosition) {
    if (previousPosition && currentPosition) {
      try {
        const timeDifference = (currentPosition.timestamp - previousPosition.timestamp) / 1000; // Convert milliseconds to seconds
        timeDifference = timeDifference / 3600; // Converting seconds to hours
        const distanceDifference = calculateDistance(previousPosition.coords, currentPosition.coords);

        // Validate distance before calculating velocity
        if (distanceDifference > 0) {
          const velocity = distanceDifference / timeDifference;
          console.log("Average velocity:", velocity, "units/second");
        } else {
          console.warn("Distance calculation failed or resulted in non-positive value. Skipping velocity calculation.");
        }
      } catch (error) {
        console.error("Error during velocity calculation:", error);
      }
    }
  }

  function calculateDistance(previousCoords, currentCoords) {
    let pLongitude = previousCoords.longitude * Math.PI / 180;
    let pLatitude = previousCoords.latitude * Math.PI / 180;
    let cLongitude = currentCoords.longitude * Math.PI / 180;
    let cLatitude = currentCoords.latitude * Math.PI / 180;

    let dlon = cLongitude - pLongitude;
    let dlat = cLatitude - pLatitude;

    let a = Math.pow(Math.sin(dlat / 2), 2)
      + Math.cos(pLatitude) * Math.cos(cLatitude)
      * Math.pow(Math.sin(dlon / 2), 2);

    let distanceKm = 2 * Math.asin(Math.sqrt(a)) * 6378.1;
    let distanceMiles = distanceKm * 0.621371;

    return distanceMiles;
  }
  navigator.geolocation.watchPosition(
    function(position) {
      currentPosition = position;
      calculateAndLogVelocity(previousPosition, currentPosition); // this is the speed of the person
      previousPosition = position;
    },
    function(error) {
      console.error("Error getting user location:", error);
    },
    { enableHighAccuracy: true, maximumAge: 0 }
    // { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}
