"use-client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormSubject: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: Subject) => void;
  defaultValue: Subject;
  subjectList: Subject[];
}> = ({ closeModal, isEdit, onSubmit, defaultValue, subjectList }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;
  //const [formSubjectList, setFormSubjectList] = useState<String[]>(formState.subjectList);


  const validateForm = () => {
    if (
      //formState.id != "" &&
      formState.name   != "" &&
      formState.parameter != "" &&
      formState.time != ""
    ) {
      const isIdExists = subjectList.some(
        (subSet) => subSet.id == formState.id
      );

      if (!isEdit && isIdExists) {
        setErrors(
          "Mã môn đã tồn tại! Vui lòng nhập một mã khác."
        );
        return false;
      } 
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            case "name":
              errorFields.push("Tên lớp");
              break;
            case "parameter":
              errorFields.push("Hệ số");
              break;
            case "time":
              errorFields.push("Thời gian");
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
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("invalid")
      return;};
    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      //   className="w-1/2 h-1/2 bg-white border border-black font-notoSans justify-center p-2 "
      className="z-20 w-5/6 sm:w-1/2 lg:w-1/3 h-4/6 pt-2 bg-white flex items-center justify-around font-notoSans border rounded-3xl"
      onClick={(e) => {
        // if (e.target. === "modal-container") closeModal();
      }}
    >
      <form className="h-5/6 w-full items-center justify-around flex flex-col">
        {isEdit?
        <div className="flex flex-row w-4/6">
        <label className="w-1/3 lg:w-1/2">Mã môn</label>
        <input
          className="border border-black w-1/2 p-2"
          name="id"
          onChange={handleChange}
          type="text"
          value={formState.id}
          disabled={isEdit}
        />
      </div>
: <></>
      }
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Tên môn</label>
          <input
            className="border border-black w-1/2 p-2"
            name="name"
            onChange={handleChange}
            type="text"
            value={formState.name}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Hệ số</label>
          <input
            className="border border-black w-1/2 p-2"
            name="parameter"
            onChange={handleChange}
            type="text"
            value={formState.parameter}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Thời gian</label>
          <input
            className="border border-black w-1/2 p-2"
            name="time"
            onChange={handleChange}
            type="text"
            value={formState.time}
          />
        </div>
        {errors && <div className="text-center">{errors}</div>}
        <div className="flex flex-row w-1/2 justify-around">
          <Button type="submit" className="mt-2" onClick={closeModal}>
            Thoát
          </Button>
          <Button type="submit" className="mt-2 ml-4" onClick={handleSubmit}>
            {isEdt ? "Lưu" : "Thêm tổ hợp"}
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default FormSubject;
