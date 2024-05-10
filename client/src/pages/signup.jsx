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
    <div className="bg-cover min-h-screen flex justify-center items-center" style={{ backgroundImage: "url('/path/to/background/image.jpg')" }}>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                        <Field type="text" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="firstname" name="firstname" />
                        <ErrorMessage name="firstname" component="div" className="text-red-500 text-xs italic" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <Field type="text" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="lastname" name="lastname" />
                        <ErrorMessage name="lastname" component="div" className="text-red-500 text-xs italic" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                      <Field type="email" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="email" name="email" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                      <Field type="text" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="username" name="username" />
                      <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                      <Field type="password" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="password" name="password" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                      <Field type="tel" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="phone" name="phone" />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                      <Field type="text" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="address" name="address" />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing up...' : 'Signup'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="text-center text-gray-700">
              Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
