let health = 100;
let commute_distance; // asked for in the beginning
let health_lost_per_mile = Math.round(commute_distance / 20)
let health_regenerate_amount = 5; 

// each ice cube represents 20 health

function end_of_day_update(miles_driven){
	health += health_regenerate_amount
	// ice animation
	health -= health_lost_per_mile * miles_driven
	// ice animation
}

