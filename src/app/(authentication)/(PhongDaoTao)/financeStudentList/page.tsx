"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";

const FinanceStudentManagermentPage: React.FC = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [filterGroupList, setFilterGroupList] = useState([
    "All",
    "ID",
    "Tên thí sinh",
    "Số điện thoại",
    "Email",
    "Ngày sinh",
    "Giới tính",
    "Tình trạng",
  ]);
  const [recentFilterGroupList, setRecentFilterGroupList] =
    useState(filterGroupList);
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [isOpenForm, setIsOpenForm] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<std>();
  const [studentList, setStudentList] = React.useState<std[]>([]);

  const [searchStudentList, setSearchStudentList] =
    React.useState<std[]>(studentList);


  const handleEditRow = (w: std): void => {
    setRowToEdit(w);
    setIsOpenForm(true);
  };

  const search = (text: string): std[] => {
    console.log(recentFilterGroupList);
    let temp: std[] = studentList.filter((student) => {
      for (const element of recentFilterGroupList) {
        switch (element) {
          case "All":
            console.log(text.toLowerCase());
            if (
              student.numberId.toLowerCase().includes(text.toLowerCase()) ||
              student.fullName.toLowerCase().includes(text.toLowerCase()) ||
              student.phoneNumber.toLowerCase().includes(text.toLowerCase()) ||
              student.email.toLowerCase().includes(text.toLowerCase()) ||
              student.placeOfBirth.toLowerCase().includes(text.toLowerCase()) ||
              (student.gender === "male" && text.toLowerCase().includes("nam")) 
            ) {
              console.log("True nè");
              return student;
            }
            break;
          case "ID":
            if (student.numberId.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Tên thí sinh":
            if (student.fullName.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Số điện thoại":
            if (student.phoneNumber.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Email":
            if (student.email.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Ngày sinh":
            console.log(text);
            console.log(
              student.dateOfBirth.toLowerCase().includes(text.toLowerCase())
            );
            if (student.dateOfBirth.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Giới tính":
            if (student.gender === "male" && text.toLowerCase().includes("nam")) {
              return student;
            } else if (
              student.gender === "female" &&
              text.toLowerCase().includes("nữ")
            ) {
              return student;
            }
            break;
          default:
            console.log("Unknown search group");
        }
      }
    });
    console.log(temp);
    return temp;
  };

  const getAllStudent = async () => {
    try {
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/student/all",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      const jsonData = response.data;
      console.log("fj: ", jsonData);

    // Alternative: Manual parsing with type safety (recommended)
    const studentss: std[] = jsonData.content.map((studentData: any) => ({
      id: studentData.id,
      fullName: studentData.profile.fullName,
      numberId: studentData.profile.numberId,
      gender: studentData.profile.gender,
      dateOfBirth: studentData.profile.dateOfBirth.toString(), // Assuming dateOfBirth is a number in milliseconds
      phoneNumber: studentData.profile.phoneNumber,
      email: studentData.profile.email,
      placeOfBirth: studentData.profile.placeOfBirth,
      ethnicType: studentData.profile.ethnicType,
      houseHold: studentData.profile.houseHold,
      address: studentData.profile.address,
      school: studentData.profile.school,
    }));

      setStudentList(studentss);
      console.log("sj: ", studentss);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }

  } 
  const debounceSearch = useDebounce(searchText, 500);
  useEffect(() => {
    // if (debounceSearch == ''){
    //     setSearchExam({mostRelevant: [], albums: [], tracks: [], artists: []});
    // }
    // else {
    //     executeSearchQuery(debounceSearch);
    // }
  }, [debounceSearch]);

  const applyFilter = (): void => {
    let selectElement = document.getElementById("filter") as HTMLSelectElement;
    console.log(selectElement.value);
    setRecentFilterGroupList([selectElement.value]);
    // let temp = search(searchText);
    // console.log("abc: ", temp);
    // setSearchStudentList(temp);
  };

  React.useEffect(() => {
    getAllStudent();
    console.log("abc: ", recentFilterGroupList);
    let temp = search(searchText);
    console.log("abc: ", temp);
    setSearchStudentList(temp);
    setSearchStudentList(search(searchText));
  }, [recentFilterGroupList]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="lg:p-1 p-1 mb-4">
        <h2 className="text-3xl">Quản lý thí sinh</h2>
        <div className="w-11/12 mx-auto flex flex-row">
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
          <MdOutlineFilterAlt className="self-center ml-2" size={24} />
          <select
            name="filter"
            id="filter"
            className="ml-2 rounded-xl border border-black"
            onChange={applyFilter}
          >
            {filterGroupList.map((item, index) => {
              return (
                <option key={index} value={`${item}`}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {searchStudentList.length}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="w-4 rounded-t-lg p-2">STT</th>
              <th className="border-l border-gray p-2 w-2/12">Student ID</th>
              <th className="border-l border-gray p-2 w-2/12">Tên thí sinh</th>
              <th className="border-l border-gray p-2">Số điện thoại</th>
              <th className="border-l border-gray p-2 w-2/12">Email</th>
              <th className="border-l border-gray p-2">Ngày sinh</th>
              <th className="border-l border-gray p-2">Giới tính</th>
              <th className="w-8 border-gray p-2"></th>
            </tr>
          </thead>
          <tbody>
            {searchStudentList.map((item, index) => {
              return (
                <tr
                  className="border-b border-gray rounded-b-lg last:border-none"
                  key={index}
                >
                  <td className="px-2 py-1 text-center border-r">
                    {index + 1}
                  </td>
                  <td className="px-2 py-1 border-r">{item.numberId}</td>
                  <td className="px-2 py-1 border-r">{item.fullName}</td>
                  <td className="px-2 py-1 border-r">{item.phoneNumber}</td>
                  <td className="px-2 py-1 border-r">{item.email}</td>
                  <td className="px-2 py-1 border-r">{item.dateOfBirth}</td>
                  <td className="px-2 py-1 border-r">
                    {item.gender ==="male" ? "Nam" : "Nữ"}
                  </td>
                  <td className="flex flex-row justify-center h-9 self-center justify-self-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        handleEditRow(item);
                      }}
                    >
                      <FaPencil size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <div className="flex justify-around mt-4 w-11/12 lg:w-8/12 xl:w-6/12 2xl:4/12 mx-auto">
          <Button
            className="bg-white border-black text-black"
            // onClick={handleClear}
          >
            Xóa tất cả
          </Button>
          <Button
            className="bg-mainBlue"
            onClick={() => {
              setRowToEdit(undefined);
              setIsOpenForm(true);
            }}
          >
            Thêm nguyện vọng
          </Button>
        </div> */}
        {/* {isOpenForm && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <FormWish
              closeModal={() => setIsOpenForm(false)}
              onSubmit={handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? { id: "", name: "", priority: -1 }
                  : rowToEdit
              }
            />
          </div>
        )} */}
      </div>
    </Container>
  );
};

export default FinanceStudentManagermentPage;
