import React, { useState } from "react";
import Cookies from "universal-cookie";
import Select from "react-select";
import "flowbite/dist/flowbite.min.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { industries } from "../../../Data/CompanyIndustries";
import { Troubleshoot } from "@mui/icons-material";
import Storage from "../../../Firebase/Storage";
import Firestore from "../../../Firebase/Firestore";

function CompanyDetails() {
  const cookie = new Cookies();
  const [selectedType, setSelectedType] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [license, setLicense] = useState(null);
  const company = JSON.parse(sessionStorage.getItem("companyData"));
  const db = new Storage();
  const firestore = new Firestore();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let licenselink = "";
    if (license != null) {
      licenselink = await db.getFileUrl(`${company.id}-license`, license);
      if (licenselink.code === 1) {
        alert(licenselink.val);
        setLoading(false);
        return;
      }
    }

    let imagelink = "";
    if (imagePath != null) {
      imagelink = await db.getFileUrl(`${company.id}-image`, imagePath);
      if (imagelink.code === 1) {
        alert(imagelink.val);
        setLoading(false);
        return;
      }
    }
    await firestore
      .createCompanyDetails(
        company.id,
        company.companyName,
        company.phoneNumber1,
        company.phoneNumber2,
        company.email,
        company.location,
        imagelink.val,
        selectedType,
        e.target["overview"].value,
        e.target["bordered-radio"].value,
        licenselink.val
      )
      .then((res) => {
        if (res.code === 0) {
          navigate("/company-jobs");
          setLoading(false);
        } else {
          alert(res.val);
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const imageHandler = (e) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = () => {
      setImagePath(reader.result);
    };
    reader.onerror = () => {
      alert(reader.error);
    };
    setImage(e.target.files[0]);
  };

  const licenseHandler = (e) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = () => {
      setLicense(reader.result);
    };
    reader.onerror = () => {
      alert(reader.error);
    };
  };

  return (
    <div className="p-10 lg:my-12 lg:mx-[200px] sm:m-5 md:m-10 grid place-items-center align-center rounded overflow-hidden shadow-lg h-min-[70vh]">
      <form onSubmit={submitHandler} className="w-full">
        <div className="mb-6">
          <label
            for="dropzone-file"
            className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Company Logo
          </label>
          {image != null ? (
            <div className="flex justify-center mb-5">
              <img
                className="h-[400px] w-[400px] rounded-full"
                src={URL.createObjectURL(image)}
              />
              :
            </div>
          ) : (
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop Company Logo.
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    JPEG, PNG, or JPG
                  </p>
                </div>
              </label>
            </div>
          )}
          <input
            onChange={imageHandler}
            id="dropzone-file"
            type="file"
            accept=".jpeg, .png, .jpg"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />

          <label
            for="profession"
            className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Company Type
          </label>
          <Select
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            options={industries}
            placeholder="Healthcare, technology,....."
            onChange={(val) => {
              setSelectedType(val.value);
            }}
            isSearchable={true}
            value={industries.filter(function(option) {
              return option.value === selectedType;
            })}
          />
        </div>
        <div className="mb-6">
          <label
            for="About you"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Overview
          </label>
          <textarea
            id="overview"
            name="overview"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Describe yourself,..."
          ></textarea>
        </div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Is your company licensed?
        </label>
        <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            checked
            id="bordered-radio-1"
            type="radio"
            value={true}
            name="bordered-radio"
            class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-radio-1"
            class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Yes
          </label>
        </div>
        <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mb-5">
          <input
            id="bordered-radio-2"
            type="radio"
            value={false}
            name="bordered-radio"
            class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-radio-2"
            class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            No
          </label>
        </div>

        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Copy of Company License
        </label>
        <input
          onChange={licenseHandler}
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          accept=".pdf,.doc,.docx"
          type="file"
        />

        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "green",
            ":hover": { backgroundColor: "darkgreen" },
          }}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default CompanyDetails;
