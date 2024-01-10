import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from './typeinter';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = window.localStorage.getItem('token')

      console.log(token);
      if (!token) {
        console.log('No token found. Redirecting to login.');
        navigate('/login');
        // Redirect to login or handle the absence of token
        return;
      }

      try {
        const response = await axios.get('https://mock-api.arikmpt.com/api/category', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (

      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-red-50 dark:bg-red-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                          NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                          LOGGED IN
                      </th>

                  </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="bg-white border-b dark:bg-red-800 dark:border-gray-700">
                    <td className="px-6 py-4">{category.id}</td>
                    <td className="px-6 py-4">{category.name}</td>
                    <td className="px-6 py-4">{category.is_active ? 'Yes' : 'No'}</td>
                  </tr>
                ))}

              </tbody>
          </table>
      </div>


  );
};

export default CategoryPage;
