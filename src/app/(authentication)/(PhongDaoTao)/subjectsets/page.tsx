'use client'
import {Button, Col, Container, Row } from "react-bootstrap";
import { Pagination, Table } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import FormSubjectContainer from "@/components/formSubjectSet";
import FormClass from "@/components/formClass";
import FormSubject from "@/components/formSubject";
import { FaSearch } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { MdOutlineFilterAlt, MdDelete } from "react-icons/md";


export default function SubjectManagement() {
  const [currentPage, setCurrentPape] = React.useState<Number>(1);
    const [subjectList, setSubjectList] = React.useState<Subject[]>([
        {
            id: "SJ001",
            name: "Toán ",
            parameter:"aa",
            time: "90",
        },
        {
            id: "SJ002",
            name: "Vật lý",
            parameter:"aa",
            time: "90",
        },
        {
            id: "SJ003",
            name: "Hóa học",
            parameter:"aa",
            time: "90",
        },
        {
            id: "SJ004",
            name: "Sinh học",
            parameter:"aa",
            time: "90",
        },
        {
            id: "SJ005",
            name: "Lịch sử",
            parameter:"aa",
            time: "90",
        },
        {
            id: "SJ006",
            name: "Địa lý",
            parameter:"aa",
            time: "90",
        },
        {
            id: "SJ007",
            name: "Giáo dục công dân",
            parameter:"aa",
            time: "90",
        },
        {
            id: "SJ008",
            name: "Văn học",
            parameter:"aa",
            time: "90",
        }
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
    const [subjectSetList, setSubjectSetList] = React.useState<SubjectSets[]>([
        {
            id: "SJS001",
            name: "A01",
            subjectList: ["SJ001", "SJ002", "SJ003"]
        },
        {
          id: "SJS002",
          name: "A02",
          subjectList: ["SJ004", "SJ005", "SJ006"]
      },
      {
        id: "SJS003",
        name: "D02",
        subjectList: ["SJ002", "SJ006", "SJ007"]
    }
    ]);

    const [isInputFocused, setIsInputFocused] = React.useState<boolean>(false);
    const [isOpenForm, setIsOpenForm] = React.useState<boolean>(false);
    const [rowClassToEdit, setRowClassToEdit] = React.useState<Class>();
    const [rowSubjectToEdit, setRowSubjectToEdit] = React.useState<Subject>();
    const [rowSubjectSetToEdit, setRowSubjectSetToEdit] = React.useState<SubjectSets>();
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>("");
    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value);
      };
      const handleSubmit = (data: SubjectSets): void => {
        let temp = [...subjectSetList];
        temp.push(data);
        setSubjectSetList(temp);
      };
    
      const handleEdit = (data: SubjectSets): void => {
        let idx: number = -1;
        subjectSetList.map((item, index) => {
          if (item.id == data.id) {
            idx = index;
          }
        });
    
        if (idx != -1) {
          let temp: SubjectSets[] = [...subjectSetList];
          temp[idx] = data || {
            id: "",
            name: "",
            subjectList: [],
          };
          setSubjectSetList(temp);
          console.log(temp[idx]);
        } else {
          console.log("Lỗi update");
        }
      };
      const handleClearRow = (subjectSet: SubjectSets): void => {

        let temp: SubjectSets[] = [...subjectSetList];
        temp = temp.filter((value) => {
          if (value.id !== subjectSet.id) {
            return value;
          }
        });
        setSubjectSetList(temp);
      };
      const handleClassSubmit = (data: Class): void => {
        let temp = [...classList];
        temp.push(data);
        setClassList(temp);
      };
    
      const handleClassEdit = (data: Class): void => {
        let idx: number = -1;
        classList.map((item, index) => {
          if (item.id == data.id) {
            idx = index;
          }
        });
    
        if (idx != -1) {
          let temp: Class[] = [...classList];
          temp[idx] = data || {
            id: "",
            name: "",
            year: "",
            quotas: 0
          };
          setClassList(temp);
          console.log(temp[idx]);
        } else {
          console.log("Lỗi update");
        }
      };
      const handleClassClearRow = (data: Class): void => {

        let temp: Class[] = [...classList];
        temp = temp.filter((value) => {
          if (value.id !== data.id) {
            return value;
          }
        });
        setClassList(temp);
      };
      const handleSubjectSubmit = (data: Subject): void => {
        let temp = [...subjectList];
        temp.push(data);
        setSubjectList(temp);
      };
    
      const handleSubjectEdit = (data: Subject): void => {
        let idx: number = -1;
        subjectList.map((item, index) => {
          if (item.id == data.id) {
            idx = index;
          }
        });
    
        if (idx != -1) {
          let temp: Subject[] = [...subjectList];
          temp[idx] = data || {
            id: "",
            name: "",
            parameter: "",
            time: ""
          };
          setSubjectList(temp);
          console.log(temp[idx]);
        } else {
          console.log("Lỗi update");
        }
      };
      const handleSubjectClearRow = (data: Subject): void => {

        let temp: Subject[] = [...subjectList];
        temp = temp.filter((value) => {
          if (value.id !== data.id) {
            return value;
          }
        });
        setSubjectList(temp);
      };
      const handleEditRow = (subs: SubjectSets): void => {
        setRowSubjectSetToEdit(subs);
        setIsOpenForm(true);
      };
      const handleClassEditRow = (subs: Class): void => {
        setRowClassToEdit(subs);
        setIsOpenForm(true);
      };
      const handleSubjectEditRow = (subs: Subject): void => {
        setRowSubjectToEdit(subs);
        setIsOpenForm(true);
      };
  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 mb-4 col-auto h-5/6">
      <div>
        <h2 className="text-3xl">Quản lý chấm thi</h2>
        <div className="flex flex-row mb-4">
        <a href="#" onClick={()=> {setCurrentPape(1)}} className={`${currentPage === 1 ? ' underline text-lime-700 decoration-lime-700':'no-underline text-black'} hover:underline text-2xl pr-6`}>Quản lý lớp</a><p></p>
        <a href="#" onClick={()=> {setCurrentPape(2)}} className={`${currentPage === 2 ? ' underline text-lime-700 decoration-lime-700':'no-underline text-black'} hover:underline text-2xl pr-6`}>Quản lý tổ hợp môn</a><p></p>
        <a href="#" onClick={()=> {setCurrentPape(3)}} className={`${currentPage === 3 ? ' underline text-lime-700 decoration-lime-700':'no-underline text-black'} hover:underline text-2xl pr-6`}>Quản lý môn</a><p></p>

        </div>
        {currentPage == 1? 
        <div>
               <div className="w-11/12 mx-auto flex flex-row justify-between">
                <div
                  className={`w-1/3 overflow-hidden h-12 rounded-3xl px-2 border ${
                    isInputFocused ? "border-2" : "border-1"
                  } flex flex-row`}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                >
                </div>
                <Button
                  onClick={() => {
                    setRowClassToEdit(undefined);
                    setIsEdit(false);
                    setIsOpenForm(true);
                  }}
                >
                  Thêm lớp
                </Button>
              </div>
              <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
                Tổng: {classList.length}
              </div>
              <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
                <thead>
                  <tr className="text-center text-blueTitle border-b border-gray">
                    <th className="p-2 w-1/12">STT</th>
                    <th className="border-l border-gray p-2 w-2/12">Mã lớp</th>
                    <th className="border-l border-gray p-2">Tên lóp</th>
                    <th className="border-l border-gray p-2">Năm</th>
                    <th className="border-l border-gray p-2">Chỉ tiêu</th>
                    <th className="w-12 border-gray p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {classList.map((item, index) => {
                    return (
                      <tr
                        className="border-b border-gray rounded-b-lg last:border-none"
                        key={index}
                      >
                        <td className="px-2 py-1 border-r">{index + 1}</td>
                        <td className="px-2 py-1 border-r">
                          {item.id}
                        </td>
                        <td className="px-2 py-1 border-r">{item.name}</td>
                        <td className="px-2 py-1 border-r">{item.year}</td>
                        <td className="px-2 py-1 border-r">{item.quotas}</td>
                        <td className="flex flex-row justify-center h-9 mr-1 self-center justify-self-center">
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setIsEdit(true);
                              handleClassEditRow(item);

                            }}
                          >
                            <FaPencil size={18} />
                          </button>
                          <button
                            className="cursor-pointer ml-1"
                            onClick={() => {
                              handleClassClearRow(item);
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
                  <FormClass
                    classList={classList}
                    closeModal={() => setIsOpenForm(false)}
                    isEdit={isEdit}
                    onSubmit={isEdit ? handleClassEdit : handleClassSubmit}
                    defaultValue={
                      rowClassToEdit === undefined
                        ? {
                            id: "",
                            name: "",
                            year: "",
                            quotas: 0
                          }
                        : rowClassToEdit
                    }
                  />
                </div>
              )}
        </div>
 : <></>}
        {currentPage == 2?       
          <div>
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
                    setRowSubjectSetToEdit(undefined);
                    setIsEdit(false);
                    setIsOpenForm(true);
                  }}
                >
                  Thêm tổ hợp môn
                </Button>
              </div>
              <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
                Tổng: {subjectSetList.length}
              </div>
              <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
                <thead>
                  <tr className="text-center text-blueTitle border-b border-gray">
                    <th className="p-2 w-1/12">STT</th>
                    <th className="border-l border-gray p-2 w-2/12">Mã tổ hợp</th>
                    <th className="border-l border-gray p-2">Tên tổ hợp</th>
                    <th className="w-12 border-gray p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {subjectSetList.map((item, index) => {
                    return (
                      <tr
                        className="border-b border-gray rounded-b-lg last:border-none"
                        key={index}
                      >
                        <td className="px-2 py-1 border-r">{index + 1}</td>
                        <td className="px-2 py-1 border-r">
                          {item.id}
                        </td>
                        <td className="px-2 py-1 border-r">{item.name}</td>
                        <td className="flex flex-row justify-center h-9 mr-1 self-center justify-self-center">
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setIsEdit(true);
                              handleEditRow(item);

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
                  <FormSubjectContainer
                    subjectSetsList={subjectSetList}
                    closeModal={() => setIsOpenForm(false)}
                    isEdit={isEdit}
                    onSubmit={isEdit ? handleEdit : handleSubmit}
                    defaultValue={
                      rowSubjectSetToEdit === undefined
                        ? {
                            id: "",
                            name: "",
                            subjectList: [],
                          }
                        : rowSubjectSetToEdit
                    }
                  />
                </div>
              )}
        </div>
 : <></>}
        {currentPage == 3? <div>
          <div>
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
                    setRowSubjectToEdit(undefined);
                    setIsEdit(false);
                    setIsOpenForm(true);
                  }}
                >
                  Thêm môn
                </Button>
              </div>
              <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
                Tổng: {subjectList.length}
              </div>
              <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
                <thead>
                  <tr className="text-center text-blueTitle border-b border-gray">
                    <th className="p-2 w-1/12">STT</th>
                    <th className="border-l border-gray p-2 w-2/12">Mã môn</th>
                    <th className="border-l border-gray p-2">Tên môn</th>
                    <th className="border-l border-gray p-2">Hệ số</th>                    
                    <th className="border-l border-gray p-2">Thời gian</th>
                    <th className="w-12 border-gray p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {subjectList.map((item, index) => {
                    return (
                      <tr
                        className="border-b border-gray rounded-b-lg last:border-none"
                        key={index}
                      >
                        <td className="px-2 py-1 border-r">{index + 1}</td>
                        <td className="px-2 py-1 border-r">
                          {item.id}
                        </td>
                        <td className="px-2 py-1 border-r">{item.name}</td>
                        <td className="px-2 py-1 border-r">{item.parameter}</td>
                        <td className="px-2 py-1 border-r">{item.time}</td>

                        <td className="flex flex-row justify-center h-9 mr-1 self-center justify-self-center">
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setIsEdit(true);
                              handleSubjectEditRow(item);

                            }}
                          >
                            <FaPencil size={18} />
                          </button>
                          <button
                            className="cursor-pointer ml-1"
                            onClick={() => {
                              handleSubjectClearRow(item);
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
                  <FormSubject
                    subjectList={subjectList}
                    closeModal={() => setIsOpenForm(false)}
                    isEdit={isEdit}
                    onSubmit={isEdit ? handleSubjectEdit : handleSubjectSubmit}
                    defaultValue={
                      rowSubjectToEdit === undefined
                        ? {
                            id: "",
                            name: "",
                            parameter: "",
                            time: ""
                          }
                        : rowSubjectToEdit
                    }
                  />
                </div>
              )}
        </div>

        </div> : <></>}

      </div>
      </div>
    </Container>
  );
}
