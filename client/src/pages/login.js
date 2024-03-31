import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authContext } from '../helpers/authContext';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const {setAuthState} = useContext(authContext)

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post("http://localhost:3001/auth/login", values)
      .then((response) => {
        // console.log(response.data)
        if(response.data.error){
            setLoginError(response.data.error)
            setAuthState(false)
        }
        else{
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem("username", response.data.username)
            setAuthState(true)
            setLoginError('')
            navigate('/')
        }
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card logincard">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login</h2>
            {loginError && <div className="alert alert-danger">{loginError}</div>}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field type="email" className="form-control" id="email" name="email" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field type="password" className="form-control" id="password" name="password" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="text-center mt-3">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
