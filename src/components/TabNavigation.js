import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";

export default function ForYou({ tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        {tabs.map((item) => {
          <Link
            to={item.link}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Tab label={item.name} />
          </Link>;
        })}
      </Tabs>
    </Box>
  );
}
