"use client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import FormExamRoom from "@/components/formExamRoom";
import useDebounce from "@/hooks/useDebounce";
import { IoEye } from "react-icons/io5";
import FormPaperContainer from "@/components/formPaperContainer";
import {useRouter} from "next/navigation";

const ExamManagePage: React.FC = () => {
  const router = useRouter();
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<ExamManageForm>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [filterGroupList, setFilterGroupList] = useState([
    "All",
    "Mã túi thi",
    "Phòng thi",
    "Môn thi",
    "Ngày thi",
  ]);
  const [recentFilterGroupList, setRecentFilterGroupList] =
    useState(filterGroupList);
  const [searchText, setSearchText] = React.useState<string>("");
  const [paperContainers, setPaperContainers] = useState<ExamManageForm[]>([
    {
      paperContainerCode: "T001",
      roomName: "B5.08",
      subject: "Hóa Học",
      date: "06/06/2024",
      numberOfPapers: 40,
    },
    {
      paperContainerCode: "T002",
      roomName: "B1.14",
      subject: "Hóa Học",
      date: "06/06/2024",
      numberOfPapers: 40,
    },
    {
      paperContainerCode: "T002",
      roomName: "B4.14",
      subject: "Hóa Học",
      date: "06/06/2024",
      numberOfPapers: 40,
    },
  ]);

  const [searchPaperContainers, setSearchPaperContainers] =
    React.useState<ExamManageForm[]>(paperContainers);

  const search = (text: string): ExamManageForm[] => {
    let temp: ExamManageForm[] = paperContainers.filter((paperContainer) => {
      for (const element of recentFilterGroupList) {
        switch (element) {
          case "All":
            console.log(text.toLowerCase());
            if (
              paperContainer.paperContainerCode
                .toLowerCase()
                .includes(text.toLowerCase()) ||
              paperContainer.roomName
                .toLowerCase()
                .includes(text.toLowerCase()) ||
              paperContainer.subject
                .toLowerCase()
                .includes(text.toLowerCase()) ||
              paperContainer.date.toLowerCase().includes(text.toLowerCase())
            ) {
              return paperContainer;
            }
            break;
          case "Mã túi thi":
            if (
              paperContainer.paperContainerCode
                .toLowerCase()
                .includes(text.toLowerCase())
            ) {
              return paperContainer;
            }
            break;
          case "Phòng thi":
            if (
              paperContainer.roomName.toLowerCase().includes(text.toLowerCase())
            ) {
              return paperContainer;
            }
            break;
          case "Tên môn thi":
            if (
              paperContainer.subject.toLowerCase().includes(text.toLowerCase())
            ) {
              return paperContainer;
            }
            break;
          case "Ngày thi":
            if (
              paperContainer.date.toLowerCase().includes(text.toLowerCase())
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

  const handleClearRow = (paperContainer: ExamManageForm): void => {
    if (paperContainer.numberOfPapers > 0) {
      //in ra là không cho xóa
      return;
    }

    let temp: ExamManageForm[] = [...paperContainers];
    temp = temp.filter((value) => {
      if (value.paperContainerCode !== paperContainer.paperContainerCode) {
        return value;
      }
    });
    setPaperContainers(temp);
  };

  const handleSubmit = (data: ExamManageForm): void => {
    let temp = [...paperContainers];
    temp.push(data);
    setPaperContainers(temp);
  };

  const handleEdit = (data: ExamManageForm): void => {
    let idx: number = -1;
    paperContainers.map((paperContainer, index) => {
      if (paperContainer.paperContainerCode == data.paperContainerCode) {
        idx = index;
      }
    });

    if (idx != -1) {
      let temp: ExamManageForm[] = [...paperContainers];
      temp[idx] = data || {
        paperContainerCode: "",
        roomName: "",
        subjectName: "",
        date: "",
        numberOfPapers: 0,
      };
      setPaperContainers(temp);
      console.log(temp[idx]);
    } else {
      console.log("Lỗi update");
    }
  };

  const handleEditRow = (exRoom: ExamManageForm): void => {
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
          Tổng: {searchPaperContainers.length}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="p-2 w-1/12">STT</th>
              <th className="border-l border-gray p-2 w-2/12">Mã túi thi</th>
              <th className="border-l border-gray p-2">Phòng thi</th>
              <th className="border-l border-gray p-2">Tên môn thi</th>
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
                    {item.paperContainerCode}
                  </td>
                  <td className="px-2 py-1 border-r">{item.roomName}</td>
                  <td className="px-2 py-1 border-r">{item.subject}</td>
                  <td className="px-2 py-1 border-r">{item.date}</td>
                  <td className="px-2 py-1">{item.numberOfPapers}</td>
                  <td className="flex flex-row justify-center h-9 mr-1 self-center justify-self-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        handleEditRow(item);
                        router.push(
                            `/scoreManage/${item.paperContainerCode}`
                          )
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
            <FormPaperContainer
              paperContainers={paperContainers}
              closeModal={() => setIsOpenForm(false)}
              isEdit={isEdit}
              onSubmit={isEdit ? handleEdit : handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? {
                      paperContainerCode: "",
                      roomName: "",
                      subject: "",
                      date: "",
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
