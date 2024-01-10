import axios  from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';


interface DataProps {
  name: string;
  is_active: boolean;

}

const Create = () => {

  const [selectedUser] = useState<DataProps>();

  const navigate = useNavigate();




  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    is_active: Yup.boolean().required('Required'),
  });

  const formik = useFormik({
    initialValues: selectedUser ?? {
      name: '',
      is_active: true,
    },
    validationSchema,
    onSubmit: async (data: DataProps) => {

        const token = window.localStorage.getItem('token')

        if (!token) {
            console.log('No token found. Redirecting to login.');
            navigate('/login');
            // Redirect to login or handle the absence of token
            return;
        }

        try {
            const response = await axios.post('https://mock-api.arikmpt.com/api/category/create',
            {
                name: data.name,
                is_active: data.is_active
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );

            console.log('Category created:', response.data.data);


            navigate('/category');
            // Handle login success (e.g., navigate to dashboard, store token)
        } catch (error) {
            console.error('create category error', error);
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
                      Create Category
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                      <div>
                          <label id="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                          <input type="name"  id="name" {...formik.getFieldProps('name')} placeholder="name" className="bg-red-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-red-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                          {formik.touched.name && formik.errors.name ?
                          <div className="text-red-500">{formik.errors.name}</div> : null}

                      </div>
                      <div>
                          <label id="is_active" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is Active</label>
                          <input type="is_active"  id="is_active" {...formik.getFieldProps('is_active')} placeholder="is_active" className="bg-red-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-red-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                          {formik.touched.is_active && formik.errors.is_active ?
                          <div className="text-red-500">{formik.errors.is_active}</div> : null}

                      </div>

                      <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-800 dark:text-white dark:border-gray-600 dark:hover:bg-red-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>

                  </form>
              </div>
          </div>
      </div>
    </section>

  );
};

export default Create;
