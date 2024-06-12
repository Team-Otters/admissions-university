'use client'
import { Button, Col, Container, Row } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { host } from "@/constants/string";
import APIFacade from "@/context/login";


export default function Notice() {
  const router= useRouter();
  const [newListData, setNewlistData] = useState<Post[]>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const length = newListData.length;
  const pageNumber = Math.ceil(length / 10);
  const pageNumbers = Array.from({ length: pageNumber }, (_, i) => i + 1);
  const index = -1;
 

  const getAllPost = async () => { 
    try{
      const response = await APIFacade.getAllPost();
      setNewlistData(response);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  
  React.useEffect(() => {
    getAllPost();
  }, []);

  const handleSearch = (event : any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = newListData.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModify = (id: string) => {
    localStorage.setItem('notificationId', id);
    window.location.href = `/notificationadjust/${id}`;
  };

  const handleDelete = async (id: string) => {
    try {
      await APIFacade.deletePost(id);
      getAllPost();
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
          <Button variant="primary" onClick={()=>{router.push("/notificationadd")}}>Thêm bài viết</Button>
        </div>
        <div className="ml-20">
          {filteredData.map((news, index) => {
            if (index + 1 <= currentPageNumber * 10 && index + 1 > (currentPageNumber - 1) * 10) {
              return (
                <div key={index} className="flex justify-between mb-2">
                  <div>
                    <a href="#" className="no-underline hover:underline" >{news.title}</a>
                    <p>{news.day}</p>
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
                <a className="page-link" href="#" tabIndex={index}>Previous</a>
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
