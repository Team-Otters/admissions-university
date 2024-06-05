'use client'
import { Button, Col, Container, Row } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  title: string;
  date: string;
  id: string;
  content: string;
}

export default function Notice() {
  const [newListData, setNewlistData] = useState<Post[]>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const length = newListData.length;
  const pageNumber = Math.ceil(length / 10);
  const pageNumbers = Array.from({ length: pageNumber }, (_, i) => i + 1);
 

  useEffect(() => {
    const fetchNotifications = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/notification',
        headers: { }
      };

      try {
        const response = await axios.request(config);
        setNewlistData(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleSearch = (event : any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = newListData.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModify = (id: string) => {
    localStorage.setItem('notificationId', id);
    window.location.href = `/notificationadjust`;
  };

  const handleDelete = async (id: string) => {
    try {
      console.log(id);
      // Get the token from local storage
      const token = localStorage.getItem("accessToken");
      
      // Make a DELETE request to the server endpoint with the specific ID and authorization token
      await axios.delete(`http://localhost:8080/admin/notification/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // If deletion is successful, remove the deleted item from the local state
      setNewlistData(prevData => prevData.filter(item => item.id !== id));
      
      console.log('Successfully deleted notification with ID:', id);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };
  


  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 bg-white mb-4 col-auto">
        <div className="flex flex-row justify-between mb-4">
          <p className="text-black text-2xl mt-12 ml-20 font-bold">Quản lý bài viết và thông báo</p>
        </div>
        <div className="flex flex-row justify-between mb-4 ml-20 mr-20">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border border-gray-400 rounded"
          />
          <Button variant="primary">Thêm bài viết</Button>
        </div>
        <div className="ml-20">
          {filteredData.map((news, index) => {
            if (index + 1 <= currentPageNumber * 10 && index + 1 > (currentPageNumber - 1) * 10) {
              return (
                <div key={index} className="flex justify-between mb-2">
                  <div>
                    <a href="#" className="no-underline hover:underline" >{news.title}</a>
                    <p>{news.date}</p>
                  </div>
                  <div>
                    <Button variant="warning" onClick={() => handleModify(news.id)} className="mr-2">Modify</Button>
                    <Button variant="danger" onClick={() => handleDelete(news.id)}>Delete</Button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="flex flex-row justify-evenly">
          <nav aria-label="Page navigation example" className="justify-evenly">
            <ul className="pagination align-middle">
              <li
                onClick={() => currentPageNumber === 1 ? null : setCurrentPageNumber(currentPageNumber - 1)}
                className={`page-item ${currentPageNumber === 1 ? 'disabled' : ''}`}
              >
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
              </li>
              {pageNumbers.map((pageNum) => (
                <li
                  onClick={() => setCurrentPageNumber(pageNum)}
                  className={`page-item ${pageNum === currentPageNumber ? 'active' : ''}`}
                  key={pageNum}
                >
                  <a className="page-link" href="#">{pageNum}</a>
                </li>
              ))}
              <li
                onClick={() => currentPageNumber === pageNumber ? null : setCurrentPageNumber(currentPageNumber + 1)}
                className={`page-item ${currentPageNumber === pageNumber ? 'disabled' : ''}`}
              >
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Container>
  );
}
