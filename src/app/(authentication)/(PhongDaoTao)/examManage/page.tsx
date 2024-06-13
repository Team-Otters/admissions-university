'use client'
import {Button, Col, Container, Row } from "react-bootstrap";
import { Pagination, Table } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import FormExam from "@/components/formExam";
import { FaSearch } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { MdOutlineFilterAlt, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import { redirect } from 'next/navigation'
import { host } from "@/constants/string";
import APIFacade from "@/context/login";
export default function ExamManagement() { 
    const [examList, setExamList] = React.useState<Exam[]>([]);
    const [isOpenForm, setIsOpenForm] = React.useState<boolean>(false);
    const [selectedExam, setSelectedExam] = React.useState<Exam>();
    const [isInputFocused, setIsInputFocused] = React.useState<boolean>(false);
    const [rowToEdit, setRowToEdit] = React.useState<Exam>();
    const [searchText, setSearchText] = React.useState<string>("");
    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value);
      };
      const handleSubmit = async (data: Exam) => {
          try{
            await APIFacade.getInstance().addExam(data);
            getAllExam(); 
          }catch(error){
            console.error(error); // Handle errors appropriately (e.g., display error messages)

          }
      };
      const router = useRouter();
      const handleEdit = (data: Exam): void => {
        let idx: number = -1;
        examList.map((item, index) => {
          if (item.id == data.id) {
            idx = index;
          }
        });
    
        if (idx != -1) {
          let temp: Exam[] = [...examList];
          temp[idx] = data || {
            id: "",
            name: "",
            year: "",
          };
          setExamList(temp);
          console.log(temp[idx]);
        } else {
          console.log("Lỗi update");
        }
      };
      const handleClearRow = async (data: Exam) => {

          try{
            const response = await APIFacade.getInstance().deleteExam(data.id);
            getAllExam();
          }catch(error){
            console.error(error); // Handle errors appropriately (e.g., display error messages)

          }

      };
      const handleEditRow = (subs: Exam): void => {
        setRowToEdit(subs);
      };
      const getAllExam = async () => {
        try {       
            const response = await APIFacade.getInstance().getAllExam();
             //createUser(newUser);
             setExamList(response);
             console.log(response);
            // Handle successful login based on your API's response structure
          } catch (error) {
            console.error(error); // Handle errors appropriately (e.g., display error messages)
          }
      }
      React.useEffect(() => {
        getAllExam();
        // if (debounceSearch == ''){
        //     setSearchExam({mostRelevant: [], albums: [], tracks: [], artists: []});
        // }
        // else {
        //     executeSearchQuery(debounceSearch);
        // }
      },[]);
    
   return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 mb-4 col-auto h-5/6">
      <div>
        <h2 className="text-3xl">Quản lý kỳ thi</h2>
        <div className="w-11/12 mx-auto flex flex-row justify-between">
          <div
            className={`w-1/3 bg-white overflow-hidden h-12 rounded-3xl px-2 border-black border ${
              isInputFocused ? "border-2" : "border-1"
            } flex flex-row`}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          >
            <input
              className="w-full focus:border-transparent focus:outline-none"
              placeholder="Tìm kiếm..."
              type="search"
              value={searchText}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={handleSearchText}
            ></input>
            <FaSearch className="w-2/12 lg:w-1/12 self-center" />
          </div>
          <Button
            onClick={() => {
              setRowToEdit(undefined);
              setIsOpenForm(true);
            }}
          >
            Thêm kỳ thi
          </Button>
        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {examList.length}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="p-2 w-1/12">STT</th>
              <th className="border-l border-gray p-2 w-2/12">Mã kỳ thi</th>
              <th className="border-l border-gray p-2">Tên kỳ thi</th>
              <th className="border-l border-gray p-2">Năm thi</th>
              <th className="w-12 border-gray p-2"></th>
            </tr>
          </thead>
          <tbody>
            {examList.map((item, index) => {
              return (
                <tr
                  className=" text-center border-b border-gray rounded-b-lg last:border-none"
                  key={index}
                  onClick={() => {}}
                >
                  <td className="px-2 py-1 border-r">{index + 1}</td>
                  <td className="px-2 py-1 border-r">
                    {item.id}
                  </td>
                  <td className="px-2 py-1 border-r">{item.name}</td>
                  <td className="px-2 py-1 border-r">{item.year}</td>
                  <td className="flex flex-row justify-center h-9 mr-1 self-center justify-self-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        //handleEditRow(item);
                        console.log(item.id);
                        router.push(
                            `/examManage/examDetail/${item.id}`
                          )
                      }}
                    >
                      <FaPencil size={18} />
                    </button>
                    <button
                      className="cursor-pointer ml-1"
                      onClick={() => {
                        handleClearRow(item);
                      }}
                    >
                      <MdDelete size={24} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isOpenForm && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <FormExam
              examList={examList}
              closeModal={() => setIsOpenForm(false)}
              onSubmit={ handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? {
                      id: "",
                      name: "",
                      year: "",
                    }
                  : rowToEdit
              }
            />
          </div>
        )}
      </div>
      </div>
    </Container>
  );
}
