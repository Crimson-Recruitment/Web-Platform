import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import SideBar from "../../../components/SideBar";
import Firestore from "../../../Firebase/Firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const firestore = new Firestore();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let email = localStorage.getItem("email");
      let hasDetails = await firestore.checkUserEmail(
        localStorage.getItem("email")
      );
      console.log(hasDetails);
      if (hasDetails.val == true) {
        navigate("/skills", { state: { notify: true } });
      } else {
        if (sessionStorage.getItem("userDetails") != null) {
          setUserData(JSON.parse(sessionStorage.getItem("userDetails")));
          setLoading(false);
          return;
        } else {
          await firestore
            .getUserDetails(email)
            .then((user) => {
              if (user.code == 0) {
                setUserData(user.val.data());
                sessionStorage.setItem(
                  "userDetails",
                  JSON.stringify(user.val.data())
                );
                setLoading(false);
              } else {
                alert(user.val);
                setLoading(false);
              }
            })
            .catch((err) => {
              alert(err);
              setLoading(false);
            });
        }
      }
    })();
  }, []);
  return (
    <SideBar>
      {loading
        ? null
        : userData && (
            <MDBContainer className="py-5">
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <div className="flex justify-center">
                        <MDBCardImage
                          src={userData.profileImage}
                          alt="avatar"
                          className="rounded-circle text-center"
                          style={{ width: "150px" }}
                          fluid
                        />
                      </div>
                      <br />
                      <p className="text-muted mb-1">
                        {userData.profession.label}
                      </p>
                      <p className="text-muted mb-4">{userData.location}</p>

                      <p className="text-blue-500 mb-1">Download Resume</p>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                      <MDBListGroup flush className="rounded-3">
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="linkedin fa-lg"
                            style={{ color: "#3b5998" }}
                          />
                          <MDBCardText>mdbootstrap</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="twitter fa-lg"
                            style={{ color: "#55acee" }}
                          />
                          <MDBCardText>@mdbootstrap</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="github fa-lg"
                            style={{ color: "#000000" }}
                          />
                          <MDBCardText>mdbootstrap</MDBCardText>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                  <MDBRow className="mt-4">
                    <MDBCol md="12">
                      <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                          <MDBCardText className="mb-4">Bio</MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {userData.about}
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Full Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {userData.firstName + " " + userData.lastName}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {userData.emailAddress}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Phone</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {userData.phoneNumber}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {userData.location}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                          <MDBCardText
                            style={{ fontSize: "1.5rem" }}
                            className="mb-4 text-black"
                          >
                            Skills
                          </MDBCardText>
                          <hr />
                          {userData.skills.map((skill) => {
                            return (
                              <MDBCardText
                                className="mb-3"
                                style={{ fontSize: "1rem" }}
                              >
                                {skill.label}
                              </MDBCardText>
                            );
                          })}
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          )}
    </SideBar>
  );
}
