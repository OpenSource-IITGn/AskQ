import React from 'react'
import { Footer, Container, Header } from 'rsuite'
import CustomNavbar from '../../Components/navbar'

const Layout = (props) => {
    return (
        <Container className="full-height">
            <Header>
                <CustomNavbar {...props} />
            </Header>
            {props.children}
            <Footer>Footer</Footer>
        </Container>

    )
}
export default Layout