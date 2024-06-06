"use client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useDebounce from "@/hooks/useDebounce";
import FormPaper from "@/components/formPaper";
import axios from "axios";
import { host } from "@/constants/string";

const ScoreManagePage: React.FC = ({ params }) => {
  const { id } = params;
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<Paper>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isScoreInput, setIsScoreInput] = useState<boolean>(false);
  const [filterGroupList, setFilterGroupList] = useState([
    "All",
    "Mã bài thi",
    "Tên thí sinh",
    "Môn thi",
    "Điểm",
  ]);
  const [paperContainers, setPaperContainers] = useState<PaperContainer[]>([]);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [recentFilterGroupList, setRecentFilterGroupList] =
    useState(filterGroupList);
  const [searchText, setSearchText] = React.useState<string>("");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [searchPapers, setSearchPapers] = React.useState<Paper[]>([]);

  const search = (text: string): Paper[] => {
    let temp: Paper[] = papers.filter((paper) => {
      for (const element of recentFilterGroupList) {
        switch (element) {
          case "All":
            console.log(text.toLowerCase());
            if (
              paper.student.toLowerCase().includes(text.toLowerCase()) ||
              paper.subject.toLowerCase().includes(text.toLowerCase()) ||
              paper.date.toLowerCase().includes(text.toLowerCase()) ||
              paper.score.toString().includes(text)
            ) {
              return paper;
            }
            break;
          case "Mã bài thi":
            if (paper.paperCode.toLowerCase().includes(text.toLowerCase())) {
              return paper;
            }
            break;
          case "Tên thí sinh":
            if (paper.studentName.toLowerCase().includes(text.toLowerCase())) {
              return paper;
            }
            break;
          case "Tên môn thi":
            if (paper.subject.toLowerCase().includes(text.toLowerCase())) {
              return paper;
            }
            break;
          case "Ngày thi":
            if (paper.date.toLowerCase().includes(text.toLowerCase())) {
              return paper;
            }
            break;
          case "Điểm":
            if (paper.score.toString().includes(text)) {
              return paper;
            }
            break;
          default:
            console.log("Unknown search group");
        }
      }
    });
    return temp;
  };

  const getAllStudents = async (id: string) => {
    console.log(localStorage.getItem("accessToken"));
    try {
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${host}paper-containers/paper/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      //createUser(newUser);
      setStudents(response.data);
      console.log("td: ", response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const getAllPaper = async () => {
    console.log(localStorage.getItem("accessToken"));
    try {
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${host}paper`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      //createUser(newUser);
      setPapers(response.data);
      console.log("pp: ", response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
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
    setSearchPapers(temp);
  }, [recentFilterGroupList]);

  const debounceSearch = useDebounce(searchText, 500);
  useEffect(() => {
    // if (debounceSearch == ''){
    //     setSearchExam({mostRelevant: [], albums: [], tracks: [], artists: []});
    // }
    // else {
    //     executeSearchQuery(debounceSearch);
    // }
    setSearchPapers(search(searchText));
  }, [debounceSearch]);

  React.useEffect(() => {
    setSearchPapers(papers);
    setRecentFilterGroupList(["All"]);
    let selectElement = document.getElementById("filter") as HTMLSelectElement;
    selectElement.selectedIndex = 0;
    setSearchText("");
  }, [papers]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  const handleClearRow = async (id: string) => {
    try {
      let token = localStorage.getItem("accessToken");
      let dt = JSON.stringify({
        id: id,
      });
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${host}paper/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: dt,
      };
      const response = await axios.request(config).then((response) => {
        getAllPaper();
      });
      //createUser(newUser);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const handleSubmit = async (data: Paper) => {
    try {
      let token = localStorage.getItem("accessToken");
      let dt = JSON.stringify({
        studentId: data.student,
        subjectId: data.subject,
        numberOfPapers: 1,
        score: data.score,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${host}paper`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: dt,
      };
      const response = await axios.request(config).then((response) => {
        getAllPaper();
      });
      //createUser(newUser);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const handleEdit = async (data: Paper) => {
    try {
      let dt = JSON.stringify({
        studentId: data.student,
        subjectId: data.subject,
        numberOfPapers: 1,
        score: data.score,
      });
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${host}paper/${data.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: dt,
      };
      const response = await axios.request(config).then((response) => {
        getAllPaper();
      });
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const handleEditRow = (paper: Paper): void => {
    setRowToEdit(paper);
    setIsOpenForm(true);
  };

  useEffect(() => {
    getAllPaper();
    getAllStudents(id);
  }, []);

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-1 mb-4">
        <h2 className="text-3xl">{"Quản lý chấm thi > Xem túi bài thi"}</h2>
        <div className=" w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          {`Mã túi bài thi: ${id}`}
        </div>
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
            className={`${isScoreInput ? ` bg-lime-700` : ``} mr-0`}
            onClick={() => {
              setRowToEdit(undefined);
              setIsEdit(false);
              setIsOpenForm(true);
            }}
            // onClick={() => {
            //   if (isScoreInput) {
            //     handleUpdateScore();
            //   }
            //   setIsScoreInput(!isScoreInput);
            // }}
          >
            Thêm bài thi
          </Button>
        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {searchPapers?.length}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="p-2 w-1/12">STT</th>
              <th className="border-l border-gray p-2 w-2/12">Mã bài thi</th>
              <th className="border-l border-gray p-2">Tên thí sinh</th>
              <th className="border-l border-gray p-2">Tên môn thi</th>
              <th className="border-l border-gray p-2 w-1/12">Điểm</th>
              <th className="w-12 border-gray p-2"></th>
            </tr>
          </thead>
          <tbody>
            {searchPapers?.map((item, index) => {
              return (
                <tr
                  className="border-b border-gray rounded-b-lg last:border-none"
                  key={index}
                >
                  <td className="px-2 py-1 border-r">{index + 1}</td>
                  <td className="px-2 py-1 border-r">{item.id}</td>
                  <td className="px-2 py-1 border-r">{item.student?.name}</td>
                  <td className="px-2 py-1 border-r">{item.subject?.name}</td>
                  <td className="px-2 py-1 border-r">{item.score}</td>
                  <td className="px-2 py-1">
                    <input
                      className="bg-white"
                      disabled={!isScoreInput}
                      defaultValue={item.score}
                      type="number"
                      min={0}
                      max={10}
                    ></input>
                  </td>
                  <td className="flex flex-row justify-center h-9 mr-1 self-center justify-self-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setIsEdit(true);
                        handleEditRow({
                          id: item.id,
                          student: item.student?.id,
                          subject: item.subject?.id,
                          score: item.score,
                        });
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
            <FormPaper
              papers={papers}
              students={students}
              closeModal={() => setIsOpenForm(false)}
              isEdit={isEdit}
              onSubmit={isEdit ? handleEdit : handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? {
                      id: "",
                      student: students[0]?.id,
                      subject: "",
                      score: 0,
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

export default ScoreManagePage;
