"use-client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormExam: React.FC<{
  closeModal: () => void;
  onSubmit: (data: Exam) => void;
  defaultValue: Exam;
  examList: Exam[];
}> = ({ closeModal, onSubmit, defaultValue, examList }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
const [List, setExamList] = useState(examList);
  const validateForm = () => {
    if (
      formState.id != "" &&
      formState.name != "" &&
      formState.year != ""
    ) {
      const isIdExists = examList.some(
        (subSet) => subSet.id == formState.id
      );

      if (isIdExists) {
        setErrors(
          "Mã kỳ thi đã tồn tại! Vui lòng nhập một mã khác."
        );
        return false;
      } 
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            case "id":
              errorFields.push("Mã kỳ thi");
              break;
            case "name":
              errorFields.push("Tên kỳ thi");
              break;
            case "year":
              errorFields.push("Năm thi");
              break;
            default:
              break;
          }
        }
      }
      setErrors("Vui lòng nhập: " + errorFields.join(", "));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };


    //updateSelectedSubjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      //   className="w-1/2 h-1/2 bg-white border border-black font-notoSans justify-center p-2 "
      className="z-20 w-5/6 sm:w-1/2 lg:w-1/3 h-2/6 pt-2 bg-white flex items-center justify-around font-notoSans border rounded-3xl"
      onClick={(e) => {
        // if (e.target. === "modal-container") closeModal();
      }}
    >
      {/* <div className="bg-mainBlue"> */}
      <form className="h-5/6 w-full items-center justify-around flex flex-col">
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Mã kỳ thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="id"
            onChange={handleChange}
            type="text"
            value={formState.id}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Tên kỳ thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="name"
            onChange={handleChange}
            type="text"
            value={formState.name}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Năm thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="year"
            onChange={handleChange}
            type="text"
            value={formState.year}
          />
        </div>
        {errors && <div className="text-center">{errors}</div>}
        <div className="flex flex-row w-1/2 justify-around">
          <Button type="submit" className="mt-2" onClick={closeModal}>
            Thoát
          </Button>
          <Button type="submit" className="mt-2 ml-4" onClick={handleSubmit}>
            {"Thêm kỳ thi"}
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default FormExam;
