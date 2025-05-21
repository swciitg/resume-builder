import React, { useEffect } from 'react'

const LandingPage = ({ user }) => {


    const LoginUser = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/azuread`;
    }
    return (
        <div>
            <h1>Landing Page</h1>
            <button className='' onClick={LoginUser}>login</button>
        </div>
    )
}

export default LandingPage
