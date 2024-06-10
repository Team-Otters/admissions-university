'use client';
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { useRouter } from "next/navigation";
import { host } from "@/constants/string";

interface Post {
  title: string;
  date: string;
  id: string;
  content: string;
}

export default function News() {
  const [newListData, setNewListData] = useState<Post[]>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [length, setLength] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}notification`,
        headers: {}
      };

      try {
        const response = await axios.request(config);
        setNewListData(response.data);
        setLength(response.data.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const pageNumber = Math.ceil(length / 10);
  const pageNumbers = Array.from({ length: pageNumber }, (_, i) => i + 1);

  const handleClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 bg-white mb-4 col-auto">
        <div className="flex flex-row justify-evenly">
          <p className="text-black text-2xl mt-4 ml-20 font-bold">Tin tức mới</p>
        </div>
        <div className="ml-20">
          {newListData.map((news, index) => {
            if (index + 1 <= currentPageNumber * 10 && index + 1 >= currentPageNumber * 10 - 10) {
              return (
                <div key={index} className="flex justify-between mb-2">
                  <div>
                    <a href="#" onClick={() => handleClick(news.id)} className="no-underline hover:underline">
                      {news.title}
                    </a>
                    <p>{news.date}</p>
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
                onClick={() => currentPageNumber === 1 ? 1 : setCurrentPageNumber(currentPageNumber - 1)}
                className={`page-item ${currentPageNumber === 1 ? 'disabled' : ''}`}
              >
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
              </li>
              {pageNumbers.map((pageNumber) => (
                <li
                  onClick={() => setCurrentPageNumber(pageNumber)}
                  className={`page-item ${pageNumber === currentPageNumber ? 'active' : ''}`}
                  key={pageNumber}
                >
                  <a className="page-link" href="#">{pageNumber}</a>
                </li>
              ))}
              <li
                onClick={() => currentPageNumber === pageNumber ? 1 : setCurrentPageNumber(currentPageNumber + 1)}
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
