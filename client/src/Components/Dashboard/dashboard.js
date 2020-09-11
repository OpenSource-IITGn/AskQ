import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Nav, Icon } from "rsuite";
import QuestionList from "../Questions/questionList";

const Dashboard = (props) => {
  console.log(props);
  const { authenticated, user } = useContext(UserContext);
  const [active, setActive] = useState("questions");

  const page_number = parseInt(props.match.params.page, 10);
  const handleSelect = (activeKey) => {
    setActive(activeKey);
  };

  if (!authenticated) {
    return <div> You are not authenticated.</div>;
  }
  const { username } = user;

  const onSelect = () => {};

  const questionBlock = (
    <div>
      <QuestionList {...props} myQuestions={true} page_number={page_number} />
    </div>
  );

  const answersBlock = <div className="">Answers</div>;

  // const allQuestions = posts
  //   ? posts.map((question) => (
  //       <Question showDetailed={false} {...question} {...props} />
  //     ))
  //   : "No Questions Found";

  return (
    <div>
      <h1>
        Hello, <span>{username} </span>{" "}
      </h1>
      <Nav
        appearance="subtle"
        {...props}
        activeKey={active}
        onSelect={handleSelect}
      >
        <Nav.Item eventKey="questions" icon={<Icon icon="questions" />}>
          Questions
        </Nav.Item>
        <Nav.Item eventKey="answers">Answers</Nav.Item>
      </Nav>

      {active === "questions" ? questionBlock : answersBlock}
    </div>
  );
};

export default Dashboard;
