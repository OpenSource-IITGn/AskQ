import React, { useState } from "react";
import {
  Footer,
  Container,
  Header,
  Sidenav,
  Sidebar,
  Nav,
  Icon,
  Affix,
  Button,
  FlexboxGrid,
} from "rsuite";
import CustomNavbar from "../../Components/Navbar/navbar";
import { ReactComponent as Logo } from "./../../assets/logo.svg";
import { ReactComponent as DashboardLogo } from "./../../assets/dashboard.svg";
import { ReactComponent as CoursesLogo } from "./../../assets/courses.svg";
import { ReactComponent as UsersLogo } from "./../../assets/users.svg";
import { ReactComponent as QuestionsLogo } from "./../../assets/questions.svg";
import { ReactComponent as PlusLogo } from "./../../assets/Plus.svg";
import "./layout.css";

const headerStyles = {
  background: "#fff",
  color: " #fff",
};

const iconStyles = {
  width: 20,
  height: 20,
  lineHeight: "56px",
  textAlign: "center",
};

const Layout = (props) => {
  const [expand, setExpand] = useState(true);
  return (
    <Container>
      <FlexboxGrid.Item colspan={5}>
        <Sidebar
          className="custom-sidenav"
          style={{ display: "flex", flexDirection: "column" }}
          collapsible
        >
          <Sidenav.Header>
            <div className="side-header" style={headerStyles}>
              <Logo />
            </div>
          </Sidenav.Header>
          <Sidenav
            expanded={true}
            defaultOpenKeys={["3"]}
            appearance="subtle"
            activeKey="1"
          >
            <Sidenav.Body>
              <div className="main-button">
                <Button>
                  <PlusLogo />
                  <span>Ask Question</span>
                </Button>
              </div>
              <Nav className="side-nav">
                <Nav.Item
                  className="side-nav-item"
                  eventKey="1"
                  active
                  icon={<QuestionsLogo />}
                >
                  <span>Questions</span>
                </Nav.Item>
                <Nav.Item
                  className="side-nav-item"
                  eventKey="2"
                  icon={<DashboardLogo />}
                >
                  <span>Dashboard</span>
                </Nav.Item>
                <Nav.Item
                  className="side-nav-item"
                  eventKey="3"
                  icon={<UsersLogo />}
                >
                  <span>Users</span>
                </Nav.Item>
                <Nav.Item
                  className="side-nav-item"
                  eventKey="4"
                  icon={<CoursesLogo />}
                >
                  <span>Courses</span>
                </Nav.Item>
              </Nav>
              <div className="trending-tags">
                <p className="trending-heading">Trending</p>
                <Button className="trending-buttons">#Articles</Button>
                <Button className="trending-buttons">#Course</Button>
                <Button className="trending-buttons">#LalMinar</Button>
                <Button className="trending-buttons">#BanHSS</Button>
                <Button className="trending-buttons">#2Degree</Button>
              </div>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={19}>
        <Container className="full-height">
          <Header>
            <Affix>
              <CustomNavbar {...props} />
            </Affix>
          </Header>
          {props.children}
          <Footer>Footer</Footer>
        </Container>
      </FlexboxGrid.Item>
    </Container>
  );
};
export default Layout;
