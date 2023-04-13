import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../components/layout"

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    useEffect(() => {
        if (localStorage.getItem('token') === "" || localStorage.getItem('token') == null) {
            navigate("/");
        } else {
            getUser()
        }
    }, [])

    const getUser = () => {
        axios.get('/api/user', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then((r) => {
                setUser(r.data)
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const logoutAction = () => {
        axios.post('/api/logout', {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then((r) => {
                localStorage.setItem('token', "")
                navigate("/");
            })
            .catch((e) => {
                console.log(e)
            });
    }

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12">
                        <h2 className="text-center mt-5">Salut : {user.name}</h2>
                        <div className="container-fluid">
                            <h5>Dashboard</h5>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => { logoutAction() }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;