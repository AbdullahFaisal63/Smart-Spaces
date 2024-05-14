import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authContext } from '../helpers/authContext';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { setAuthState } = useContext(authContext);

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
        if (response.data.error) {
          setLoginError(response.data.error);
          setAuthState(false);
        } else {
          sessionStorage.setItem("accessToken", response.data.accessToken);
          sessionStorage.setItem("userid", response.data.userid);
          setAuthState(true);
          setLoginError('');
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <section className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <div className="text-center mb-6">
                <a href="/" className="flex items-center justify-center mb-10 text-2xl font-semibold text-gray-90">
                  <img className="h-8 mr-2" src="1.png" alt="logo" />
                  Smart Spaces
                </a>
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x text-center mb-6">
                Sign in to your account
              </h1>
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  {loginError}
                </div>
              )}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4 md:space-y-6">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Your email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@company.com"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500">Remember me</label>
                        </div>
                      </div>
                      <Link to="#" className="text-sm font-medium text-yellow-600 hover:underline">Forgot password?</Link>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-c6a569 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-c6a569 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging in...' : 'Sign in'}
                    </button>
                    <p className="text-sm font-light text-gray-500">
                      Don’t have an account yet? <Link to="/signup" className="font-medium text-yellow-600 hover:underline">Sign up</Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
