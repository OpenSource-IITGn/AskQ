import React from 'react';
import { Button, ButtonToolbar } from 'rsuite';
import { Link } from 'react-router-dom';
import CustomNavbar from '../Components/navbar';
import '../styles/global.css';
import '../styles/home.css';

function Home(props) {

    return (
        <div style={{ height: '100vh' }}>
            <CustomNavbar {...props} />
            <div className="body-page">
                <div className="centered-container">
                    <h2>Go - Over - flow</h2>
                    <ButtonToolbar className="auth-buttons">
                        <Button componentClass={Link} to="/signup" appearance="default">Sign Up</Button>
                        <Button componentClass={Link} to="/login" appearance="primary">Login</Button>
                        <Button componentClass={Link} to="/questions/page=1" appearance="ghost">Questions</Button>
                    </ButtonToolbar>
                </div>
            </div>

        </div>
    )
}

export default Home;
