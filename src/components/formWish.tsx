"use-client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const FormWish: React.FC<{
  closeModal: () => void;
  onSubmit: (data: Wish) => void;
  defaultValue: Wish;
}> = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      name: "",
      priority: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.id && formState.name && formState.priority) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      //   className="w-1/2 h-1/2 bg-white border border-black font-notoSans justify-center p-2 "
      className="z-20 w-5/6 sm:w-1/2 lg:w-1/3 h-1/4 bg-white flex items-center justify-center"
      onClick={(e) => {
        // if (e.target.className === "modal-container") closeModal();
      }}
    >
      {/* <div className="bg-mainBlue"> */}
      <form className="h-5/6 w-full items-center justify-center flex flex-col">
        <div className="flex flex-row">
          <label className="w-1/3 lg:w-1/2">Tên nguyện vọng</label>
          <input
            className="border border-black w-1/2 p-2"
            name="name"
            onChange={handleChange}
            type="text"
            value={formState.name}
          />
        </div>
        {errors && <div className="error">{`Please include: ${errors}`}</div>}
        <Button type="submit" className="mt-2" onClick={handleSubmit}>
          Lưu
        </Button>
      </form>
    </div>
    // </div>
  );
};

export default FormWish;
