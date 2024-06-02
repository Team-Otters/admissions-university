'use client'
import {Button, Col, Container, Row } from "react-bootstrap";
import { Pagination, Table } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import FormSubjectContainer from "@/components/formSubjectSet";
import { FaSearch } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { MdOutlineFilterAlt, MdDelete } from "react-icons/md";


const ExamDetail  = ({ params }) => { 
  const {id} = params;
    const [examList, setExamList] = React.useState<Exam[]>([
        {
            id: "EX001",
            name: "Kỳ thi 2021",
            year: "2021"
        },
        {
            id: "EX002",
            name: "Kỳ thi 2022",
            year: "2022"
        },        
        {
            id: "EX003",
            name: "Kỳ thi 2023",
            year: "2023"
        },       
        {
            id: "EX004",
            name: "Kỳ thi 2024",
            year: "2024"
        },
    ]);
    const [classList, setClassList] = React.useState<Class[]>([
      {
        id: "CL001",
        name: "Chuyên Toán",
        quotas: 30,
        year: "2021"
      },
      {
        id: "CL002",
        name: "Chuyên Toán 2",
        quotas: 30,
        year: "2021"
      },
      {
        id: "CL003",
        name: "Chuyên Hóa",
        quotas: 30,
        year: "2021"
      },
    ]);
    const [benchmarkList, setBenchmarkList] = React.useState<Benchmark[]>([
      {
        id: "BN001",
        exam: "EX001",
        class: "CL002",
        score: 0,
      },
      {
        id: "BN002",
        exam: "EX001",
        class: "CL003",
        score: 0,
      },
      {
        id: "BN003",
        exam: "EX001",
        class: "CL001",
        score: 0,
      },     
    ]
    );
    const [selectedExam, setSelectedExam] = React.useState<Exam>();
    const [examN, setExamN] = React.useState<string>();
    const [isInputFocused, setIsInputFocused] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>("");

    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value);
      };
      React.useEffect(() =>{
        let examName : Exam[] = examList.filter((exam) => {
          if (exam.id==id) return exam
        });
        setExamN(examName[0].name);
        // const sortList : Class[]  = classList.filter((item) =>{
        //   if (item.id == benchmarkList[0].class) return item;
        // });
        // setClassList(sortList);
      }, [])
      const findMatchingClass = (classId: string) => {
        // Find the class element in classList that has a matching ID with the provided classId
        const matchingClass = classList.find((cl) => cl.id === classId);
        return matchingClass;
      };
      

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 bg-white mb-4 col-auto h-5/6">
      <div>
        <h2 className="text-3xl">Chi tiết kỳ thi</h2>
        <div className="w-11/12 mx-auto flex flex-row justify-between">
        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Kỳ thi: {examN}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="p-2 w-1/12">STT</th>
              <th className="border-l border-gray p-2 w-2/12">Tên lớp</th>
              <th className="border-l border-gray p-2">Điểm chuẩn</th>
            </tr>
          </thead>
          <tbody>
            {benchmarkList.map((item, index) => {
               const matchingClass = findMatchingClass(item.class);
              return (
                <tr
                  className=" text-center border-b border-gray rounded-b-lg last:border-none"
                  key={index}
                  onClick={() => {}}
                >
                  <td className="px-2 py-1 border-r">{index + 1}</td>
                  <td className="px-2 py-1 border-r">
                    {
                    matchingClass?.name || ""}
                  </td>
                  <td className="px-2 py-1 border-r">{item.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
    </Container>
  );
}
export default ExamDetail;