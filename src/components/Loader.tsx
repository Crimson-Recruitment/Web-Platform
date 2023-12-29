import { Grid } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center mt-12">
      <Grid
        height="130"
        width="130"
        color="#8B0000"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
