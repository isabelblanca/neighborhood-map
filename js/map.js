function initialize() {		
	var customMapType = new google.maps.StyledMapType([
		{
			stylers: [
				{hue: '#BE81F7'},
				{visibility: 'simplified'},
				{gamma: 0.5},
				{weight: 0.5}
			]
		},
		{
			featureType: 'water',
			stylers: [{color: '#CEECF5'}]
		}
	], {
		name: 'Custom Style'
	});
	var customMapTypeId = 'myStyle';
	var mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(39.474963, -0.380000),
		disableDefaultUI: true,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
		}
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  
	map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);
	viewModel();
}
function googleError() {
	alert("Error handle is provided ;)")
}