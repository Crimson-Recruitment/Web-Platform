import React from "react";
import CompanySideBar from "../../../components/CompanySideBar";
import { MDBCardBody, MDBCardTitle, MDBCardText, MDBCard } from "mdbreact";
import CompanyApplicationCard from "../../../components/CompanyApplicationCard";
import "flowbite/dist/flowbite.min.js";

function CompanyApplications() {
  return (
    <CompanySideBar>
   <div type="button" data-drawer-target="drawer-swipe" data-drawer-show="drawer-swipe" data-drawer-placement="bottom" data-drawer-edge="true" data-drawer-edge-offset="bottom-[60px]" aria-controls="drawer-swipe">
   <CompanyApplicationCard applicant={"Ssali Benjamin"} timeOfApplication={new Date().toDateString()} jobName={"Software Engineer"} applicationStatus={"Reviewing"}/>
  </div>

  <div id="drawer-swipe" class="fixed  h-[60vh] z-40 w-full overflow-y-auto bg-white border-t border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-800 transition-transform bottom-0 left-0 right-0 translate-y-full bottom-[60px]" tabindex="-1" aria-labelledby="drawer-swipe-label">
  
   </div>

    </CompanySideBar>
  );
}

export default CompanyApplications;
