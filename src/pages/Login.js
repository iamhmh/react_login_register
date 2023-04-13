import React, {useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/layout';

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
            navigate('/dashboard');
        }
    }, []);

    const loginAction = (e) => {
        //on va empêcher le formulaire de se soumettre
        e.preventDefault();

        setIsSubmitting(true);

        let payload = {
            email: email,
            password: password
        };

        axios.post('/api/login', payload)
            .then(response => {
                setIsSubmitting(false);
                localStorage.setItem('token', response.data.access_token);
                navigate('/dashboard');
            })
            .catch(error => {
                setIsSubmitting(false);
                setValidationErrors(error.response.data.errors);
                navigate('/login');
        });
    };

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-md-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={(e)=>loginAction(e)}>
                                    {/* Email */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            aria-describedby="emailHelp"
                                            onChange={(e)=>setEmail(e.target.value)}
                                        />
                                        {validationErrors.email && <div className="alert alert-danger mt-2">{validationErrors.email[0]}</div>}
                                    </div>
                                    {/* Password */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password"
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                        {validationErrors.password && <div className="alert alert-danger mt-2">{validationErrors.password[0]}</div>}
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                    <p className="text-center">
                                        Don't have an account? 
                                        <Link to="/register">Register</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;