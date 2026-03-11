import React, { useEffect, useState } from 'react'
import { FaReply, FaTrash } from "react-icons/fa"
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import axios from 'axios';

function DashboardProfile() {
  const [email, setEmail] = useState([])
  const [error, setError] = useState('')
  const [isModelOpen, setIsModelOpen] = useState(false)


  const TABLE_HEAD = ["Username.", "Message", "Email", "Date", "Actions"];

  const [currentpage, setCurrentPage] = useState(1)
  const itemsPerPage = 5;
  const start_ind = (currentpage - 1) * itemsPerPage
  const last_ind = start_ind + itemsPerPage
  const currentdata = email.slice(start_ind, last_ind)
  const totalpage = Math.ceil(email.length / itemsPerPage)
  const handelPageChange = (pageNo) => {
    setCurrentPage(pageNo)
  }

  const [replyData, setReplyData] = useState({
    to: '',
    subject: '',
    body: '',
    message: ''
  })
  
  
  
  const fetchEmails = () => {
    axios.get('https://sumit-dev-api.onrender.com/api/dashboard/profile')
    .then((response) => {
      const formattedEmails = response.data.map(email => {
        const date = new Date(email.date);

          // Format the date as "YYYY-MM-DD"
          const formattedDate = date.toISOString().split('T')[0]; // Extract date part (YYYY-MM-DD)

          // Return the email with the formatted date
          return {
            ...email,
            date: formattedDate, // Add the formatted date to the email object
          };
        });

        setEmail(formattedEmails)
      })
      .catch(() => {
        setError('Error while getting the emails');
      });
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleReply = async (e) => {
    // e.preventDefault()
    // Here you would typically send the form data to your API
    try {
      const reply = await axios.post(`https://sumit-dev-api.onrender.com/api/dashboard/mailreply`, {
        replyData
      })
      console.log("Replied mail:- ", replyData);
      setIsModelOpen(false)
    }
    catch (err) {
      console.log("Error:- ", err);
    }
  }

  const handleDeleteEmail = async (emailId) => {
    if (!window.confirm('Are you sure you want to delete this email?')) {
      return;
    }

    try {
      await axios.delete(`https://sumit-dev-api.onrender.com/api/dashboard/deleteemail`, {
        data: { _id: emailId }
      });
      console.log("Email deleted successfully");

      // Refresh the emails list
      fetchEmails();

      // If the current page becomes empty after deletion, go to the previous page
      const newTotalItems = email.length - 1;
      const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);
      if (currentpage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.log("Error while deleting email:", err);
      alert("Failed to delete email. Please try again.");
    }
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 rounded-2xl shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="text-white">
            <h2 className='text-4xl font-black mb-2'>
              Email Leads Dashboard
            </h2>
            <p className='text-lg opacity-90'>
              Manage and respond to contact form submissions
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform">
              <img className='w-full h-full object-cover' src="/profile.jpg" alt="Profile" />
            </div>
          </div>
        </div>
      </div>

      <div className="emailTable bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b-2 border-purple-200">
          <h3 className="text-xl font-black text-gray-800">Contact Submissions</h3>
        </div>
        <Card className="h-full w-full shadow-none">
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-purple-200 p-4"
                    >
                      <Typography
                        variant="small"
                        className="font-black text-gray-800 uppercase text-xs"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentdata.map(
                  ({ _id, img, name, username, email, message, date }, index) => {
                    const isLast = index === currentdata.length - 1;

                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-gray-100";

                    return (
                      <tr key={_id} className="hover:bg-purple-50/50 transition-colors">
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-black shadow-lg">
                              {username[0].toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                className="font-bold text-gray-800"
                              >
                                {username}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={`${classes} w-1/3 flex-wrap`}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600 line-clamp-2"
                          >
                            {message}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-medium text-blue-600"
                          >
                            {email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-mono text-gray-500 text-xs"
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex gap-2">
                            <Tooltip content="Reply">
                              <button className='px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-md hover:shadow-lg' variant="text" onClick={() => {
                                setIsModelOpen(true)
                                console.log("Clicked");
                                setReplyData({
                                  to: email,
                                  subject: 'Get In Touch Form submission',
                                  body: '',
                                  message:message
                                })
                              }}>
                                <FaReply />
                              </button>
                            </Tooltip>
                            <Tooltip content="Delete">
                              <button
                                className='px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors shadow-md hover:shadow-lg'
                                onClick={() => handleDeleteEmail(_id)}
                              >
                                <FaTrash />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t-2 border-purple-100 p-6 bg-gradient-to-r from-gray-50 to-purple-50">
            <Typography variant="small" className="font-bold text-gray-700">
              Page {currentpage} of {totalpage}
            </Typography>
            <div className="flex gap-3">
              <button
                className="px-5 py-2 rounded-lg bg-white border-2 border-purple-300 text-purple-600 font-bold hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                onClick={() => { handelPageChange(currentpage - 1) }}
                disabled={currentpage === 1}
              >
                Previous
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                onClick={() => { handelPageChange(currentpage + 1) }}
                disabled={currentpage === totalpage}
              >
                Next
              </button>
            </div>
          </CardFooter>
        </Card >
      </div>

      {isModelOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-6 py-4">
              <h2 className="text-2xl font-black text-white">Reply to Email</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Original Message */}
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Original Message:</p>
                <p className="text-sm text-gray-700 italic">{replyData.message}</p>
              </div>

              <label className="block">
                <span className="text-sm font-bold text-gray-700 mb-2 block">To:</span>
                <input
                  type="email"
                  value={replyData.to}
                  onChange={(e) => setReplyData({ ...replyData, to: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all font-medium"
                  placeholder="recipient@example.com"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-gray-700 mb-2 block">Subject:</span>
                <input
                  type="text"
                  value={replyData.subject}
                  onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all font-medium"
                  placeholder="Email subject..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-gray-700 mb-2 block">Message:</span>
                <textarea
                  rows="6"
                  value={replyData.body}
                  onChange={(e) => setReplyData({ ...replyData, body: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all resize-none"
                  placeholder="Write your reply here..."
                />
              </label>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t-2 border-gray-200">
              <button
                className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-colors shadow-md"
                onClick={() => setIsModelOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-colors shadow-lg"
                onClick={() => {
                  handleReply()
                }}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  )
}

export default DashboardProfile