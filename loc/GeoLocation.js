$(document).ready(function () {	getLocation();	});

function supportsGeolocation() {
	return 'geolocation' in navigator;
}

function showMessage(message) {
	$('#message').html(message);
}

function getLocation() {
	if (supportsGeolocation()) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	}
	else {
		showMessage("Geolocation is not supported by this browser.");
	}
}

function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
		showMessage("User denied Geolocation access request.");
		break;
		case error.POSITION_UNAVAILABLE:
		showMessage("Location information unavailable.");
		break;
		case error.TIMEOUT:
		showMessage("Get user location request timed out.");
		break;
		case error.UNKNOWN_ERROR:
		showMessage("An unknown error occurred.");
		break;
	}
}

function showPosition(position) {
	var mapcanvas = document.getElementById('map');
	var coords = new google.maps.LatLng(position.coords.latitude
		, position.coords.longitude);
	var options = {
		zoom: 13,
		center: coords,
		mapTypeControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(mapcanvas, options);
	var marker = new google.maps.Marker({
		position: coords,
		map: map,
		title: "You are here!"
	});
}