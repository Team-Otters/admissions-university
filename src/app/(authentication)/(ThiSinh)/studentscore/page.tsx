'use client'
import {Button, Col, Container, Row } from "react-bootstrap";
import { Pagination, Table } from "react-bootstrap";
import React from "react";
import Link from "next/link";


export default function StudentScore() {
    const [currentStudent, setCurrentStudent] = React.useState<Student>(
        {
          id: "SV001",
          name: "Văn AA",
          phone: "0449201842",
          email: "abc@gmail.com",
          birth: "12/1/2002",
          gender: true,
          CCCD: "094828991823",
          financeStatus: true,
        },
    );
    const [papers, setPapers] = React.useState<Papers[]>([
        {
            id: "PP001",
            student: "SV001",
            subject: "Toan",
            numOfPage: 1,
            score: 9,
        },
        {
            id: "PP002",
            student: "SV001",
            subject: "Ly",
            numOfPage: 1,
            score: 9,
        },
        {
            id: "PP003",
            student: "SV001",
            subject: "Hoa",
            numOfPage: 1,
            score: 9,
        },
    ]);
  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 bg-white mb-4 col-auto h-5/6">
        <div className="flex">
            <p className=" text-black text-2xl mt-4 ml-20 font-bold ">Tra cứu điểm thi</p>
        </div>
        <div className="ml-20">
          <div className=" flex flex-col">
            <p>Họ tên: {currentStudent.name}</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Stt</th>
                    <th>Tên môn</th>
                    <th>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                {papers.map((paper, index) => {
            // console.log(news);
            // console.log(index);
             
                console.log(`current index: ${index}`);
              return (
                <tr key={index}>
                    <td>{paper.id}</td>
                    <td>{paper.subject}</td>
                    <td>{paper.score}</td>
                </tr>
                );
                }
                )}
                </tbody>
            </Table>
          </div>

          </div>
      </div>
    </Container>
  );
}
