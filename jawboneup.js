/****************************************************
Jawbone UP Plugin For SARAH
Author: Karim PINCHON
Date: 31/08/2014
File: jawboneup.js
 
Use Jawbone UP API Node.js Client from ryanseys
https://github.com/ryanseys/node-jawbone-up
*****************************************************/

exports.action = function(data, callback, config, SARAH){

	if (!config.modules.jawboneup.access_token){
		console.log("Required jawbone's config missing : access_token");
		callback({ 'tts': "La configuration est incomplète." });
		return;
	}

	//get cfg
	var options = {
		access_token:  config.modules.jawboneup.access_token, // REQUIRED
		client_secret: config.modules.jawboneup.client_secret // OPTIONAL
	}
	
	up = require('./lib/jawbone_up_client.js')(options);
	
	up.moves.get({}, function(err, body){
		if(err) {
			console.log('Error: ' + err);
		}
		else {
			var resp = JSON.parse(body).data;
		
			today_steps = resp.items[0].details.steps;
			today_km = resp.items[0].details.km;
			today_distance = resp.items[0].details.distance;
			today_active_time = resp.items[0].details.active_time;
			today_inactive_time = resp.items[0].details.inactive_time;
			today_by_hour = resp.items[0].details.hourly_totals;
			var today_most_active_hour_and_steps = getMostActiveHour(today_by_hour);
			today_most_active_hour = today_most_active_hour_and_steps.max_steps_hour;
			today_most_active_hour_steps = today_most_active_hour_and_steps.max_steps;
			
			switch(data.jawboneup) {
				case 'steps':
					callback({ 'tts': "Tu as fait " + today_steps + " pas aujourd'hui." });
					break;
				case 'distance':
					callback({ 'tts': "Tu as parcouru " + today_distance + " maitres aujourd'hui." });
					break;
				case 'km':
					callback({ 'tts': "Tu as parcouru " + today_km + " kilaumaitres aujourd'hui." });
					break;
				case 'mostActiveHour':
					callback({ 'tts': "Tu as été le plus actif entre " + today_most_active_hour + " heures et " + eval(parseInt(today_most_active_hour) + 1) + " heures, avec un total de " + today_most_active_hour_steps + " pas." });
					break;
				case 'toGoal':
					if(today_steps_remaining > 0){
						msg = "Tu dois encore faire " + today_steps_remaining + " pas, pour atteindre ton objectif.";
					} else {
						msg = "Félicitation, tu as atteint ton objectif.";
					}
					callback({ 'tts': msg });
					break;
				default:
					break;
			}
		}
	});
	
	up.goals.get({}, function(err, body){
		if(err) {
			console.log('Error: ' + err);
		}
		else {
			var resp = JSON.parse(body).data;
			
			today_steps_remaining = resp.remaining_for_day.move_steps_remaining;
			
			switch(data.jawboneup) {
				case 'toGoal':
					if(today_steps_remaining > 0){
						msg = "Tu dois encore faire " + today_steps_remaining + " pas, pour atteindre ton objectif.";
					} else {
						msg = "Félicitation, tu as atteint ton objectif.";
					}
					callback({ 'tts': msg });
					break;
				default:
					break;
			}
		}
	});
}

/**
 * return : an array with the most active hour and number of steps
 */
function getMostActiveHour(today_by_hour){

	var nb_elem = today_by_hour.length;
	var max_steps = 0;
	var max_steps_hour = 0;

	for(var key in today_by_hour){
		if(today_by_hour[key].steps > max_steps){
			max_steps_hour = extractHour(key);
			max_steps = today_by_hour[key].steps;
		}
	}
	return {max_steps : max_steps, max_steps_hour : max_steps_hour};
}

/**
 * return : hour (pattern hh) from datetime string like YYYYMMDDhh
 */
function extractHour(date){
	var t = date.split("");
	var last = t.pop();
	var lastm1 = t.pop();
	
	return lastm1.concat(last);
}