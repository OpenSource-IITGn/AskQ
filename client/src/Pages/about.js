import React from "react";
import Layout from "./Layout/layout";
import { Content } from "rsuite";

function AboutPage(props) {
  return (
    <Layout {...props}>
      <Content className="centered-container full-width">
        <div>About us</div>
      </Content>
    </Layout>
  );
}

export default AboutPage;
