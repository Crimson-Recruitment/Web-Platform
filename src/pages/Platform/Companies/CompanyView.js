import React, { useEffect, useState } from "react";
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
import { Grid as GridLoader } from "react-loader-spinner";
import Firestore from "../../../Firebase/Firestore";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

function CompanyView() {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const firestore = new Firestore();
  const { id } = useParams();

  useEffect(() => {
    setLoading(false);
  });
  return (
    <div className="min-h-screen">
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
                      src={""}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: "90px" }}>
                    <MDBTypography className="text-white" tag="h3">
                      {"Crimson Recruitment"}
                    </MDBTypography>
                    <MDBCardText>{"Technology"}</MDBCardText>
                    <MDBCardText>{"USA, New York"}</MDBCardText>
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
                        It is a very great company.
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
                        +256773457817
                      </MDBCardText>
                      <bold className="font-italic">Phone Number 2:</bold>
                      <MDBCardText className="font-italic mb-1">
                        +256751562195
                      </MDBCardText>
                      <bold className="font-italic">Email Address:</bold>
                      <MDBCardText className="font-italic mb-1">
                        crimsonco@gmail.com
                      </MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </div>
  );
}

export default CompanyView;
