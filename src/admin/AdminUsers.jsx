import React, { useEffect, useState } from "react";
import { getUsersApi } from "../Services/AllApi";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersApi();

        if (res.status === 200) {
          setUsers(res.data); // backend returns array
        }
      } catch (err) {
        console.log("Error fetching users:", err);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-6 py-10 md:px-16">
      <h1 className="text-3xl font-bold text-center mb-10">Users List</h1>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading users...</p>
      )}

      {/* TABLE */}
      {!loading && (
        <div className="bg-white p-6 shadow-lg rounded-xl overflow-x-auto">
          <table className="w-full border-collapse text-left">

            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-3 px-2">User ID</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Email</th>
            
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">

                    <td className="py-3 px-2">#{user._id.slice(-5)}</td>
                    <td className="py-3 px-2">{user.username}</td>
                    <td className="py-3 px-2">{user.email}</td>
                    <td className="py-3 px-2">{user.joined}</td>

                    {/* ACTION BUTTON */}
                   

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-600 text-lg"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
