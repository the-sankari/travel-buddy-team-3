import React from "react";

const ContactPage = () => {
  return (
    <>
      <div className="container">
        <h1>Contact Us</h1>
        <div className="split-paragraph">
          <p className="mb-0 fs-5">
            Feel free to reach out using the contact information below
          </p>
          <p className="mb-0 fs-5">or by filling out the form.</p>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2>Contact Information</h2>
                <p>
                  <i className="fa-solid fa-envelope"></i> Email: example@gmail.com
                </p>
                <p>
                  <i className="fa-solid fa-phone"></i> Phone: +358 000 000 000
                </p>
                <p>
                  <i className="fa-solid fa-location-dot"></i> Address: Street 60 B
                  90, City, Country
                </p>
                <p>
                  <i className="fa-solid fa-tag"></i> Y-tunnus 100000-0
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2>Contact Form</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message:
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
