import React from "react";
import { Content } from "rsuite";
import Layout from "./Layout/layout";

function Courses(props) {
  return (
    <Layout {...props}>
      <Content className="centered-container full-width">
        <div>Courses</div>
      </Content>
    </Layout>
  );
}

export default Courses;
