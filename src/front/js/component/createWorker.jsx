import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import Logo from "../../img/Logo.png";

const initialState = {
  name: "",
  last_name: "",
  mail: "",
  adress: "",
  phone: "",
  position: "",
  identification: "",
  username: "",
};

const CreateWorkerForm = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const fetchWorkers = async () => {
      await actions.getWorkers();
    };
    fetchWorkers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const response = actions.createWorker({
      name: user.name,
      last_name: user.last_name,
      mail: user.mail,
      adress: user.adress,
      phone: user.phone,
      position: user.position,
      identification: user.identification,
      username: user.username,
    });

    const validatePhone = (phone) => {
      const phonePattern = /^\d{10}$/;
      return phonePattern.test(phone);
    };

    if (!validatePhone(user.phone)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number with exactly 10 digits.",
      });
      return;
    }

    const validateIdentification = (identification) => {
      const idPattern = /^[0-9]+$/;
      return idPattern.test(identification);
    };

    if (!validateIdentification(user.identification)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Identification",
        text: "Identification must contain only numbers.",
      });
      return;
    }

    response.then((res) => {
      if (res == 201) {
        actions.assignWorker(us);
        setUser(initialState);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Worker created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res == 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The worker already exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Phone number and identification must be numbers",
        });
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        marginRight: "100px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "400%",
          maxWidth: "750px",
          backgroundColor: "white",
          padding: "45px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container mt-3">
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            Name:
            <input
              name="name"
              type="text"
              className="form-control"
              value={user.name}
              onChange={handleChange}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            Last Name:
            <input
              name="last_name"
              type="text"
              className="form-control"
              value={user.last_name}
              onChange={handleChange}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            Mail:
            <input
              name="mail"
              type="text"
              className="form-control"
              value={user.mail}
              onChange={handleChange}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            Address:
            <input
              name="adress"
              type="text"
              className="form-control"
              value={user.adress}
              onChange={handleChange}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            Phone:
            <input
              name="phone"
              type="text"
              className="form-control"
              value={user.phone}
              onChange={handleChange}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            Position:
            <input
              name="position"
              type="text"
              className="form-control"
              value={user.position}
              onChange={handleChange}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            Identification:
            <input
              name="identification"
              type="text"
              className="form-control"
              value={user.identification}
              onChange={handleChange}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            Username:
            <select
              name="username"
              className="form-select"
              style={{ backgroundColor: "#A5C894" }}
              value={user.username}
              onChange={handleChange}
            >
              <option value="">Select worker</option>
              {store.workers
                .filter((worker) => !worker.is_assigned)
                .map((worker, index) => (
                  <option key={index} value={worker.id}>
                    {worker.username}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-secondary btn-sm"
          style={{
            width: "150px",
            alignSelf: "center",
            backgroundColor: "#A5C894",
          }}
        >
          Create Worker
        </button>
      </form>
    </div>
  );
};

const CreateWorker = () => {
  return (
    <div style={{ display: "flex", backgroundColor: "white" }}>
      <nav
        style={{
          backgroundColor: "#A5C894",
          height: "100vh",
          padding: "10px 0",
          width: "250px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <img src={Logo} alt="Taskyist Logo" style={{ width: "100px" }} />
        </div>
      </nav>
      <main
        style={{ marginLeft: "80px", padding: "0px", backgroundColor: "white" }}
      >
        <h1>Create Worker</h1>
        <CreateWorkerForm />
      </main>
    </div>
  );
};

export default CreateWorker;
