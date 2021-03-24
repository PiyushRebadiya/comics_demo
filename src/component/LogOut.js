import React from 'react'
import { Redirect } from 'react-router'

const Log_Out = () => {
    localStorage.clear()
    return <Redirect to="/"/>
}

export default Log_Out
