import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    axios.post("http://localhost:3001/users", values)
      .then((response) => {
        console.log('registered!');
        setIsSuccess(true);
        resetForm();
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
          <h2 className="text-center mb-4">Signup Form</h2>
          {isSuccess && (
            <div className="alert alert-success" role="alert">
              Registration successful!
            </div>
          )}
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <Field type="text" className="form-control" id="firstname" name="firstname" />
                  <ErrorMessage name="firstname" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <Field type="text" className="form-control" id="lastname" name="lastname" />
                  <ErrorMessage name="lastname" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" className="form-control" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field type="text" className="form-control" id="username" name="username" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field type="password" className="form-control" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Field type="tel" className="form-control" id="phone" name="phone" />
                  <ErrorMessage name="phone" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field type="text" className="form-control" id="address" name="address" />
                  <ErrorMessage name="address" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Signup'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
