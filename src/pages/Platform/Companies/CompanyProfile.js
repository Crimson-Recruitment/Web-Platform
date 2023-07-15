import React, { useEffect, useState } from "react";
import CompanySideBar from "../../../components/CompanySideBar";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Firestore from "../../../Firebase/Firestore";

function CompanyProfile() {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState({});
  const firestore = new Firestore();

  useEffect(() => {
    (async () => {
      let email = localStorage.getItem("email");
      console.log(email);
      if(sessionStorage.getItem("companyDetails") != null) {
        setCompanyData(JSON.parse(sessionStorage.getItem("companyDetails")));
        setLoading(false);
      } else {
        await firestore
        .getCompanyDetails(email)
        .then((user) => {
          if (user.code == 0) {
            setCompanyData(user.val.data());
            console.log(user.val.data());
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
    })();
  }, []);
  return (
    <CompanySideBar
      className="gradient-custom-2"
      style={{ backgroundColor: "#9de2ff" }}
    >
      {loading
        ? null
        : companyData && (
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="10" xl="12">
                  <MDBCard>
                    <div
                      className="rounded-top text-white d-flex flex-row"
                      style={{ backgroundColor: "#000", height: "200px" }}
                    >
                      <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <MDBCardImage
                          src={companyData.logo.val}
                          alt="Generic placeholder image"
                          className="mt-4 mb-2 img-thumbnail"
                          fluid
                          style={{ width: "150px", zIndex: "1" }}
                        />
                      </div>
                      <div className="ms-3" style={{ marginTop: "90px" }}>
                        <MDBTypography className="text-white" tag="h3">
                          {companyData.companyName}
                        </MDBTypography>
                        <MDBCardText>{companyData.type.label}</MDBCardText>
                        <MDBCardText>{companyData.location}</MDBCardText>
                      </div>
                    </div>
                    <MDBCardBody className="text-black p-4">
                      <div className="my-5">
                        <p className="lead fw-normal mb-1">Company Overview</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <MDBCardText className="font-italic mb-1">
                            {companyData.overview}
                          </MDBCardText>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-1">Company Photos</p>
                      </div>
                      <Carousel autoPlay={true}>
                        <div>
                          <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg" />
                        </div>
                        <div>
                          <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg" />
                        </div>
                        <div>
                          <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg" />
                        </div>
                      </Carousel>

                      <div className="my-5">
                        <p className="lead fw-normal mb-1">Contact</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <bold className="font-italic">Phone Number 1:</bold>
                          <MDBCardText className="font-italic mb-1">
                            {companyData.phoneNumber1}
                          </MDBCardText>
                          <bold className="font-italic">Phone Number 2:</bold>
                          <MDBCardText className="font-italic mb-1">
                            {companyData.phoneNumber2}
                          </MDBCardText>
                          <bold className="font-italic">Email Address:</bold>
                          <MDBCardText className="font-italic mb-1">
                            {companyData.emailAddress}
                          </MDBCardText>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          )}
    </CompanySideBar>
  );
}

export default CompanyProfile;
