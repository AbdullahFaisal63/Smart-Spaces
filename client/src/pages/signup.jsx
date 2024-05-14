import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authContext } from '../helpers/authContext';

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();
  const { setAuthState } = useContext(authContext);

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    address: ''
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("http://localhost:3001/auth/register", values);
      console.log('registered!');
      setSignupError('');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setSignupError('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="text-center mb-6">
                <a href="/" className="flex items-center justify-center mb-4 text-2xl font-semibold text-gray-900">
                  <img className="h-8 mr-6" src="1.png" alt="logo" />
                  Smart Spaces
                </a>
              </div>
              <h2 className="text-3xl text-center mb-4 font-bold text-gray-800">Signup</h2>
              {signupError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  {signupError}
                </div>
              )}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <Field type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id="firstname" name="firstname" />
                        <ErrorMessage name="firstname" component="div" className="text-red-500 text-xs italic" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <Field type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id="lastname" name="lastname" />
                        <ErrorMessage name="lastname" component="div" className="text-red-500 text-xs italic" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                      <Field type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id="email" name="email" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                      <Field type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id="username" name="username" />
                      <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                      <Field type="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id="password" name="password" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                      <Field type="tel" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id="phone" name="phone" />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                      <Field type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id="address" name="address" />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-c6a569 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-c6a569 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing up...' : 'Signup'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="text-center text-gray-700">
              Already have an account? <Link to="/login" className="text-yellow-600 hover:underline">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
