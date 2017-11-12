var map;
            var infowindow;
            var service;
            function initMap() {
                infowindow = new google.maps.InfoWindow();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        infowindow.setPosition(pos);
                        setTimeout(400000)
                        infowindow.setContent('Hey Vaibhav we found location.');
                        infowindow.open(map);
                        map.setCenter(pos);
                    }, function () {
                        handleLocationError(true, infowindow, map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infowindow, map.getCenter());
                }
                var messiah = {
                    lat: 18.552412099999998,
                    lng: 73.80470029999992
                };
                map = new google.maps.Map(document.getElementById('map'), {
                    center: messiah,
                    zoom: 12
                });
                var marker = new google.maps.Marker({
                    position: messiah,
                    map: map,
                    title: 'petrol pump'
                });
                var request = {
                    location: messiah,
                    radius: 5000,
                    type: ['gas_station']
                }
                service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, callback);
            }
            var temparray = []
            function callback(results, status) {
                console.log("Total size -" + results.size)
                for (var i = 0; i < results.length; i++)
                {
                    temparray.push([results[i].name, results[i].vicinity])
//                    console.log(results[i].opening_hours)
//                    console.log(results[i].opening_hours["open_now"])
//                    console.log(results[i].opening_hours.constructor.name)
//                     service.getDetails(results[i], function (details, status) {
//                          if (details.formatted_phone_number)
//                          {
//                           console.log("Null found")
//                          }
//                          else
//                          {
//                                  details.formatted_phone_number;
//                            console.log(details)
////                        console.log("Details--"+JSON.stringify(details))
//                          }
//                    });
                }
                console.log(temparray)
                localStorage.setItem("details111", temparray)
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    results.forEach(createMarker);
                }
            }
            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    icon: {
//                        url: 'http://maps.gstatic.com/mapfiles/circle.png',
                        url: 'https://maps.gstatic.com/mapfiles/ms2/micons/purple-dot.png',
                        anchor: new google.maps.Point(10, 10),
                        scaledSize: new google.maps.Size(10, 17)
                    },
                    position: place.geometry.location
                });
                marker.addListener('click', function () {
                    var request = {
                        reference: place.reference
                    };
                    service.getDetails(request, function (details, status) {
//                        localStorage.setItem("details", details.name)
                        infowindow.setContent([
                            details.name,
                            details.formatted_address,
//                          details.website,
                            details.rating,
                            details.formatted_phone_number].join("<br />"));
                        infowindow.open(map, marker);
                    });
                });
            }
            window.onload = initMap;