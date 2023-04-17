// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
url_var = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url_var).then(function(data){
    console.log(data);
    mapEarthquakes(data)
});



function mapEarthquakes(data){
    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 4
      });
      
      // Adding a tile layer (the background map image) to our map:
      // We use the addTo() method to add objects to our map.
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(myMap);






d3.json(url_var).then(function(data){
    // marker size determined by magnitude
    function markerSize(magnitude) {
        return magnitude * 3.5;
    };
    // marker color determined by depth
    function markerColor(depth) {
            if (depth > 110) {
                return "brown"
            }
            else if (depth > 90) {
                return "red"
            }
            else if (depth > 70) {
                return "orangered"
            }
            else if (depth > 50) {
                return "orange"
            }
            else if (depth > 30) {
                return "gold"
            }
            else if (depth > 10) {
                return "yellow"
            }
            else {
                return "lightgreen"
            }
    }

    // create geoJSON layer containing features array
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng,
            // set style of marker based on magnitude
            {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                fillOpacity: 1.5,
                color: "white",
                stroke: true,
                weight: 0.5
            }
            );
        },
        // popup describing location, magnitude, and depth 
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Location: " + feature.properties.place + "<hr>Magnitude: " + feature.properties.mag
            + "<hr>Depth: " + feature.geometry.coordinates[2]);
        }
    }).addTo(myMap);

    // add legend
    var legend = L.control({position: "bottomright"});

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Depth</h4>";
        div.innerHTML += '<i style="background: brown"></i><span>>110</span><br>';
        div.innerHTML += '<i style="background: red"></i><span>>90</span><br>';
        div.innerHTML += '<i style="background: orangered"></i><span>>70</span><br>';
        div.innerHTML += '<i style="background: orange"></i><span>>50</span><br>';
        div.innerHTML += '<i style="background: gold"></i><span>>30</span><br>';
        div.innerHTML += '<i style="background: yellow"></i><span>>10</span><br>';
        div.innerHTML += '<i style="background: lightgreen"></i><span><10</span><br>'

       return div;

    };

    legend.addTo(myMap);

  });


};
