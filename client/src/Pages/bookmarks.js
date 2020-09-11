import React from "react";
import Layout from "./Layout/layout";
import { Content } from "rsuite";

function Bookmarks(props) {
  return (
    <Layout {...props}>
      <Content className="centered-container full-width">
        <div>Bookmarks</div>
      </Content>
    </Layout>
  );
}

export default Bookmarks;
