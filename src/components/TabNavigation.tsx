import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, To } from "react-router-dom";

export default function ForYou(props: { tabs: any }) {
  const { tabs } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        {tabs.map(
          (item: {
            link: To;
            name:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          }) => {
            <Link
              to={item.link}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Tab label={item.name} />
            </Link>;
          },
        )}
      </Tabs>
    </Box>
  );
}
