import React, { useState } from "react";
import {
  Button,
  Container,
  Header,
  Content,
  FlexboxGrid,
  Footer,
  Divider,
} from "rsuite";
import Question from "./../Components/Questions/question";
import CustomPagination from "./../Components/pagination";

import Layout from "./Layout/layout";
import QuestionList from "../Components/Questions/questionList";
import SearchBar from "../Components/searchBar/searchBar";

function Questions(props) {
  const [squery, setsquery] = useState("");

  const handleClick = (e) => {
    props.history.push("/questions/create");
  };

  const page_number = parseInt(props.match.params.page, 10);

  const handlePageChange = (curr_page) => {
    props.history.push(`/questions/page=${curr_page}`);
  };

  const handleSearch = (query) => {
    setsquery(query);
  };

  const header = (
    <FlexboxGrid justify="space-between" colspan={14}>
      <FlexboxGrid.Item>
        <h2 className="container-heading">Top Questions</h2>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <Button appearance="primary" onClick={handleClick}>
          Ask Question
        </Button>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );

  return (
    <Layout {...props}>
      <Content
        className="horizontal-margin top-margin"
        style={{ borderRadius: "16px" }}
      >
        <FlexboxGrid justify="center" className="full-width">
          <FlexboxGrid.Item colspan={24}>
            <SearchBar handleSearch={handleSearch} />
            <QuestionList
              {...props}
              page_number={page_number}
              squery={squery}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <CustomPagination
            onPageChange={handlePageChange}
            active={page_number}
          />
        </FlexboxGrid>
      </Content>
    </Layout>
  );
}

export default Questions;
