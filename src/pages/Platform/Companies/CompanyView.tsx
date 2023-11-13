import React, { useEffect, useState } from "react";
import { Grid as GridLoader } from "react-loader-spinner";
import { useParams } from "react-router-dom";

function CompanyView() {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const { id } = useParams();

  useEffect(() => {});
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
        "Company view"
      )}
    </div>
  );
}

export default CompanyView;
