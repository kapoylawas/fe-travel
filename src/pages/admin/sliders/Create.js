import React, { useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../api";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function SliderCreate() {
  document.title = "Add New Slider - Administrator Travel GIS";

  const [image, setImage] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //token
  const token = Cookies.get("token");

  //history
  const history = useHistory();

  const handleFileChange = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("image.*")) {
      setImage("");

      toast.error("Format File not Supported!", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImage(imageData);
  };

  const storeSlider = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);

    await Api.post("/admin/sliders", formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        //show toast
        toast.success("Data Saved Successfully!", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        history.push("/admin/sliders");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="font-weight-bold">
                  <i className="fa fa-folder"></i> ADD NEW SLIDERS
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={storeSlider}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  {validation.image && (
                    <div className="alert alert-danger">
                      {validation.image[0]}
                    </div>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-success me-2"
                    >
                      <i className="fa fa-save"></i> SAVE
                    </button>
                    <button type="reset" className="btn btn-md btn-warning">
                      <i className="fa fa-redo"></i> RESET
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  );
}

export default SliderCreate;
