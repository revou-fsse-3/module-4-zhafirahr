import axios from 'axios';
import {useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {

  const navigate = useNavigate();
  const initialValues: RegisterValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'Password min 8 characters')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*#?&]+$/,
              'Password at least 8 characters include  one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .required('Password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://mock-api.arikmpt.com/api/user/register', values);
        console.log(response.data);
        navigate('/login');
        // Handle successful registration
      } catch (error) {
        console.error('Registration error', error);
        // Handle errors (e.g., show notification)
      }
    },
  });



  return (

        <section >
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-red-800 dark:border-gray-700">
                      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                              Register to your account
                          </h1>
                          <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                              <div>
                                  <label id="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                  <input type="text" id="fullname" {...formik.getFieldProps('name')} placeholder="Fullname" className="bg-red-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-red-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                  {formik.touched.name && formik.errors.name ?
                                    <div className="text-red-500">{formik.errors.name}</div> : null}
                              </div>
                              <div>
                                  <label id="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                                  <input type="email" id="email" {...formik.getFieldProps('email')} placeholder="Email" className="bg-red-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-red-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                  {formik.touched.email && formik.errors.email ?
                                    <div className="text-red-500">{formik.errors.email}</div> : null}

                              </div>
                              <div>
                                  <label id="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                  <input type="password"  id="password" {...formik.getFieldProps('password')} placeholder="Password" className="bg-red-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-red-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                  {formik.touched.password && formik.errors.password ?
                                  <div className="text-red-500">{formik.errors.password}</div> : null}

                              </div>

                              <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-800 dark:text-white dark:border-gray-600 dark:hover:bg-red-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Register</button>

                          </form>
                      </div>
                  </div>
              </div>
            </section>




  );
};

export default Register;
