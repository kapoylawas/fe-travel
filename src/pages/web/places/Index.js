import React, { useEffect, useState } from "react";
import Api from "../../../api";
import CardPlace from "../../../components/utilities/CardPlace";
import PaginationComponent from "../../../components/utilities/Pagination";
import LayoutWeb from "../../../layouts/Web";

function WebPlacesIndex() {
  document.title =
    "Places -  TRAVEL GIS - Website Wisata Berbasis GIS (Geographic Information System)";

  const [places, setPlaces] = useState([]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  //state perPage
  const [perPage, setPerPage] = useState(0);
  //state total
  const [total, setTotal] = useState(0);

  const fetchDataPlaces = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`web/places?page=${page}`).then((response) => {
      setPlaces(response.data.data.data);

      setCurrentPage(response.data.data.current_page);

      setPerPage(response.data.data.per_page);

      setTotal(response.data.data.total);
    });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchDataPlaces();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="container mt-80">
          <div className="row">
            {places.length > 0 ? (
              places.map((place) => (
                <CardPlace
                  key={place.id}
                  id={place.id}
                  slug={place.slug}
                  title={place.title}
                  images={place.images}
                  address={place.address}
                />
              ))
            ) : (
              <div
                className="alert alert-danger border-0 rounded shadow-sm"
                role="alert"
              >
                <strong>Opps...!</strong> Data Belum Tersedia!.
              </div>
            )}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            perPage={perPage}
            total={total}
            onChange={(pageNumber) => fetchDataPlaces(pageNumber)}
            position="center"
          />
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default WebPlacesIndex;
