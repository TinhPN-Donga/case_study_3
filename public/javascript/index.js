var listMarkers = [];

goongjs.accessToken = "wnicbAmnNkoMHNYUKWnlFHezV189FjmMwkNJ7hKW";
// goongjs.accessToken = 'tgg0tvf91qcC1dA90s88IldGdXkB2sccqxCw5we5';
var map = new goongjs.Map({
  container: "map",
  style: "https://tiles.goong.io/assets/goong_map_web.json",
  center: [108.20001, 16.02225],
  zoom: 12,
});

var marker = new goongjs.Marker()
  .setLngLat([108.17132, 16.02225])
  .addTo(map);

const API_URL = "/api/devices";

function checkWaterLevel(value) {
  if (value >= 100) return 1;
  if (value >= 50) return 2;
  if (value >= 20) return 3;
  return 4;
}

function colorAlert(val) {
  switch (val) {
    case 1:
      return "red";
    case 2:
      return "yellow";
    case 3:
      return "blue";
    default:
      return "#cccccc";
  }
}

function buildMarker(res) {
  var geojson = {
    type: "FeatureCollection",
    features: [

    ],
  };

  for (var e of res) {
    geojson.features.push(
      {
        type: "Feature",
        id: "Feature",
        properties: {
          message: e.address,
          value: e.value,
        },
        geometry: {
          type: "Point",
          coordinates: [e.long, e.lat],
        },
      },
    );
  }

  // add markers to map
  geojson.features.forEach(function (marker) {
    var el = document.createElement("div");
    el.className = "marker_area";
    const newDiv = document.createElement("div");
    const markerMessage = document.createElement("div");
    markerMessage.className = "wrapper";
    markerMessage.innerHTML = `
                  <span style="font-weight: bold;">${marker.properties.message}</span>
                  <span>height:${marker.properties.value}cm</span>
                  <span>mức độ:${checkWaterLevel(marker.properties.value)}</span>
              `;
    el.appendChild(markerMessage);
    newDiv.className = "marker";
    newDiv.style.width = `${(marker.properties.value <= 30 ? 40 : marker.properties.value) / 100 * 65}px`;
    newDiv.style.height = `${(marker.properties.value <= 30 ? 40 : marker.properties.value) / 100 * 65}px`;
    newDiv.style.backgroundColor = colorAlert(
      checkWaterLevel(marker.properties.value)
    );
    el.appendChild(newDiv);
    el.addEventListener("click", function () {
      console.log(markerMessage.style.display);

      if (
        !markerMessage.style.display ||
        markerMessage.style.display == "none"
      ) {
        markerMessage.style.display = 'block';
        map.flyTo({
          center: marker.geometry.coordinates,
        });
      } else {
        markerMessage.style.display = "none";
      }
    });

    // // add marker to map
    // new goongjs.Marker(el)
    //   .setLngLat(marker.geometry.coordinates)
    //   .addTo(map);


    // add marker to map
    var marker = new goongjs.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    listMarkers.push(marker);
  });
}

const callApi = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    console.log('hihihihihihihihih');
    if (response.status === 200) {
      const data = await response.json();
      console.log(data.result);
      buildMarker(data.result);
    }
  } catch (error) {
    console.error(error)
  }
}
const initStart = () => {
  callApi();
}
initStart();

const socket = io();
socket.on('connect', () => {
  console.log('Connected to server');
});
socket.on('data', (value) => {
  for(let e of listMarkers) {
    e.remove();
  }
  callApi();
});
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
