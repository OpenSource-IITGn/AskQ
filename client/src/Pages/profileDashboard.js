import React from "react";
import { Container, Header, Content, FlexboxGrid, Panel, Footer } from "rsuite";
import Dashboard from "../Components/Dashboard/dashboard";
import Layout from "./Layout/layout";

function ProfileDashboard(props) {
  return (
    <Layout {...props}>
      <Content className="centered-container full-width">
        <Dashboard {...props} />
      </Content>
    </Layout>
  );
}

export default ProfileDashboard;
