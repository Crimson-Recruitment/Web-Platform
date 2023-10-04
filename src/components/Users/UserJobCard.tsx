import React, { useEffect, useState } from "react";


function UserJobCard(props: { title: any; description: any; timestamp: any; }) {
  const { title, description, timestamp } = props;
  const time = (new Date().getTime() - timestamp) / 1000;
  const [def, setDef] = useState("");

  const timeHandler = () => {
    if (time < 0) {
      setDef("less than 1 second");
    } else if (time < 60) {
      setDef(`${time} seconds`);
    } else if (time < 3600) {
      setDef(`${time / 60} mins`);
    } else if (time < 86400) {
      setDef(`${time / 3600} hrs`);
    } else if (time >= 86400) {
      setDef(`${time / 86400} days`);
    }
  };
  useEffect(() => {
    timeHandler();
  }, [new Date().getTime(), def]);
  return (
  <div>
    card
  </div>
  );
}

export default UserJobCard;
