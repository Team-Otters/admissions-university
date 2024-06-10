"use client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useDebounce from "@/hooks/useDebounce";
import { IoEye } from "react-icons/io5";
import FormPaperContainer from "@/components/formPaperContainer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { formatDate } from "@/utils/something";
import { host } from "@/constants/string.js";
import APIFacade from "@/context/login";

const ExamManagePage: React.FC = () => {
  const router = useRouter();
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<ExamManageForm>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [filterGroupList, setFilterGroupList] = useState([
    "All",
    "Phòng thi",
    "Môn thi",
    "Ngày thi",
  ]);
  const [recentFilterGroupList, setRecentFilterGroupList] =
    useState(filterGroupList);
  const [searchText, setSearchText] = React.useState<string>("");
  const [examRooms, setExamRooms] = useState<ExamRoomManageForm[]>([]);
  const [examRoomDetails, setExamRoomsDetails] = useState<ExamRoomDetail[]>([]);
  const [paperContainers, setPaperContainers] = useState<ExamManageForm[]>([]);

  const getAllPaperContainers = async () => {
    try {
      const response = await APIFacade.getAllPaperContainers();
      //createUser(newUser);
      setPaperContainers(response);
      console.log("pc: ", response);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const getAllExamRoom = async () => {
    try {
      const response = await APIFacade.getAllExamRoom();
      //createUser(newUser);
      setExamRooms(response);
      console.log("er: ", response);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const getAllExamDetail = async () => {
    try {

      const response = await APIFacade.getAllExamDetail();
      //createUser(newUser);
      setExamRoomsDetails(response);
      console.log("pc: ", response);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const [searchPaperContainers, setSearchPaperContainers] =
    React.useState<ExamManageForm[]>(paperContainers);

  const search = (text: string): ExamManageForm[] => {
    let temp: ExamManageForm[] = paperContainers.filter((paperContainer) => {
      for (const element of recentFilterGroupList) {
        switch (element) {
          case "All":
            console.log(text.toLowerCase());
            if (
              paperContainer.examRooms?.room.name
                .toLowerCase()
                .includes(text.toLowerCase()) ||
              paperContainer.examRooms?.subject.name
                .toLowerCase()
                .includes(text.toLowerCase()) ||
              formatDate(paperContainer.examRooms?.date)
                .toLowerCase()
                .includes(text.toLowerCase())
            ) {
              return paperContainer;
            }
            break;
          case "Phòng thi":
            if (
              paperContainer.examRooms?.room.name
                .toLowerCase()
                .includes(text.toLowerCase())
            ) {
              return paperContainer;
            }
            break;
          case "Môn thi":
            if (
              paperContainer.examRooms?.subject.name
                .toLowerCase()
                .includes(text.toLowerCase())
            ) {
              return paperContainer;
            }
            break;
          case "Ngày thi":
            if (
              formatDate(paperContainer.examRooms?.date)
                .toLowerCase()
                .includes(text.toLowerCase())
            ) {
              return paperContainer;
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

  React.useEffect(() => {
    console.log("truoc khi search in filter: ", recentFilterGroupList);
    let temp = search(searchText);
    console.log("sau khi search in array ketqua: ", temp);
    setSearchPaperContainers(temp);
  }, [recentFilterGroupList]);

  const debounceSearch = useDebounce(searchText, 500);
  useEffect(() => {
    // if (debounceSearch == ''){
    //     setSearchExam({mostRelevant: [], albums: [], tracks: [], artists: []});
    // }
    // else {
    //     executeSearchQuery(debounceSearch);
    // }
    setSearchPaperContainers(search(searchText));
  }, [debounceSearch]);

  React.useEffect(() => {
    setSearchPaperContainers(paperContainers);
    setRecentFilterGroupList(["All"]);
    let selectElement = document.getElementById("filter") as HTMLSelectElement;
    selectElement.selectedIndex = 0;
    setSearchText("");
  }, [paperContainers]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  const handleClearRow = async (paperContainer: ExamManageForm) => {
    if (paperContainer.numberOfPapers > 0) {
      alert("Không thể xóa");
      return;
    }

    try {
      const response = await APIFacade.deletePaperContainer(paperContainer);
        getAllPaperContainers();
      //createUser(newUser);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const handleSubmit = async (data: ExamManageForm) => {
    try {
      const response = await APIFacade.addPaperContainer(data)
        getAllPaperContainers();
      //createUser(newUser);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const handleEdit = async (data: ExamManageForm) => {
    try {
      const response = await APIFacade.updatePaperContainer(data);
        getAllPaperContainers();
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const handleEditRow = (exRoom: ExamManageForm): void => {
    setRowToEdit(exRoom);
    // setIsOpenForm(true);
  };

  useEffect(() => {
    getAllPaperContainers();
    getAllExamRoom();
    getAllExamDetail();
  }, []);

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-1 mb-4">
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
            Thêm túi bài thi
          </Button>
        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {searchPaperContainers?.length || 0}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="p-2 w-1/12">STT</th>
              <th className="border-l border-gray p-2">Phòng thi</th>
              <th className="border-l border-gray p-2">Môn thi</th>
              <th className="border-l border-gray p-2">Ngày thi</th>
              <th className="border-l border-gray p-2 w-2/12">Số lượng</th>
              <th className="w-12 border-gray p-2"></th>
            </tr>
          </thead>
          <tbody>
            {searchPaperContainers.map((item, index) => {
              return (
                <tr
                  className="border-b border-gray rounded-b-lg last:border-none"
                  key={index}
                >
                  <td className="px-2 py-1 border-r">{index + 1}</td>
                  <td className="px-2 py-1 border-r">
                    {item.examRooms?.room.name || ""}
                  </td>
                  <td className="px-2 py-1 border-r">
                    {item.examRooms?.subject.name || ""}
                  </td>
                  <td className="px-2 py-1 border-r">
                    {formatDate(item.examRooms?.date) || ""}
                  </td>
                  <td className="px-2 py-1">{item.numberOfPapers}</td>
                  <td className="flex flex-row justify-center h-9 mr-1 self-center justify-self-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        handleEditRow(item);
                        router.push(`/scoreManage/${item.id}`);
                      }}
                      //   onClick={() => {
                      //     setIsEdit(true);
                      //     handleEditRow(item);
                      //   }}
                    >
                      <IoEye size={20} />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setIsEdit(true);
                        handleEditRow({
                          id: item.id,
                          subjectId: item.examRooms.subject.id,
                          examRoomId: item.examRooms.id,
                          numberOfPapers: item.numberOfPapers,
                        });
                        setIsOpenForm(true);
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
            <FormPaperContainer
              paperContainers={paperContainers}
              examRooms={examRooms}
              closeModal={() => setIsOpenForm(false)}
              isEdit={isEdit}
              onSubmit={isEdit ? handleEdit : handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? {
                      id: "",
                      examRoomId: examRooms[0]?.id || "",
                      subjectId: examRooms[0]?.subject.id || "",
                      numberOfPapers: 0,
                    }
                  : rowToEdit
              }
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ExamManagePage;
