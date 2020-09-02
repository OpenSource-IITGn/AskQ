import React, { useContext, useState } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { Nav, Icon } from 'rsuite'

const Dashboard = (props) => {
    const { authenticated, user } = useContext(UserContext)
    const [active, setActive] = useState("questions")

    if (!authenticated) {
        return (
            <div> You are not authenticated.</div>
        )
    }
    const { username } = user

    const onSelect = () => {

    }

    const handleSelect = (activeKey) => {
        setActive(activeKey)
    }

    const questionBlock = (
        <div>
            Questions
        </div>
    )

    const answersBlock = (
        <div className="">
            Answers
        </div>
    )

    return (
        <div>
            <h1>Hello, <span>{username} </span>  </h1>
            <Nav appearance="subtle" {...props} activeKey={active} onSelect={handleSelect}>
                <Nav.Item eventKey="questions" icon={<Icon icon="questions" />}>
                    Questions
                </Nav.Item>
                <Nav.Item eventKey="answers">Answers</Nav.Item>
            </Nav>

            {active === "questions" ? questionBlock : answersBlock}

        </div>
    )
}

export default Dashboard