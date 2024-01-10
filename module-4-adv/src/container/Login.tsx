import axios  from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


interface DataProps {
  email: string;
  password: string;

}

const Login = () => {

  const [selectedUser] = useState<DataProps>();

  const navigate = useNavigate();




  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: selectedUser ?? {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (data: DataProps) => {
      try {
        const response = await axios.post('https://mock-api.arikmpt.com/api/user/login', {
            email: data.email,
            password: data.password
        });
        console.log(response.data.data);
        window.localStorage.setItem('token', response.data.data.token)

        navigate('/category');
        // Handle login success (e.g., navigate to dashboard, store token)
      } catch (error) {
        console.error('Login error', error);
        // Handle login failure (e.g., show error message)
      }
    },
  });



  return (

    <section >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-red-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Login
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                      <div>
                          <label id="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input type="email"  id="email" {...formik.getFieldProps('email')} placeholder="Email" className="bg-red-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-red-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                          {formik.touched.email && formik.errors.email ?
                          <div className="text-red-500">{formik.errors.email}</div> : null}

                      </div>
                      <div>
                          <label id="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password"  id="password" {...formik.getFieldProps('password')} placeholder="Password" className="bg-red-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-red-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                          {formik.touched.password && formik.errors.password ?
                          <div className="text-red-500">{formik.errors.password}</div> : null}

                      </div>

                      <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-800 dark:text-white dark:border-gray-600 dark:hover:bg-red-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Login</button>

                  </form>
              </div>
          </div>
      </div>
    </section>

  );
};

export default Login;
