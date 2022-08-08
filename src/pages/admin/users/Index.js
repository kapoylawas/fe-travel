import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../components/utilities/Pagination";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function UsersIndex() {
  //title page
  document.title = "Users - Administrator Travel GIS";

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);
  const token = Cookies.get("token");
  const [search, setSearch] = useState("");

  const fetchData = async (pageNumber, searchData) => {
    const searchQuery = searchData ? searchData : search;
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`/admin/users?q=${searchQuery}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setUsers(response.data.data.data);
      setCurrentPage(response.data.data.current_page);
      setPerPage(response.data.data.per_page);
      setTotal(response.data.data.total);

      // console.log("data", response);
    });
  };

  useEffect(() => {
    //call function "fetchData"
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchHandlder = (e) => {
    e.preventDefault();

    //call function "fetchDataPost" with state search
    fetchData(search);
  };

  const deletUsers = (id) => {
    confirmAlert({
      title: "Are You Sure ?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/admin/users/${id}`, {
              headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
              },
            }).then(() => {
              //show toast
              toast.success("Data Deleted Successfully!", {
                duration: 4000,
                position: "top-right",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });

              //call function "fetchData"
              fetchData();
            });
          },
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card border-0 border-top-success rounded shadow-sm mb-5">
              <div className="card-header">
                <span className="font-weight-bold">
                  <i className="fa fa-users"></i> USERS
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={searchHandlder} className="form-group">
                  <div className="input-group mb-3">
                    <Link
                      to="/admin/users/create"
                      className="btn btn-md btn-success"
                    >
                      <i className="fa fa-plus-circle"></i> ADD NEW
                    </Link>
                    <input
                      type="text"
                      className="form-control"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="search by user name"
                    />
                    <button type="submit" className="btn btn-md btn-success">
                      <i className="fa fa-search"></i> SEARCH
                    </button>
                  </div>
                </form>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            {++index + (currentPage - 1) * perPage}
                          </td>
                          <td className="text-center">{user.name}</td>
                          <td className="text-center">{user.email}</td>
                          <td className="text-center">
                            <Link
                              to={`/admin/users/edit/${user.id}`}
                              className="btn btn-sm btn-primary me-2"
                            >
                              <i className="fa fa-pencil-alt"></i>
                            </Link>
                            <button
                              onClick={() => deletUsers(user.id)}
                              className="btn btn-sm btn-danger"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationComponent
                  currentPage={currentPage}
                  perPage={perPage}
                  total={total}
                  onChange={(pageNumber) => fetchData(pageNumber)}
                  position="end"
                />
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  );
}

export default UsersIndex;
