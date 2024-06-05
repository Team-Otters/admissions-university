"use client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import FormExamRoom from "@/components/formExamRoom";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";

const VenueManageScreen: React.FC = () => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<ExamRoomManageForm>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [filterGroupList, setFilterGroupList] = useState([
    "All",
    "Mã phòng thi",
    "Tên môn thi",
    "Phòng thi",
    "Ngày thi",
  ]);
  const [recentFilterGroupList, setRecentFilterGroupList] =
    useState(filterGroupList);
  const [searchText, setSearchText] = React.useState<string>("");
  const [examRooms, setExamRooms] = useState<ExamRoomManageForm[]>([
  ]);

  const [searchExamRooms, setSearchExamRooms] =
    React.useState<ExamRoomManageForm[]>(examRooms);

  const search = (text: string): ExamRoomManageForm[] => {
    let temp: ExamRoomManageForm[] = examRooms.filter((exam) => {
      for (const element of recentFilterGroupList) {
        switch (element) {
          case "All":
            console.log(text.toLowerCase());
            if (
              exam.roomCode.toLowerCase().includes(text.toLowerCase()) ||
              exam.roomName.toLowerCase().includes(text.toLowerCase()) ||
              exam.subjectName.toLowerCase().includes(text.toLowerCase()) ||
              exam.date.toLowerCase().includes(text.toLowerCase())
            ) {
              return exam;
            }
            break;
          case "Mã phòng thi":
            if (exam.roomCode.toLowerCase().includes(text.toLowerCase())) {
              return exam;
            }
            break;
          case "Tên môn thi":
            if (exam.subjectName.toLowerCase().includes(text.toLowerCase())) {
              return exam;
            }
            break;
          case "Phòng thi":
            if (exam.roomName.toLowerCase().includes(text.toLowerCase())) {
              return exam;
            }
            break;
          case "Ngày thi":
            if (exam.date.toLowerCase().includes(text.toLowerCase())) {
              return exam;
            }
            break;
          default:
            console.log("Unknown search group");
        }
      }
    });
    return temp;
  };

  const applyFilter = (): void => {
    let selectElement = document.getElementById("filter") as HTMLSelectElement;
    console.log(selectElement.value);
    setRecentFilterGroupList([selectElement.value]);
  };
  const getAllExamRoom = async ()=>{
    try {       
      let token = localStorage.getItem('accessToken');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/exam_room',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
       //createUser(newUser);
       setExamRooms(response.data);
       console.log(response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  }
  React.useEffect(() => {
    getAllExamRoom();
    console.log("truoc khi search in filter: ", recentFilterGroupList);
    let temp = search(searchText);
    console.log("sau khi search in array ketqua: ", temp);
    setSearchExamRooms(temp);
  }, [recentFilterGroupList]);

  const debounceSearch = useDebounce(searchText, 500);
  useEffect(() => {
    // if (debounceSearch == ''){
    //     setSearchExam({mostRelevant: [], albums: [], tracks: [], artists: []});
    // }
    // else {
    //     executeSearchQuery(debounceSearch);
    // }
    setSearchExamRooms(search(searchText));
  }, [debounceSearch]);

  React.useEffect(() => {
    setSearchExamRooms(examRooms);
    setRecentFilterGroupList(["All"]);
    let selectElement = document.getElementById("filter") as HTMLSelectElement;
    selectElement.selectedIndex = 0;
    setSearchText("");
  }, [examRooms]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  const handleClearRow = (roomCode: string): void => {
    let temp: ExamRoomManageForm[] = [...examRooms];
    temp = temp.filter((value) => {
      if (value.roomCode !== roomCode) {
        return value;
      }
    });
    setExamRooms(temp);
  };

  const handleSubmit = async (data: ExamRoomManageForm)=> {
    try {       
      let token = localStorage.getItem('accessToken');
      let dt = JSON.stringify({
        "room": data.roomCode,
        "subject": data.subjectName,
        "date": data.date,
      })
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/admin/user',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        data: dt
      };
      const response = await axios.request(config);
       //createUser(newUser);
       getAllExamRoom();
       console.log(response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const handleEdit = (data: ExamRoomManageForm): void => {
    let idx: number = -1;
    examRooms.map((exRoom, index) => {
      if (exRoom.roomCode == data.roomCode) {
        idx = index;
      }
    });

    if (idx != -1) {
      let temp: ExamRoomManageForm[] = [...examRooms];
      temp[idx] = data || {
        roomCode: "",
        roomName: "",
        subjectName: "",
        date: "",
      };
      setExamRooms(temp);
      console.log(temp[idx]);
    } else {
      console.log("Lỗi update");
    }
  };

  const handleEditRow = (exRoom: ExamRoomManageForm): void => {
    setRowToEdit(exRoom);
    setIsOpenForm(true);
  };

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-1 mb-4">
        <h2 className="text-3xl">Quản lý phòng thi</h2>
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
          <div className="flex flex-row">
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
          <Button
            onClick={() => {
              setRowToEdit(undefined);
              setIsEdit(false);
              setIsOpenForm(true);
            }}
          >
            Tạo phòng thi
          </Button>
        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {searchExamRooms.length}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="p-2 w-1/12">STT</th>
              <th className="border-l border-gray p-2 w-2/12">Mã phòng thi</th>
              <th className="border-l border-gray p-2">Tên môn thi</th>
              <th className="border-l border-gray p-2">Phòng thi</th>
              <th className="border-l border-gray p-2">Ngày thi</th>
              <th className="w-12 border-gray p-2"></th>
            </tr>
          </thead>
          <tbody>
            {searchExamRooms.map((item, index) => {
              return (
                <tr
                  className="border-b border-gray rounded-b-lg last:border-none"
                  key={index}
                >
                  <td className="px-2 py-1 border-r">{index + 1}</td>
                  <td className="px-2 py-1 border-r">{item.roomCode}</td>
                  <td className="px-2 py-1 border-r">{item.subjectName}</td>
                  <td className="px-2 py-1 border-r">{item.roomName}</td>
                  <td className="px-2 py-1">{item.date}</td>
                  <td className="flex flex-row justify-center h-9 self-center justify-self-center">
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
                        handleClearRow(item.roomCode);
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
            <FormExamRoom
              examRooms={examRooms}
              closeModal={() => setIsOpenForm(false)}
              isEdit={isEdit}
              onSubmit={isEdit ? handleEdit : handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? { roomCode: "", roomName: "", subjectName: "", date: "" }
                  : rowToEdit
              }
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default VenueManageScreen;
