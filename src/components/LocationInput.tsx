import { CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function LocationSearchInput() {
  const [address, setAddress] = useState<string>("");
  const handleChange = (address: string) => {
    setAddress(address);
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .catch((error: Error) => alert(error));
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
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
