import React, { Component } from 'react'
import CustomNavbar from './navbar'

import './../styles/global.css'

function Secret(props) {
    console.log(props)
    let { user } = props
    return (
        <div>
            <CustomNavbar {...props} />
            <div className="centered-container">
                <h1>Hi {user.firstName}, Welcome to secret Base</h1>
            </div>
        </div>
    )

}

export default Secret;
