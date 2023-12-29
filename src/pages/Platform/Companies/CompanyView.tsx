import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";

function CompanyView() {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const { id } = useParams();

  useEffect(() => {});
  return (
    <div className="min-h-screen">{loading ? <Loader /> : "Company view"}</div>
  );
}

export default CompanyView;
