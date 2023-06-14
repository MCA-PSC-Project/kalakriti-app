import React, { useState } from "react";
import "./ProfilePage.css";
import { BrowserRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { faL } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const [isActive, setActive] = useState(true);
  const [isActivePassword, setActivePassword] = useState(false);
  const [isActiveInfo, setActiveInfo] = useState(false);
  const [isActiveSocial, setActiveSocial] = useState(false);
  const [isActiveConnection, setActiveConnection] = useState(false);
  const [isActiveNotification, setActiveNotification] = useState(false);

  const ToggleClass = () => {
    setActive(true);
    setActivePassword(false);
    setActiveInfo(false);
    setActiveSocial(false);
    setActiveConnection(false);
    setActiveNotification(false);
  };
  const ToggleClass1 = () => {
    setActive(false);
    setActivePassword(true);
    setActiveInfo(false);
    setActiveSocial(false);
    setActiveConnection(false);
    setActiveNotification(false);
  };
  const ToggleClass2 = () => {
    setActive(false);
    setActivePassword(false);
    setActiveInfo(true);
    setActiveSocial(false);
    setActiveConnection(false);
    setActiveNotification(false);
  };

  const ToggleClass3 = () => {
    setActive(false);
    setActivePassword(false);
    setActiveInfo(false);
    setActiveSocial(true);
    setActiveConnection(false);
    setActiveNotification(false);
  };
  const ToggleClass4 = () => {
    setActive(false);
    setActivePassword(false);
    setActiveInfo(false);
    setActiveSocial(false);
    setActiveConnection(true);
    setActiveNotification(false);
  };

  const ToggleClass5 = () => {
    setActive(false);
    setActivePassword(false);
    setActiveInfo(false);
    setActiveSocial(false);
    setActiveConnection(false);
    setActiveNotification(true);
  };
  return (
    <div className="container light-style flex-grow-1 container-p-y">
      <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
      <div className="card overflow-hidden">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <Link
                id="a"
                smooth
                className={
                  isActive
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                data-toggle="list"
                to="#account-general"
                onClick={ToggleClass}
              >
                General
              </Link>
              <Link
                className={
                  isActivePassword
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                data-toggle="list"
                to="#account-change-password"
                onClick={ToggleClass1}
              >
                Change password
              </Link>
              <Link
                className={
                  isActiveInfo
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                data-toggle="list"
                to="#account-info"
                onClick={ToggleClass2}
              >
                Info
              </Link>
              <Link
                className={
                  isActiveSocial
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                data-toggle="list"
                to="#account-social-links"
                onClick={ToggleClass3}
              >
                Social links
              </Link>
              <Link
                className={
                  isActiveConnection
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                data-toggle="list"
                to="#account-connections"
                onClick={ToggleClass4}
              >
                Connections
              </Link>
              <Link
                className={
                  isActiveNotification
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                data-toggle="list"
                to="#account-notifications"
                onClick={ToggleClass5}
              >
                Notifications
              </Link>
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              <div
                className={
                  isActive ? "tab-pane fade active show" : "tab-pane fade"
                }
                id="account-general"
              >
                <div className="card-body media align-items-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt
                    className="d-block ui-w-80"
                  />
                  <div className="media-body ml-4">
                    <label className="btn btn-outline-primary">
                      Upload new photo
                      <input
                        type="file"
                        className="account-settings-fileinput"
                      />
                    </label>{" "}
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-default md-btn-flat"
                    >
                      Reset
                    </button>
                    <div className="text-light small mt-1">
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </div>
                  </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      defaultValue="nmaxwell"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Nelle Maxwell"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-mail</label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      defaultValue="nmaxwell@mail.com"
                    />
                    <div className="alert alert-warning mt-3">
                      Your email is not confirmed. Please check your inbox.
                      <br />
                      <a href="javascript:void(0)">Resend confirmation</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Company Ltd."
                    />
                  </div>
                </div>
              </div>
              <div
                className={
                  isActivePassword
                    ? "tab-pane fade active show"
                    : "tab-pane fade"
                }
                id="account-change-password"
              >
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Current password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Repeat new password</label>
                    <input type="password" className="form-control" />
                  </div>
                </div>
              </div>
              <div
                className={
                  isActiveInfo ? "tab-pane fade active show" : "tab-pane fade"
                }
                id="account-info"
              >
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      defaultValue={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus."
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Birthday</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="May 3, 1995"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select className="custom-select">
                      <option>USA</option>
                      <option selected>Canada</option>
                      <option>UK</option>
                      <option>Germany</option>
                      <option>France</option>
                    </select>
                  </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body pb-2">
                  <h6 className="mb-4">Contacts</h6>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="+0 (123) 456 7891"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <input type="text" className="form-control" defaultValue />
                  </div>
                </div>
              </div>
              <div
                className={
                  isActiveSocial ? "tab-pane fade active show" : "tab-pane fade"
                }
                id="account-social-links"
              >
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Twitter</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="https://twitter.com/user"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Facebook</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="https://www.facebook.com/user"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Google+</label>
                    <input type="text" className="form-control" defaultValue />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn</label>
                    <input type="text" className="form-control" defaultValue />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="https://www.instagram.com/user"
                    />
                  </div>
                </div>
              </div>
              <div
                className={
                  isActiveConnection
                    ? "tab-pane fade active show"
                    : "tab-pane fade"
                }
                id="account-connections"
              >
                <div className="card-body">
                  <button type="button" className="btn btn-twitter">
                    Connect to <strong>Twitter</strong>
                  </button>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <h5 className="mb-2">
                    <a
                      href="javascript:void(0)"
                      className="float-right text-muted text-tiny"
                    >
                      <i className="ion ion-md-close" /> Remove
                    </a>
                    <i className="ion ion-logo-google text-google" />
                    You are connected to Google:
                  </h5>
                  nmaxwell@mail.com
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <button type="button" className="btn btn-facebook">
                    Connect to <strong>Facebook</strong>
                  </button>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <button type="button" className="btn btn-instagram">
                    Connect to <strong>Instagram</strong>
                  </button>
                </div>
              </div>
              <div
                className={
                  isActiveNotification
                    ? "tab-pane fade active show"
                    : "tab-pane fade"
                }
                id="account-notifications"
              >
                <div className="card-body pb-2">
                  <h6 className="mb-4">Activity</h6>
                  <div className="form-group">
                    <label className="switcher">
                      <input
                        type="checkbox"
                        className="switcher-input"
                        defaultChecked
                      />
                      <span className="switcher-indicator">
                        <span className="switcher-yes" />
                        <span className="switcher-no" />
                      </span>
                      <span className="switcher-label">
                        Email me when someone comments on my article
                      </span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="switcher">
                      <input
                        type="checkbox"
                        className="switcher-input"
                        defaultChecked
                      />
                      <span className="switcher-indicator">
                        <span className="switcher-yes" />
                        <span className="switcher-no" />
                      </span>
                      <span className="switcher-label">
                        Email me when someone answers on my forum thread
                      </span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="switcher">
                      <input type="checkbox" className="switcher-input" />
                      <span className="switcher-indicator">
                        <span className="switcher-yes" />
                        <span className="switcher-no" />
                      </span>
                      <span className="switcher-label">
                        Email me when someone follows me
                      </span>
                    </label>
                  </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body pb-2">
                  <h6 className="mb-4">Application</h6>
                  <div className="form-group">
                    <label className="switcher">
                      <input
                        type="checkbox"
                        className="switcher-input"
                        defaultChecked
                      />
                      <span className="switcher-indicator">
                        <span className="switcher-yes" />
                        <span className="switcher-no" />
                      </span>
                      <span className="switcher-label">
                        News and announcements
                      </span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="switcher">
                      <input type="checkbox" className="switcher-input" />
                      <span className="switcher-indicator">
                        <span className="switcher-yes" />
                        <span className="switcher-no" />
                      </span>
                      <span className="switcher-label">
                        Weekly product updates
                      </span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="switcher">
                      <input
                        type="checkbox"
                        className="switcher-input"
                        defaultChecked
                      />
                      <span className="switcher-indicator">
                        <span className="switcher-yes" />
                        <span className="switcher-no" />
                      </span>
                      <span className="switcher-label">Weekly blog digest</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-3">
        <button type="button" className="btn btn-primary">
          Save changes
        </button>
        &nbsp;
        <button type="button" className="btn btn-default">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
