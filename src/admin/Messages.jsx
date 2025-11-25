import React from "react";

const Messages = () => {
  // Dummy static messages (UI only)
  const messages = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      message: "I want to know about delivery time.",
      date: "20 Jan 2025",
    },
    {
      id: 2,
      name: "Aisha Khan",
      email: "aisha123@gmail.com",
      message: "My payment failed but money was deducted.",
      date: "22 Jan 2025",
    },
    {
      id: 3,
      name: "Ramesh Kumar",
      email: "ramesh@gmail.com",
      message: "Need help with product return.",
      date: "24 Jan 2025",
    },
  ];

  return (
    <div className="px-6 py-10 md:px-16">
      <h1 className="text-3xl font-bold text-center mb-10">Messages</h1>

      <div className="bg-white p-6 shadow-lg rounded-xl overflow-x-auto">
        <table className="w-full border-collapse text-left">

          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 px-2">Message ID</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Email</th>
              <th className="py-3 px-2">Message</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">

                <td className="py-3 px-2">#{msg.id}</td>
                <td className="py-3 px-2">{msg.name}</td>
                <td className="py-3 px-2">{msg.email}</td>

                <td className="py-3 px-2 w-[280px]">
                  <p className="truncate">{msg.message}</p>
                </td>

                <td className="py-3 px-2">{msg.date}</td>

                {/* ACTION BUTTON */}
                <td className="py-3 px-2 text-center">
                  <button className="px-4 py-1 text-xs bg-red-500 text-white rounded-lg">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Messages;
