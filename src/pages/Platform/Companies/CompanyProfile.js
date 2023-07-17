import React, { useEffect, useState } from "react";
import CompanySideBar from "../../../components/Companies/CompanySideBar"
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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Firestore from "../../../Firebase/Firestore";
import { useNavigate } from "react-router-dom";
import { Grid as GridLoader } from "react-loader-spinner";
import { Alert, Snackbar } from "@mui/material";

function CompanyProfile() {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const firestore = new Firestore();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      let email = localStorage.getItem("email");
        if (sessionStorage.getItem("companyDetails") != null) {
          let hasDetails = await firestore.checkCompanyCompletedRegistration();
          if (hasDetails.val == false) {
            setOpen(true)
            await new Promise(res => setTimeout(res, 2000))
            navigate("/company-details", { state: { notify: true } });
          } else {
            setCompanyData(JSON.parse(sessionStorage.getItem("companyDetails")));
          }
          setLoading(false);
        } else {
          await firestore
            .getCompanyDetails(email)
            .then(async (user) => {
              if (user.code == 0) {
                
                sessionStorage.setItem(
                  "companyDetails",
                  JSON.stringify(user.val.data())
                );
                sessionStorage.setItem(
                  "companyId",
                  JSON.stringify(user.val.id)
                );
                let hasDetails = await firestore.checkCompanyCompletedRegistration();
                if (hasDetails.val == false) {
                  setOpen(true)
            await new Promise(res => setTimeout(res, 2000))
                  navigate("/company-details", { state: { notify: true } });
                } else {
                  setCompanyData(user.val.data());
                }
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
      {loading ? (
        <div className="flex justify-center align-center mt-12">
          <GridLoader
            height="130"
            width="130"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        companyData && (
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
                        src={companyData != null ? companyData.logo:null}
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
        )
      )}
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to load Profile!
        </Alert>
      </Snackbar>
    </CompanySideBar>
  );
}

export default CompanyProfile;
