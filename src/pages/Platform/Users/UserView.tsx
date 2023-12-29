import { Email, PhoneInTalk } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userModel } from "../../../Models/UserModel";
import Loader from "../../../components/Loader";

function UserView() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userModel>();
  const { id } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        <Loader />
      ) : userData != null ? (
        <section className="pt-16 bg-blueGray-50">
          <div className="w-full lg:w-4/12 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      <div
                        className="h-[150px] w-[150px] rounded-full mt-8"
                        style={{
                          backgroundImage: `url(${userData.profileImage})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {userData.firstName + " " + userData.lastName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {userData.location}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {userData.jobTitle}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200">
                  <div className="flex flex-wrap justify-center">
                    <Grid gap={2} container>
                      <Grid item xs={12} md={5}>
                        <Typography variant="h6">Bio</Typography>
                        <Typography color="text.secondary">
                          {userData.bio}
                        </Typography>
                        <Typography sx={{ marginTop: "20px" }} variant="h6">
                          Skills
                        </Typography>
                        <Typography color="text.secondary">
                          <ul>
                            {userData.skills.map((skill: any) => {
                              return (
                                <li
                                  className="mb-3"
                                  style={{ fontSize: "1rem" }}
                                >
                                  {skill.label}
                                </li>
                              );
                            })}
                          </ul>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Typography variant="h6">Contacts</Typography>
                        <Typography color="text.secondary">
                          <PhoneInTalk /> {userData.phoneNumber}
                        </Typography>
                        <Typography color="text.secondary">
                          <Email /> {userData.email}
                        </Typography>
                        <Typography sx={{ marginTop: "20px" }} variant="h6">
                          Download Resume
                        </Typography>
                        <Button
                          onClick={() => {
                            window.open(`${userData.cv}.pdf`, "_blank");
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
