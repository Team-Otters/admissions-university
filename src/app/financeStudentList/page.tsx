"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { MdDelete, MdOutlineFilterAlt } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import useDebounce from "@/hooks/useDebounce";

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
    "CCCD",
    "Tình trạng",
  ]);
  const [recentFilterGroupList, setRecentFilterGroupList] =
    useState(filterGroupList);
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [isOpenForm, setIsOpenForm] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<Student>();
  const [studentList, setStudentList] = React.useState<Student[]>([
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
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
    {
      id: "SV002",
      name: "Văn A",
      phone: "0449201842",
      email: "abc@gmail.com",
      birth: "12/1/2002",
      gender: true,
      CCCD: "094828991823",
      financeStatus: true,
    },
  ]);

  const [searchStudentList, setSearchStudentList] =
    React.useState<Student[]>(studentList);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // handle form submission here
  //   console.log(formData);
  //   setFormData({
  //     fullName: "",
  //     idNumber: "",
  //     dateOfBirth: "",
  //     gender: "",
  //     permanentResidence1: "",
  //     permanentResidence2: "",
  //     permanentResidence3: "",
  //     householdAddress1: "",
  //     householdAddress2: "",
  //     householdAddress3: "",
  //     placeOfBirth: "",
  //     ethnicity: "",
  //     idImage: "",
  //     secondSchool: "",
  //     phoneNumber: "",
  //     email: "",
  //   });
  // };

  //   const handleSubmit = (newWish: Wish): void => {
  //     let temp = wishlistData;
  //     temp.push(newWish);
  //     setWishlistData(temp);
  //   };

  const handleEditRow = (w: Student): void => {
    setRowToEdit(w);
    setIsOpenForm(true);
  };

  const search = (text: string): Student[] => {
    console.log(recentFilterGroupList);
    let temp: Student[] = studentList.filter((student) => {
      for (const element of recentFilterGroupList) {
        switch (element) {
          case "All":
            console.log(text.toLowerCase());
            if (
              student.id.toLowerCase().includes(text.toLowerCase()) ||
              student.name.toLowerCase().includes(text.toLowerCase()) ||
              student.phone.toLowerCase().includes(text.toLowerCase()) ||
              student.email.toLowerCase().includes(text.toLowerCase()) ||
              student.birth.toLowerCase().includes(text.toLowerCase()) ||
              (student.gender === true && text.toLowerCase().includes("nam")) ||
              student.CCCD.toLowerCase().includes(text.toLowerCase()) ||
              (student.financeStatus === true &&
                text.toLowerCase().includes("đã thu phí")) ||
              (student.gender === false && text.toLowerCase().includes("nữ")) ||
              (!student.financeStatus === false &&
                text.toLowerCase().includes("chưa thu phí"))
            ) {
              console.log("True nè");
              return student;
            }
            break;
          case "ID":
            if (student.id.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Tên thí sinh":
            if (student.name.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Số điện thoại":
            if (student.phone.toLowerCase().includes(text.toLowerCase())) {
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
              student.birth.toLowerCase().includes(text.toLowerCase())
            );
            if (student.birth.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Giới tính":
            if (student.gender === true && text.toLowerCase().includes("nam")) {
              return student;
            } else if (
              student.gender === false &&
              text.toLowerCase().includes("nữ")
            ) {
              return student;
            }
            break;
          case "CCCD":
            console.log(
              student.CCCD.toLowerCase().includes(text.toLowerCase())
            );
            if (student.CCCD.toLowerCase().includes(text.toLowerCase())) {
              return student;
            }
            break;
          case "Tình trạng":
            if (
              student.financeStatus === true &&
              text.toLowerCase().includes("đã thu phí")
            ) {
              return student;
            } else if (
              student.financeStatus === false &&
              text.toLowerCase().includes("chưa thu phí")
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

  const debounceSearch = useDebounce(searchText, 500);
  useEffect(() => {
    // if (debounceSearch == ''){
    //     setSearchExam({mostRelevant: [], albums: [], tracks: [], artists: []});
    // }
    // else {
    //     executeSearchQuery(debounceSearch);
    // }
    setSearchStudentList(search(searchText));
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
    console.log("abc: ", recentFilterGroupList);
    let temp = search(searchText);
    console.log("abc: ", temp);
    setSearchStudentList(temp);
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
              <th className="border-gray w-4 rounded-t-lg p-2">STT</th>
              <th className="border-l border-gray p-2 w-2/12">ID</th>
              <th className="border-l border-gray p-2 w-2/12">Tên thí sinh</th>
              <th className="border-l border-gray p-2">Số điện thoại</th>
              <th className="border-l border-gray p-2 w-2/12">Email</th>
              <th className="border-l border-gray p-2">Ngày sinh</th>
              <th className="border-l border-gray p-2">Giới tính</th>
              <th className="border-l border-gray p-2">CCCD</th>
              <th className="border-l border-gray p-2">Tình trạng</th>
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
                  <td className="px-2 py-1 border-r">{item.id}</td>
                  <td className="px-2 py-1 border-r">{item.name}</td>
                  <td className="px-2 py-1 border-r">{item.phone}</td>
                  <td className="px-2 py-1 border-r">{item.email}</td>
                  <td className="px-2 py-1 border-r">{item.birth}</td>
                  <td className="px-2 py-1 border-r">
                    {item.gender ? "Nam" : "Nữ"}
                  </td>
                  <td className="px-2 py-1 border-r">{item.CCCD}</td>
                  <td className="px-2 py-1">
                    {item.financeStatus ? "Đã thu phí" : "Chưa thu phí"}
                  </td>
                  <td className="flex flex-row justify-center h-9 self-center justify-self-center">
                    <button
                      className="cursor-pointer"
                      // onClick={() => {
                      //   handleEditRow(item);
                      // }}
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
