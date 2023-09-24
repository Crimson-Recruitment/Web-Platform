import React, { useEffect, useState } from "react";
import Firestore from "../../../Firebase/Firestore";
import { useParams } from "react-router-dom";
import { Grid as GridLoader } from "react-loader-spinner";
import { Button, Grid, Typography } from "@mui/material";
import { Email, PhoneInTalk } from "@mui/icons-material";

function UserView() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const firestore = new Firestore();
  const { id } = useParams();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center mt-12">
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
      ) : userData == null ? (
        <section class="pt-16 bg-blueGray-50">
          <div class="w-full lg:w-4/12 px-4 mx-auto">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
              <div class="px-6">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full px-4 flex justify-center">
                    <div class="relative">
                      <div
                        className="h-[150px] w-[150px] rounded-full mt-8"
                        style={{
                          backgroundImage: `url(./images/home.png)`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {"Ssali" + " " + "Benjamin"}
                  </h3>
                  <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {"Location"}
                  </div>
                  <div class="mb-2 text-blueGray-600 mt-10">
                    <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {"Kampala, Uganda"}
                  </div>
                </div>
                <div class="mt-10 py-10 border-t border-blueGray-200">
                  <div class="flex flex-wrap justify-center">
                    <Grid gap={2} container>
                      <Grid item xs={12} md={5}>
                        <Typography variant="h6">Bio</Typography>
                        <Typography color="text.secondary">
                          {"I am a great dev"}
                        </Typography>
                        <Typography sx={{ marginTop: "20px" }} variant="h6">
                          Skills
                        </Typography>
                        <Typography color="text.secondary">
                          <ul>
                            <li>C++</li>
                            <li>Rust</li>
                          </ul>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Typography variant="h6">Contacts</Typography>
                        <Typography color="text.secondary">
                          <PhoneInTalk /> +256773457817
                        </Typography>
                        <Typography color="text.secondary">
                          <Email /> ssalibenjamin0402@gmail.com
                        </Typography>
                        <Typography sx={{ marginTop: "20px" }} variant="h6">
                          Download Resume
                        </Typography>
                        <Button
                          onClick={() => {
                            window.open(`book.pdf`, "_blank");
                          }}
                        >
                          Download Resume
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default UserView;
