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
  user_id: "",
};

const CreateWorkerForm = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const fetchWorkers = async () => {
      await actions.getUserWorkers();
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

  const getUnassignedWorkers = () => {
    return store.workers.filter((worker) => !worker.is_assigned);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    try {
      const res = await actions.createWorker({
        name: user.name,
        last_name: user.last_name,
        mail: user.mail,
        adress: user.adress,
        phone: user.phone,
        position: user.position,
        identification: user.identification,
        user_id: user.user_id,
      });

      if (res === 201) {
        await actions.assignWorker(user.user_id);
        await actions.getUserWorkers();
        setUser(initialState);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Worker created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The worker already exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create worker. Please try again.",
      });
    }
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
            USERNAME:
            <select
              name="user_id"
              className="form-select"
              style={{ backgroundColor: "#A5C894" }}
              value={user.user_id}
              onChange={handleChange}
            >
              <option value="">Select worker</option>
              {getUnassignedWorkers().map((worker, index) => (
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
    <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
      <h1>Create Worker</h1>
      <CreateWorkerForm />
    </div>
  );
};

export default CreateWorker;
