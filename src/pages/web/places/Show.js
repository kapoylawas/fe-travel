import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/Web";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function WebPlacesShow() {
  const [place, setPlace] = useState({});

  const { slug } = useParams();

  const fetchDataPlace = async () => {
    //fetching Rest API
    await Api.get(`/web/places/${slug}`).then((response) => {
      //set data to state "places"
      setPlace(response.data.data);

      //set title from state "category"
      document.title = `${response.data.data.title} - Website Wisata Berbasis GIS (Geographic Information System)`;
    });
  };

  useEffect(() => {
    fetchDataPlace();
  }, []);

  //=================================================================
  // react image gallery
  //=================================================================

  const images = [];

  const placeImages = () => {
    for (let value in place.images) {
      images.push({
        original: place.images[value].image,
        thumbnail: place.images[value].image,
      });
    }
  };

  useEffect(() => {
    placeImages();
  });

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="container mt-80">
          <div className="row">
            <div className="col-md-7 mb-4">
              <div className="card border-0 rounded shadow-sm">
                <div className="card-body">
                  <h4>{place.title}</h4>
                  <span className="card-text">
                    <i className="fa fa-map-marker"></i>
                    <i>{place.address}</i>
                  </span>
                  <hr />
                  <ImageGallery items={images} autoPlay={true} />
                  <div
                    dangerouslySetInnerHTML={{ __html: place.description }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-5 mb-4">
              <div className="card border-0 rounded shadow-sm">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-map-marked-alt"></i>MAPS
                  </h5>
                  <hr />
                </div>
                <hr />
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2 col-2">
                      <div className="icon-info-green">
                        <i className="fa fa-map-marker-alt"></i>
                      </div>
                    </div>
                    <div className="col-md-10 col-10">
                      <div className="capt-info fw-bold">ADDRESS</div>
                      <div className="sub-title-info">
                        <i>{place.address}</i>
                      </div>
                    </div>
                    <div className="col-md-2 col-2">
                      <div className="icon-info-green">
                        <i className="fa fa-clock"></i>
                      </div>
                    </div>
                    <div className="col-md-10 col-10">
                      <div className="capt-info fw-bold">OFFICE HOURS</div>
                      <div className="sub-title-info">{place.office_hours}</div>
                    </div>
                    <div className="col-md-2 col-2">
                      <div className="icon-info-green">
                        <i className="fa fa-phone"></i>
                      </div>
                    </div>
                    <div className="col-md-10 col-10">
                      <div className="capt-info fw-bold">PHONE</div>
                      <div className="sub-title-info">{place.phone}</div>
                    </div>
                    <div className="col-md-2 col-2">
                      <div className="icon-info-green">
                        <i className="fa fa-globe-asia"></i>
                      </div>
                    </div>
                    <div className="col-md-10 col-10">
                      <div className="capt-info fw-bold">WEBSITE</div>
                      <div className="sub-title-info">
                        <a
                          href={place.website}
                          className="text-decoration-none"
                        >
                          {place.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default WebPlacesShow;
