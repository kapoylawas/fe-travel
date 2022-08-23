import React, { useEffect, useState, useRef } from "react";
import LayoutWeb from "../../../layouts/Web";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Api from "../../../api";
//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function WebMapsIndex() {
  document.title =
    "Maps - TRAVEL GIS - Website Wisata Berbasis GIS (Geographic Information System)";
  //map container
  const mapContainer = useRef(null);
  //state coordinate
  const [coordinates, setCoordinates] = useState([]);

  const fetchDataPlace = async () => {
    await Api.get("/web/all_places").then((response) => {
      console.log("data maps", response);
      setCoordinates(response.data.data);
    });
  };

  useEffect(() => {
    fetchDataPlace();
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [116.5519982204172, -2.8989093904502283],
      zoom: 4,
    });

    // Create a default Marker and add it to the map.
    coordinates.forEach((location) => {
      // add popup
      const popup = new mapboxgl.Popup()
        .setHTML(
          `<h6>${location.title}</h6><hr/><p><i class="fa fa-map-marker"></i> <i>${location.address}</i></p><hr/><div class="d-grid gap-2"><a href="/places/${location.slug}" class="btn btn-sm btn-success btn-block text-white">Lihat Selengkapnya</a></div>`
        )
        .addTo(map);

      // add marker to map
      new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup)
        .addTo(map);
    });
  });

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="container mt-80">
          <div className="row">
            <div className="col-md-12 mb-5">
              <div className="card border-0 rounded shadow-sm">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-map-marked-alt"></i> SEMUA DATA VERSI
                    MAPS
                  </h5>
                  <hr />
                  <div
                    ref={mapContainer}
                    className="map-container"
                    style={{ height: "450px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default WebMapsIndex;
