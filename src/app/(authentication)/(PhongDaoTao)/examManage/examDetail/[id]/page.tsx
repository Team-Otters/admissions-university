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
import axios from "axios";

const ExamDetail  = ({ params }) => { 
  const {id} = params;
    const [examList, setExamList] = React.useState<Exam[]>([]);
    const [classList, setClassList] = React.useState<Class[]>([
    ]);
    const [benchmarkList, setBenchmarkList] = React.useState<Benchmark[]>([    ]
    );
    const [filteredBenchmarkList, setFilteredBenchmarkList] = React.useState<Benchmark[]>([]);
    const [selectedExam, setSelectedExam] = React.useState<Exam>();
    const [examN, setExamN] = React.useState<string>();
    const [isInputFocused, setIsInputFocused] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>("");

    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value);
      };
      const getAllBenchmark = async () => {
        try {       
          let token = localStorage.getItem('accessToken');
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/bench_mark',
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          const response = await axios.request(config);
           //createUser(newUser);
           setBenchmarkList(response.data);
           console.log(response.data);
          // Handle successful login based on your API's response structure
        } catch (error) {
          console.error(error); // Handle errors appropriately (e.g., display error messages)
        }
      }
      const getAllClass = async () => {
        try {       
          let token = localStorage.getItem('accessToken');
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/major_class',
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          const response = await axios.request(config);
           //createUser(newUser);
           setClassList(response.data);
           console.log(response.data);
          // Handle successful login based on your API's response structure
        } catch (error) {
          console.error(error); // Handle errors appropriately (e.g., display error messages)
        }
      }
      const changeName = async () => {
        try {       
          let token = localStorage.getItem('accessToken');
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/exam/${id}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          const response = await axios.request(config);
           //createUser(newUser);
           setExamN(response.data.name);
           console.log(response.data);
          // Handle successful login based on your API's response structure
        } catch (error) {
          console.error(error); // Handle errors appropriately (e.g., display error messages)
        }
      }
      React.useEffect(() =>{
        getAllBenchmark();
        getAllClass();
        changeName();
        // const sortList : Class[]  = classList.filter((item) =>{
        //   if (item.id == benchmarkList[0].class) return item;
        // });
        const filtered = benchmarkList.filter((benchmark) => benchmark.examId === id); // Assuming 'examId' property exists in Benchmark
        setFilteredBenchmarkList(filtered);
      }, [id, benchmarkList]);
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
            {filteredBenchmarkList.map((item, index) => {
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