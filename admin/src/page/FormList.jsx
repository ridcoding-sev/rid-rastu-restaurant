import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/form/list"
      );

      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);


return (
  <div className="min-h-screen bg-slate-100 p-4 md:p-8">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
        Contact Messages
      </h1>

      <p className="mt-2 text-slate-500">
        View and manage all customer messages
      </p>
    </div>

    {/* Container */}
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

      {loading ? (
        <div className="py-20 text-center text-slate-500">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          No messages found
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-5 text-left">Name</th>
                  <th className="px-6 py-5 text-left">Email</th>
                  <th className="px-6 py-5 text-left">Phone</th>
                  <th className="px-6 py-5 text-left">Message</th>
                  <th className="px-6 py-5 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5 font-semibold text-slate-800">
                      {msg.name}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {msg.email}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {msg.phone || "-"}
                    </td>

                    <td className="px-6 py-5 max-w-sm truncate text-slate-600">
                      {msg.message}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Mobile + Tablet Cards */}
          <div className="lg:hidden p-4 space-y-5">

            {messages.map((msg) => (
              <div
                key={msg._id}
                className="rounded-3xl border border-slate-200 bg-white shadow-md p-5 hover:shadow-xl duration-300"
              >

                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg text-slate-800">
                    {msg.name}
                  </h2>

                  <span className="text-sm text-slate-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-3">

                  <div>
                    <p className="text-xs text-slate-400">
                      EMAIL
                    </p>
                    <p className="text-slate-700">
                      {msg.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      PHONE
                    </p>
                    <p className="text-slate-700">
                      {msg.phone || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      MESSAGE
                    </p>

                    <p className="text-slate-600 leading-7">
                      {msg.message}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </>
      )}
    </div>
  </div>
);

};

export default ContactMessages;