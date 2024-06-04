"use-client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormClass: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: Class) => void;
  defaultValue: Class;
  classList: Class[];
}> = ({ closeModal, isEdit, onSubmit, defaultValue, classList}) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;

  const validateForm = () => {
    if (
      formState.id != "" &&
      formState.name != "" &&
      formState.year != "" &&
      formState.quotas != 0 
    ) {
      const isIdExists = classList.some(
        (subSet) => subSet.id == formState.id
      );

      if (!isEdit && isIdExists) {
        setErrors(
          "Mã lớp đã tồn tại! Vui lòng nhập một mã khác."
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
              errorFields.push("Mã lớp");
              break;
            case "name":
              errorFields.push("Tên lớp");
              break;
            case "year":
              errorFields.push("Năm");
              break;            
            case "quotas":
              errorFields.push("Chỉ tiêu");
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
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Mã lớp</label>
          <input
            className="border border-black w-1/2 p-2"
            name="id"
            onChange={handleChange}
            type="text"
            value={formState.id}
            disabled={isEdit}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Tên lớp</label>
          <input
            className="border border-black w-1/2 p-2"
            name="name"
            onChange={handleChange}
            type="text"
            value={formState.name}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Năm</label>
          <input
            className="border border-black w-1/2 p-2"
            name="year"
            onChange={handleChange}
            type="text"
            value={formState.year}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Chỉ tiêu</label>
          <input
            className="border border-black w-1/2 p-2"
            name="quotas"
            onChange={handleChange}
            type="number"
            value={formState.quotas}
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

export default FormClass;
