import React, { useEffect, useState } from 'react'
import { FaReply } from "react-icons/fa"
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


  const TABLE_HEAD = ["Username.", "Message", "Email", "Date", "Reply"];

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
  
  
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/dashboard/profile')
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
  }, []);

  const handleReply = async (e) => {
    // e.preventDefault()
    // Here you would typically send the form data to your API
    try {
      const reply = await axios.post(`http://localhost:8080/api/dashboard/mailreply`, {
        replyData
      })
      console.log("Replied mail:- ", replyData);
      setIsModelOpen(false)
    }
    catch (err) {
      console.log("Error:- ", err);


    }
  }

  return (
    // <div>dashboardProfile</div>
    <>
      <div className="w-full flex justify-between items-center p-5  ">
        <div className="">
          <h2 className='text-3xl font-semibold mb-4 '><span className='text-red-500 font-bold'>SUMIT</span> TIWARI</h2>
          <h3 className='text-2xl font-semibold'>A <span className='text-red-500 font-bold underline decoration-dashed'>FullStack</span> Developer</h3>
        </div>
        <div className="">
          <img className='w-40 h-40 object-cover rounded-full' src="/profile.jpg" alt="Profile" />
        </div>
      </div>
      <hr className="w-full border border-black mt-2" />

      <div className="emailTable">
        <Card className="h-full w-full ">
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentdata.map(
                  ({ img, name, username, email, message, date }, index) => {
                    const isLast = index === currentdata.length - 1;

                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={img} alt={name} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {username}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={`${classes} w-1/3 flex-wrap`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {message}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Reply">
                            <button className='flex justify-center items-center' variant="text" onClick={() => {
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
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page {currentpage} of {totalpage}
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm" onClick={() => { handelPageChange(currentpage - 1) }} disabled={currentpage === 1}>
                Previous
              </Button>
              <Button variant="outlined" size="sm" onClick={() => { handelPageChange(currentpage + 1) }} disabled={currentpage === totalpage}>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card >
      </div>

      {isModelOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Reply to Email</h2>
            <label className="block mb-2">
              <span className="text-gray-700">To:</span>
              <input
                type="email"
                value={replyData.to}
                onChange={(e) => setReplyData({ ...replyData, to: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Subject:</span>
              <input
                type="text"
                value={replyData.subject}
                onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Body:</span>
              <textarea
                rows="5"
                value={replyData.body}
                onChange={(e) => setReplyData({ ...replyData, body: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsModelOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
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