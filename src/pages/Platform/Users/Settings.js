import React from "react";
import SideBar from "../../../components/Users/SideBar";
import "../../../Styles/settings.css";

const Settings = () => {
  return (
    <SideBar>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8 mx-auto">
            <h2 className="h3 mb-4 page-title">Settings</h2>
            <div className="my-4">
              <hr className="my-4" />
              <strong className="mb-0">Profile</strong>
              <p>Make changes to your profile.</p>
              <div className="list-group mb-5 shadow">
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <strong className="mb-0">Update profile</strong>
                      <p className="text-muted mb-0">
                        Donec in quam sed urna bibendum tincidunt quis mollis
                        mauris.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <strong className="mb-0">Privacy Settings</strong>
                      <p className="text-muted mb-0">
                        Fusce lacinia elementum eros, sed vulputate urna
                        eleifend nec.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <strong className="mb-0">Security</strong>
              <p>Control security alert you will be notified.</p>
              <div className="list-group mb-5 shadow">
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <strong className="mb-0">
                        Unusual activity notifications
                      </strong>
                      <p className="text-muted mb-0">
                        Donec in quam sed urna bibendum tincidunt quis mollis
                        mauris.
                      </p>
                    </div>
                    <div className="col-auto">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="alert1"
                        />
                        <span className="custom-control-label"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <strong className="mb-0">
                        Unauthorized financial activity
                      </strong>
                      <p className="text-muted mb-0">
                        Fusce lacinia elementum eros, sed vulputate urna
                        eleifend nec.
                      </p>
                    </div>
                    <div className="col-auto">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="alert2"
                        />
                        <span className="custom-control-label"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <strong className="mb-0">System</strong>
              <p>Please enable system alert you will get.</p>
              <div className="list-group mb-5 shadow">
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <strong className="mb-0">
                        Notify me about new features and updates
                      </strong>
                      <p className="text-muted mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                    <div className="col-auto">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="alert3"
                        />
                        <span className="custom-control-label"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <strong className="mb-0">
                        Notify me by email for latest news
                      </strong>
                      <p className="text-muted mb-0">
                        Nulla et tincidunt sapien. Sed eleifend volutpat
                        elementum.
                      </p>
                    </div>
                    <div className="col-auto">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="alert4"
                        />
                        <span className="custom-control-label"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <strong className="mb-0">
                        Notify me about tips on using account
                      </strong>
                      <p className="text-muted mb-0">
                        Donec in quam sed urna bibendum tincidunt quis mollis
                        mauris.
                      </p>
                    </div>
                    <div className="col-auto">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="alert5"
                        />
                        <span className="custom-control-label"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default Settings;
