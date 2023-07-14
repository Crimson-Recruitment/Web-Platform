import * as React from "react";
import SideBar from "../../../components/SideBar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import "../../../Styles/jobs.css";
import { Box, Button, Grid } from "@mui/material";

function Jobs() {
 
  return (
    <SideBar>
      <Grid container padding="0px">
        <Grid item xs={12} lg={5}>
          <Box className="search-box">
            <input type="text" placeholder="Search..." />
            <Button type="submit">
              <i className="fas fa-search"></i>
            </Button>
          </Box>
          <MDBCard className="my-3 me-3">
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </MDBCardText>
              <MDBCardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="my-3 me-3">
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </MDBCardText>
              <MDBCardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="my-3 me-3">
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </MDBCardText>
              <MDBCardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </Grid>
        <Grid item sx={{ display: { md: "block", xs: "none" } }} md={0.1}>
          <div className="d-flex" style={{ minHeight: "100%" }}>
            <div className="vr"></div>
          </div>
        </Grid>
        <Grid
          item
          sx={{
            display: {
              md: "block",
              xs: "none",
              "& h2": { fontWeight: "bold" },
              "& h3": { fontWeight: "bolder" },
            },
          }}
          xs={false}
          sm={false}
          md={false}
          lg={6.9}
        >
          <div className="job-description">
            <h2>React Developer (JSX and Material-UI)</h2>
            <h3>Company Overview</h3>
            <p>
              [Company Name] is a [industry or niche] company dedicated to
              providing [description of company's mission/goals]. We are seeking
              a skilled React Developer with expertise in JSX and Material-UI to
              join our dynamic and innovative team. As a React Developer, you
              will have the opportunity to work on cutting-edge web applications
              and contribute to the growth and success of our company.
            </p>

            <h3>Job Responsibilities</h3>
            <ul>
              <li>
                Develop and implement user-facing features using React.js,
                leveraging the power of JSX and Material-UI.
              </li>
              <li>
                Collaborate with cross-functional teams, including designers,
                product managers, and backend developers, to define and deliver
                high-quality software solutions.
              </li>
              <li>
                Write clean, maintainable, and efficient code using JSX syntax,
                following best practices and industry standards.
              </li>
              <li>
                Utilize the rich component library provided by Material-UI to
                create visually stunning and responsive user interfaces.
              </li>
              <li>
                Optimize web applications for maximum speed and scalability,
                leveraging the performance optimizations provided by React and
                Material-UI.
              </li>
              <li>
                Stay up to date with the latest trends and advancements in web
                development, specifically focusing on JSX and Material-UI.
              </li>
              <li>
                Conduct code reviews, provide constructive feedback, and mentor
                junior developers in using JSX and Material-UI effectively.
              </li>
              <li>
                Troubleshoot and debug issues, ensuring optimal performance and
                functionality of React components built with JSX and
                Material-UI.
              </li>
              <li>
                Participate in Agile development processes, including sprint
                planning, daily stand-ups, and retrospective meetings, while
                incorporating the best practices of using JSX and Material-UI.
              </li>
              <li>
                Actively contribute to the improvement of software development
                processes and tools, with a focus on enhancing JSX and
                Material-UI workflows.
              </li>
            </ul>

            <h3>Required Skills and Qualifications</h3>
            <ul>
              <li>
                Proficiency in React.js, specifically in building user
                interfaces using JSX syntax and the React component model.
              </li>
              <li>
                Strong knowledge and experience in utilizing Material-UI,
                including the ability to leverage its rich set of components,
                theming capabilities, and responsive design features.
              </li>
              <li>
                Solid understanding of modern web technologies, including HTML,
                CSS, and JavaScript (ES6+).
              </li>
              <li>
                Experience with version control systems, such as Git, and
                familiarity with collaborative development workflows.
              </li>
              <li>
                Strong problem-solving skills and attention to detail, with the
                ability to write clean, maintainable, and performant code.
              </li>
              <li>
                Excellent communication and collaboration skills, with the
                ability to work effectively in a team environment.
              </li>
              <li>
                Proven track record of delivering high-quality software projects
                on time.
              </li>
              <li>
                Bachelor's degree in Computer Science, Engineering, or a related
                field (or equivalent experience).
              </li>
            </ul>

            <h3>Preferred Skills</h3>
            <ul>
              <li>
                Experience with state management libraries like Redux or MobX.
              </li>
              <li>Knowledge of server-side rendering and Next.js.</li>
              <li>
                Familiarity with unit testing frameworks such as Jest or Enzyme.
              </li>
              <li>Experience with build tools like Webpack or Babel.</li>
              <li>
                Understanding of RESTful APIs and asynchronous programming
                concepts.
              </li>
              <li>
                Knowledge of modern JavaScript frameworks and libraries beyond
                React.
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </SideBar>
  );
}

export default Jobs;
