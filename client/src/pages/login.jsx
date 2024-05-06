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

  // return (
  // <div className="container mx-auto mt-5">
  //   <div className="flex justify-center">
  //     <div className="w-full md:w-1/2">
  //       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  //         <h2 className="text-2xl text-center mb-4">Login</h2>
  //         {loginError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{loginError}</div>}
  //         <Formik
  //           initialValues={initialValues}
  //           validationSchema={validationSchema}
  //           onSubmit={handleSubmit}
  //         >
  //           {({ isSubmitting }) => (
  //             <Form>
  //               <div className="mb-4">
  //                 <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
  //                 <Field type="email" className="form-input w-full" id="email" name="email" />
  //                 <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
  //               </div>
  //               <div className="mb-6">
  //                 <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
  //                 <Field type="password" className="form-input w-full" id="password" name="password" />
  //                 <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
  //               </div>
  //               <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
  //                 {isSubmitting ? 'Logging in...' : 'Login'}
  //               </button>
  //             </Form>
  //           )}
  //         </Formik>
  //       </div>
  //       <div className="text-center">
  //         Don't have an account? <Link to="/signup" className="text-blue-500">Signup here</Link>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // );
  return (
    <div
      className="bg-cover min-h-screen flex justify-center items-center"
      style={{ backgroundImage: "url('/path/to/background/image.jpg')" }}
    >
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-3xl text-center mb-4 font-bold text-gray-800">Login</h2>
              {/* Display login error message */}
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
                  <Form>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <Field type="email" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="email" name="email" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                      <Field type="password" className="form-input w-full border border-gray-400 rounded py-2 px-3" id="password" name="password" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="text-center text-gray-700">
              Don't have an account? <Link to="/signup" className="text-blue-500">Signup here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
