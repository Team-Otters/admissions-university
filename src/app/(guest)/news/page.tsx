'use client'
import {Button, Col, Container, Row } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import React from "react";
import Link from "next/link";


export default function News() {
  const [newListData, setNewlistData] = React.useState<Post[]>([
    {
      title: "1 Thông báo lịch thi tập trung",
      date: "4:13, 12/5/2024",
      id: "",
      content: ""
    },
    {
      "title": "2 Thông báo tuyển sinh lớp 10 năm học 2024-2025",
      "date": "11:00, 20/4/2024",
      id: "",
      content: ""
    },
    {
      "title": "3 Kế hoạch tư vấn hướng nghiệp cho học sinh lớp 9",
      "date": "8:30, 15/4/2024",
      id: "",
      content: ""
    },
    {
      "title": "4 Thông báo kết quả thi học sinh giỏi cấp trường",
      "date": "14:20, 10/4/2024",
      id: "",
      content: ""
    },
    {
      "title": "5 Hội thảo định hướng cho phụ huyớp 9",
      "date": "9:00, 5/4/2024",
      id: "",
      content: ""
    },
    {
      "title": "6 Thông báo tuyển sinh lớp 6 vào trường THPT Chuyên",
      "date": "16:00, 30/3/2024",
      id: "",
      content: ""
    },
    {
      "title": "7 Kế hoạch hoạt động ngoại khóa hè 2024",
      "date": "10:30, 25/3/2024",
      id: "",
      content: ""
    },
    {
      "title": "8 Thông báo thành lập đội tuyển học sinh giỏi quốc gia",
      "date": "14:00, 20/3/2024",
      id: "",
      content: ""
    },
    {
        "title": "9 Thông báo kết quả thi học sinh giỏi cấp trường",
        "date": "14:20, 10/4/2024",
        id: "",
        content: ""
      },
      {
        "title": "10 Hội thảo định hướng cho phụ huynh học sinh lớp 9",
        "date": "9:00, 5/4/2024",
        id: "",
        content: ""
      },
    {
      "title": "11 ăm học 2023-2024",
      "date": "8:00, 15/3/2024",
      id: "",
      content: ""
    },
    {
      "title": "12 Khai giảng năm học 2023-2024",
      "date": "7:00, 5/9/2023",
      id: "",
      content: ""
    },
    {
        "title": "13 Thông báo kết quả thi học sinh giỏi cấp trường",
        "date": "14:20, 10/4/2024",
        id: "",
        content: ""
      },
      {
        "title": "14 Hội thphụ huynh học sinh lớp 9",
        "date": "9:00, 5/4/2024",
        id: "",
        content: ""
      },    {
        "title": "15 Thông báo kết quả trường",
        "date": "14:20, 10/4/2024",
        id: "",
        content: ""
      },
      {
        "title": "16 Hội thảo định hướng cho phụ huynh ",
        "date": "9:00, 5/4/2024",
        id: "",
        content: ""
      },    {
        "title": "17 Thông báo kết quả thi",
        "date": "14:20, 10/4/2024",
        id: "",
        content: ""
      },
      {
        "title": "18 Hội thảo định hướng cho phụ huynh học sinh lớp 9",
        "date": "9:00, 5/4/2024",
        id: "",
        content: ""
      },
  ]);
  const [currentPageNumber, setCurrentPageNumber] = React.useState(1);
  let length = newListData.length;
  let pageNumber = Math.ceil( length /10);
  let pageNumbers = Array.from({ length: pageNumber }, (_, i) => i + 1);
  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 bg-white mb-4 col-auto">
        <div className="flex flex-row justify-evenly">
            <p className=" text-black text-2xl mt-4 ml-20 font-bold "> Tin tức mới</p>
        </div>
        <div className="ml-20">
          {newListData.map((news, index) => {
            // console.log(news);
            // console.log(index);
            if (index + 1 <= currentPageNumber*10 && index + 1 >= currentPageNumber*10-10) {
                console.log(`current index: ${index}`);
              return (
                <div key={index} className=" flex">
                  <a href="#" className="no-underline hover:underline ...">{news.title} .</a>
                  <p>{news.date}</p>
                </div>
              );
            }
            else return (<></>);
          })}
          </div>
          <div className=" flex flex-row justify-evenly">
            <nav aria-label="Page navigation example" className=" justify-evenly">
            <ul className="pagination align-middle">
                    <li onClick={()=>currentPageNumber==1 ? 1 : setCurrentPageNumber(currentPageNumber -1 )}
                    className={`page-item ${currentPageNumber === 1 ? 'disabled' : ''}`}><a className="page-link" href="#" tabIndex="-1">Previous</a></li>
                    {pageNumbers.map((pageNumber) => (
                        <li onClick={()=>setCurrentPageNumber(pageNumber)} className={`page-item ${pageNumber === currentPageNumber ? 'active' : ''}`} key={pageNumber}>
                            <a className="page-link" href="#">{pageNumber}</a>
                        </li>
                    ))}
                    <li onClick={()=>currentPageNumber== pageNumber ? 1 : setCurrentPageNumber(currentPageNumber + 1)} 
                    className={`page-item ${currentPageNumber === pageNumber ? 'disabled' : ''}`}><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>

          </div>
      </div>
    </Container>
  );
}
