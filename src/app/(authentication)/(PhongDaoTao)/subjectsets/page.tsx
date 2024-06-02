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


export default function SubjectManagement() {
    const [subject, setSubject] = React.useState<Subject[]>([
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
    const [subjectSets, setSubjectSets] = React.useState<SubjectSets[]>([
        {
            id: "SJS001",
            name: "Toán",
            mainSubject: "SJ001",
            subjectList: ["SJ001", "SJ002"]
        }
    ]);
    const [isInputFocused, setIsInputFocused] = React.useState<boolean>(false);
    const [isOpenForm, setIsOpenForm] = React.useState<boolean>(false);
    const [rowToEdit, setRowToEdit] = React.useState<SubjectSets>();
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>("");
    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value);
      };
      const handleSubmit = (data: SubjectSets): void => {
        let temp = [...subjectSets];
        temp.push(data);
        setSubjectSets(temp);
      };
    
      const handleEdit = (data: SubjectSets): void => {
        let idx: number = -1;
        subjectSets.map((item, index) => {
          if (item.id == data.id) {
            idx = index;
          }
        });
    
        if (idx != -1) {
          let temp: SubjectSets[] = [...subjectSets];
          temp[idx] = data || {
            id: "",
            name: "",
            mainSubject: "",
            subjectList: [],
          };
          setSubjectSets(temp);
          console.log(temp[idx]);
        } else {
          console.log("Lỗi update");
        }
      };
      const handleClearRow = (subjectSet: SubjectSets): void => {

        let temp: SubjectSets[] = [...subjectSets];
        temp = temp.filter((value) => {
          if (value.id !== subjectSet.id) {
            return value;
          }
        });
        setSubjectSets(temp);
      };
      const handleEditRow = (subs: SubjectSets): void => {
        setRowToEdit(subs);
        setIsOpenForm(true);
      };
  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 bg-white mb-4 col-auto h-5/6">
      <div>
        <h2 className="text-3xl">Quản lý chấm thi</h2>
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
              setIsEdit(false);
              setIsOpenForm(true);
            }}
          >
            Thêm tổ hợp môn
          </Button>
        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {subjectSets.length}
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
            {subjectSets.map((item, index) => {
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
              subjectSetsList={subjectSets}
              closeModal={() => setIsOpenForm(false)}
              isEdit={isEdit}
              onSubmit={isEdit ? handleEdit : handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? {
                      id: "",
                      name: "",
                      mainSubject: "",
                      subjectList: [],
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
