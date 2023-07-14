import React from "react";
import CompanySideBar from "../../../components/CompanySideBar";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography
} from "mdb-react-ui-kit";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function CompanyProfile() {
  return (
    <CompanySideBar
      className="gradient-custom-2"
      style={{ backgroundColor: "#9de2ff" }}
    >
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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "90px" }}>
                  <MDBTypography className="text-white" tag="h3">BlockSafe</MDBTypography>
                  <MDBCardText>Technology</MDBCardText>
                  <MDBCardText>Kampala, Uganda</MDBCardText>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Company Overview</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBCardText className="font-italic mb-1">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias mollitia nisi id? Sunt consectetur nostrum eum 
                      consequatur dolore explicabo sint fuga voluptate, asperiores dolorem laboriosam ducimus architecto nobis natus. Laborum.
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                      Suscipit, id facilis. Assumenda esse maxime a, pariatur eos tenetur, nam eum quisquam quibusdam, velit in illo suscipit ad temporibus dolore eius.
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
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <bold className="font-italic">Phone Number 1:</bold>
                    <MDBCardText className="font-italic mb-1">
                      +256123456789
                    </MDBCardText>
                    <bold className="font-italic">Phone Number 2:</bold>
                    <MDBCardText className="font-italic mb-1">
                      +256123456789
                    </MDBCardText>
                    <bold className="font-italic">Email Address:</bold>
                    <MDBCardText className="font-italic mb-1">
                      example@gmail.com
                    </MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </CompanySideBar>
  );
}

export default CompanyProfile;
