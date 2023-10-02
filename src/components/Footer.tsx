import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <MDBFooter
      style={{ backgroundColor: "maroon" }}
      className="text-center text-lg-start text-white"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a
            href="https://t.me/+_hO9ux7YlGw2ZWU0"
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="telegram" />
          </a>
          <a
            href="https://twitter.com/JadeRecruit"
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="twitter" />
          </a>
          <a
            href="https://chat.whatsapp.com/GxKCKOgN4Ve202uEBlGD2u"
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="whatsapp" />
          </a>
          <a
            href="https://www.linkedin.com/company/jade-recruit"
            target="_blank"
            className="me-4 text-reset"
          >
            <i className="fab fa-linkedin"> </i>
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h5 className="text-uppercase fw-bold">
                <img
                  src="./images/logo-white.svg"
                  style={{
                    width: "25px",
                    marginRight: "5px",
                    paddingBottom: "3px",
                  }}
                />
                Crimson Recruitment
              </h5>
              <p>Creating Opportunities for Job Seekers.</p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="/" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="/about" className="text-reset">
                  About
                </a>
              </p>
              <p>
                <a href="/contact-us" className="text-reset">
                  Contact Us
                </a>
              </p>
              <p>
                <a href="/pricing" className="text-reset">
                  Pricing
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Kampala, Uganda
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="mailto:info@jaderecruitment.org">info@crimsonrecruitment.org</a> 
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 
                <a href="tel:+256773457817">+ 256 773 457 817</a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="/">
          Crimson Recruitment
        </a>
      </div>
    </MDBFooter>
  );
}
