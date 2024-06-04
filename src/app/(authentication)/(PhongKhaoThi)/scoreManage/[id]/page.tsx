"use client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useDebounce from "@/hooks/useDebounce";
import FormPaper from "@/components/formPaper";

const ScoreManagePage: React.FC = ({ params}) => {
  const {id} = params;
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<ScoreManageForm>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isScoreInput, setIsScoreInput] = useState<boolean>(false);
  const [filterGroupList, setFilterGroupList] = useState([
    "All",
    "Mã bài thi",
    "Tên thí sinh",
    "Môn thi",
    "Ngày thi",
    "Điểm",
  ]);
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
  const [isValid, setIsValid] = React.useState<boolean>(false) 
  const [recentFilterGroupList, setRecentFilterGroupList] =
    useState(filterGroupList);
  const [searchText, setSearchText] = React.useState<string>("");
  const [papers, setPapers] = useState<ScoreManageForm[]>([
    {
      paperCode: "B001",
      studentCode: "SV001",
      studentName: "Nguyễn Văn A",
      subject: "Hóa Học",
      date: "06/06/2024",
      score: 10,
    },
    {
      paperCode: "B002",
      studentCode: "SV001",
      studentName: "Nguyễn Văn AA",
      subject: "Hóa Học",
      date: "06/06/2024",
      score: 10,
    },
    {
      paperCode: "B003",
      studentCode: "SV001",
      studentName: "Nguyễn Văn A",
      subject: "Hóa Học",
      date: "06/06/2024",
      score: 10,
    },
  ]);

  const [searchPapers, setSearchPapers] =
    React.useState<ScoreManageForm[]>(papers);

  const search = (text: string): ScoreManageForm[] => {
    let temp: ScoreManageForm[] = papers.filter((paper) => {
      for (const element of recentFilterGroupList) {
        switch (element) {
          case "All":
            console.log(text.toLowerCase());
            if (
              paper.paperCode.toLowerCase().includes(text.toLowerCase()) ||
              paper.studentName.toLowerCase().includes(text.toLowerCase()) ||
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

  const handleClearRow = (paper: ScoreManageForm): void => {
    let temp: ScoreManageForm[] = [...papers];
    temp = temp.filter((value) => {
      if (value.paperCode !== paper.paperCode) {
        return value;
      }
    });
    setPapers(temp);
  };

  const handleSubmit = (data: ScoreManageForm): void => {
    let temp = [...papers];
    temp.push(data);
    setPapers(temp);
  };

  const handleEdit = (data: ScoreManageForm): void => {
    let idx: number = -1;
    papers.map((paper, index) => {
      if (paper.paperCode == data.paperCode) {
        idx = index;
      }
    });

    if (idx != -1) {
      let temp: ScoreManageForm[] = [...papers];
      temp[idx] = data || {
        paperCode: "",
        studentCode: "",
        studentName: "",
        subject: "",
        date: "",
        score: 0,
      };
      setPapers(temp);
      console.log(temp[idx]);
    } else {
      console.log("Lỗi update");
    }
  };

  const handleEditRow = (paper: ScoreManageForm): void => {
    setRowToEdit(paper);
    setIsOpenForm(true);
  };

  const handleUpdateScore = (): void => {};

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-1 mb-4">
        <h2 className="text-3xl">{"Quản lý chấm thi > Xem túi bài thi"}</h2>
        <div className=" w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Mã túi bài thi:
        </div>
        <div className="w-11/12 mx-auto flex flex-row ">
          <div className=" flex-1 flex-row ">
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
          <div className="flex">
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
          </div>

          <Button className={`${isScoreInput? ` bg-lime-700` : ``} mr-0`}
            onClick={() => {
              if (isScoreInput) {
                handleUpdateScore();
              }
              setIsScoreInput(!isScoreInput);
            }}
          >
            {isScoreInput ? "Lưu điểm" : "Nhập điểm"}
          </Button>

        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {searchPapers.length}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="p-2 w-1/12">STT</th>
              <th className="border-l border-gray p-2 w-2/12">Mã bài thi</th>
              <th className="border-l border-gray p-2">Tên thí sinh</th>
              <th className="border-l border-gray p-2">Tên môn thi</th>
              <th className="border-l border-gray p-2">Ngày thi</th>
              <th className="border-l border-gray p-2 w-1/12">Điểm</th>
              <th className="w-12 border-gray p-2"></th>
            </tr>
          </thead>
          <tbody>
            {searchPapers.map((item, index) => {
              return (
                <tr
                  className="border-b border-gray rounded-b-lg last:border-none"
                  key={index}
                >
                  <td className="px-2 py-1 border-r">{index + 1}</td>
                  <td className="px-2 py-1 border-r">{item.paperCode}</td>
                  <td className="px-2 py-1 border-r">{item.studentName}</td>
                  <td className="px-2 py-1 border-r">{item.subject}</td>
                  <td className="px-2 py-1 border-r">{item.date}</td>
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
            <FormPaper
              papers={papers}
              closeModal={() => setIsOpenForm(false)}
              isEdit={isEdit}
              onSubmit={isEdit ? handleEdit : handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? {
                      paperCode: "",
                      studentCode: "",
                      studentName: "",
                      subject: "",
                      date: "",
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
