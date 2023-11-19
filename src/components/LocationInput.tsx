// BingMapsAutocomplete.tsx
import React, { useState, useEffect } from "react";
import Autocomplete, {
  AutocompleteInputChangeReason,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

declare global {
  interface Window {
    Microsoft: any;
    initializeBingMap: () => void;
  }
}

const LocationInput = () => {
  const apiKey =
    "AspJNokRcnZQKBDoUmhLayY19jcaXfh0h_c0d-FWWzgKD5eLyY5I7CaRdOiQ-Y7o";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    "",
  );
  const [newLocations, setNewLocations] = useState<any[]>([]);
  const location = useSelector((state: any) => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=${apiKey}&callback=initializeBingMap`;
    script.async = true;
    script.defer = true;
    setSelectedAddress(location.location);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [location.location, selectedAddress]);

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    setSearchTerm(value);
    if (value.length !== 0) {
      dispatch({ type: "CHANGE_LOCATION", payload: value });
    }
  };

  const getOptionLabel = (option: any) => {
    if (option && option.address && option.address.formattedAddress) {
      const country = option.address.countryRegion || "";
      return `${option.address.formattedAddress}, ${country}`;
    }
    return "";
  };

  const handlePlaceSelected = (place: any) => {
    const address = place?.address?.formattedAddress || "";
    setSelectedAddress(address);
    if (address.length !== 0) {
      dispatch({ type: "CHANGE_LOCATION", payload: address });
    }
  };

  const fetchLocations = async () => {
    const response = await fetch(
      `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${searchTerm}&key=${apiKey}`,
    );
    const data = await response.json();

    const newLocationsData =
      data?.resourceSets?.[0]?.resources?.[0]?.value || [];
    setNewLocations(newLocationsData);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchLocations();
    }
  }, [searchTerm]);

  return (
    <div>
      <Autocomplete
        id="bing-maps-autocomplete"
        options={newLocations}
        inputValue={location.location}
        getOptionLabel={getOptionLabel}
        onInputChange={handleInputChange}
        onChange={(_, value) => handlePlaceSelected(value)}
        renderInput={(params) => (
          <TextField {...params} label="Location" variant="outlined" />
        )}
      />
    </div>
  );
};

export default LocationInput;
