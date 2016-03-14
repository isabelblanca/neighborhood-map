function viewModel() {
	var Location = function(title, lng, lat, venueId) {
	var self = this;
	this.title = title;
	this.lng = lng;
	this.lat = lat;
	this.venueId = venueId;
	//getConetent function retrieves 5 most recent tips from foursquare for the marker location.
	this.getContent = function() {
		var topTips = [];
		var venueUrl = 'https://api.foursquare.com/v2/venues/' + self.venueId + '/tips?sort=recent&limit=5&v=20151126&client_id=FNF5EFVZCSBPDL55CC1KE3R5EWT15MVPJRMULOPFOZKOSLTT&client_secret=CV0K33J4ECSFFL2HTO2L3N11LBPINXKK0OJDKJCZS1JGPFWI';
		$.getJSON(venueUrl,
			function(data) {
				$.each(data.response.tips.items, function(i, tips){
					topTips.push('<li>' + tips.text + '</li>');
				});
			}).done(function(){
				self.content = '<h2>' + self.title + '</h2>' + '<h3>5 Most Recent Comments</h3>' + '<ol class="tips">' + topTips.join('') + '</ol>';
				}).fail(function(jqXHR, textStatus, errorThrown) {
					self.content = '<h2>' + self.title + '</h2>' + '<h3>5 Most Recent Comments</h3>' + '<h4>Oops. There was a problem retrieving this location\'s comments.</h4>';				
					console.log('getJSON request failed! ' + textStatus);
				});
		}();
	this.infowindow = new google.maps.InfoWindow();
	this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(self.lng, self.lat),
		map: map,
		title: self.title,
		icon: self.icon,
		draggable: true,
		animation: google.maps.Animation.DROP,
	});
	// Opens the info window for the location marker.
	this.openInfowindow = function() {
		for (var i=0; i < locationsModel.locations.length; i++) {
			locationsModel.locations[i].infowindow.close();
			if (self.marker.getAnimation() !== null) {
				self.marker.setAnimation(null);
			} else {
				self.marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		};
		map.panTo(self.marker.getPosition())
		self.infowindow.setContent(self.content);
		self.infowindow.open(map,self.marker);
	};
	// Assigns a click event listener to the marker to open the info window and animate the markers
	this.addListener = google.maps.event.addListener(self.marker,'click', (this.openInfowindow));
};
var locationsModel = {
	locations:[
		new Location('Inestable Theater',39.475950, -0.372521,'4ca38115d5a2a143f3004a90'),
		new Location('Olympia Theater',39.472836, -0.377843, '4bd488266798ef3b71cf618d'),
		new Location('Principal Valencia Theater', 39.472704, -0.374152,'4d03babde350b60c44e27e42'),
		new Location('Rialto Theater', 39.472902, -0.376212,'4cbf1ed900d837045cf2415c'),
		new Location('Thalia Theater', 39.478733, -0.378015, '4e20b5be88774a43b7625866'),
		new Location('Flumen Theater', 39.484630, -0.385259,'4d20b53186e154819113bc3a'),
		new Location('El Musical Theater',39.466542, -0.332181,'4d0676248620224bf452b340'),
		new Location('La Rambleta', 39.450611, -0.392851,'4bec2a66b3352d7fa25157d2'),
		new Location('La Estrella', 39.479925, -0.386598,'4d89a0bb76e1236abeb30843'),
		new Location('Escalante Theater', 39.478931, -0.378615,'4df7a855c65b87473b07f3dd'),
		new Location('Micalet Theater', 39.479239, -0.383091,'4c9cdbc60e9bb1f7cab1d75f'),
	],
	query: ko.observable(''),
	shouldShowListings: ko.observable(false),
	btnListSelected: function() {
	//Toggle display and hide for listings
		if(locationsModel.shouldShowListings() == true) {
			locationsModel.shouldShowListings(false);
		} else {
			locationsModel.shouldShowListings(true);
		}
	}
};	
// Search function for filtering through the list of locations based on the name of the location.
locationsModel.search = ko.dependentObservable(function() {
	var self = this;
	var search = self.query().toLowerCase();
	return ko.utils.arrayFilter(self.locations, function(location) {
		if (location.title.toLowerCase().indexOf(search) >= 0) {
			location.marker.setVisible(true);
		} else {
			location.marker.setVisible(false);
		}
		return location.title.toLowerCase().indexOf(search) >= 0;
		});
	},locationsModel);
	ko.applyBindings(locationsModel); 
}