import { CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function LocationSearchInput() {
  const [address, setAddress] = useState("");
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      className="p-5"
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input",
              required: true,
              fullWidth: true,
              id: "location",
              label: "Location",
              name: "location",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading ? (
              <div className="flex justify-center">
                <CircularProgress className="my-5" />
              </div>
            ) : (
              suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#b8d1a4", cursor: "pointer" }
                  : { backgroundColor: "#f1f6ec", cursor: "pointer" };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
