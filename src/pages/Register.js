import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
            navigate('/dashboard');
        }
    }, []);

    const registerAction = (e) => {
        //on va empêcher le formulaire de se soumettre
        e.preventDefault();

        setIsSubmitting(true);

        let payload = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        };

        axios.post('/api/register', payload)
            .then(response => {
                setIsSubmitting(false);
                localStorage.setItem('token', response.data.access_token);
                navigate('/dashboard');
            })
            .catch(error => {
                setIsSubmitting(false);
                setValidationErrors(error.response.data.errors);
                navigate('/register');
        });
    };

    return (
        <layout>
            <div className="container">
                <div className="row justify-content-md-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Register</div>
                            <div className="card-body">
                                <form onSubmit={(e)=>registerAction(e)}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="name" 
                                            name="name" 
                                            value={name} 
                                            onChange={(e)=>setName(e.target.value)} 
                                        />
                                        {validationErrors.name !== undefined &&
                                            <div className="flex flex-col">
                                                <small className="alert alert-danger">
                                                    {validationErrors.name[0]}
                                                </small>
                                            </div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)}
                                        />
                                        {validationErrors.email !== undefined &&
                                            <div className="flex flex-col">
                                                <small className="alert alert-danger">
                                                    {validationErrors.email[0]}
                                                </small>
                                            </div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                        {validationErrors.password !== undefined &&
                                            <div className="flex flex-col">
                                                <small className="alert alert-danger">
                                                    {validationErrors.password[0]}
                                                </small>
                                            </div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password_confirmation" className="form-label">Password Confirmation</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={password_confirmation}
                                            onChange={(e)=>setPasswordConfirmation(e.target.value)}
                                        />
                                        {validationErrors.password_confirmation !== undefined &&
                                            <div className="flex flex-col">
                                                <small className="alert alert-danger">
                                                    {validationErrors.password_confirmation[0]}
                                                </small>
                                            </div>
                                        }
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </layout>
    );

}

export default Register;