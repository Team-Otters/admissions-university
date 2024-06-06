"use-client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const FormPaper: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: Paper) => void;
  defaultValue: Paper;
  papers: Paper[];
  students: Student[];
}> = ({ closeModal, isEdit, onSubmit, defaultValue, papers, students }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;

  const validateForm = () => {
    if (formState.student != "") {
      const isDuplication = papers.some(
        (paper) =>
          paper.id != formState.id && paper.student == formState.student
      );

      if (isDuplication) {
        setErrors("Thí sinh đã có bài thi trong túi thi này.");
        return false;
      } else if (formState.score < 0 || formState.score > 10) {
        setErrors("Điểm của thí sinh phải từ 0 đến 10.");
        return false;
      }
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if ((key != "id" && value == "") || (key != "subject" && value == "")) {
          switch (key) {
            case "student":
              errorFields.push("Mã thí sinh");
              break;
            default:
              break;
          }
        }
      }
      setErrors("Vui lòng nhập: " + errorFields.join(", "));
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  // useEffect(() => {
  //   //gọi api update lại tên thí sinh
  // }, [formState.studentCode]);

  return (
    <div
      //   className="w-1/2 h-1/2 bg-white border border-black font-notoSans justify-center p-2 "
      className="z-20 w-5/6 sm:w-1/2 lg:w-1/3 h-1/2 bg-white flex items-center justify-around font-notoSans border rounded-3xl"
      onClick={(e) => {
        // if (e.target. === "modal-container") closeModal();
      }}
    >
      {/* <div className="bg-mainBlue"> */}
      <form className="h-5/6 w-full items-center justify-around flex flex-col">
        {/* <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Mã bài thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="paperCode"
            onChange={handleChange}
            type="text"
            value={formState.id}
            disabled={isEdit}
          />
        </div> */}
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Mã thí sinh</label>
          <select
            name="student"
            onChange={handleChange}
            className="border border-black w-1/2 p-2"
            id="student"
            value={formState.student}
          >
            {students?.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.id || ""}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Điểm</label>
          <input
            className="border border-black w-1/2 p-2"
            name="score"
            onChange={handleChange}
            type="text"
            value={formState.score}
          />
        </div>
        {/* <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Tên thí sinh</label>
          <input
            className="border border-black w-1/2 p-2"
            name="studentCode"
            type="text"
            disabled
            value={formState.studentName}
          />
        </div> */}
        {errors && <div className="text-center">{errors}</div>}
        <div className="flex flex-row w-1/2 justify-around">
          <Button type="submit" className="mt-2" onClick={closeModal}>
            Thoát
          </Button>
          <Button type="submit" className="mt-2 ml-4" onClick={handleSubmit}>
            {isEdt ? "Lưu" : "Thêm bài thi"}
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default FormPaper;
