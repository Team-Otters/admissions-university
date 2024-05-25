"use-client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const FormAccount: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: Account) => void;
  defaultValue: Account;
  accounts: Account[];
}> = ({ closeModal, isEdit, onSubmit, defaultValue, accounts }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;

  const validateForm = () => {
    formState.username = formState.username.trim();
    formState.password = formState.password.trim();
    formState.role = formState.role.trim();
    formState.accountName = formState.accountName.trim();

    if (
      formState.accountName != "" &&
      formState.username != "" &&
      formState.password != "" &&
      formState.role != ""
    ) {
      const isIdExists = accounts.some(
        (account) => account.username == formState.username
      );

      if (!isEdit && isIdExists) {
        setErrors("username này đã tồn tại! Vui lòng nhập một username khác.");
        return false;
      } else if (formState.password.length < 8) {
        setErrors("Mật khẩu phải dài hơn 8 ký tự");
        return false;
      }
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            case "username":
              errorFields.push("Username");
              break;
            case "password":
              errorFields.push("Password");
              break;
            case "role":
              errorFields.push("Vai trò");
              break;
            case "accountName":
              errorFields.push("Tên tài khoản");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

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
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Username</label>
          <input
            className="border border-black w-1/2 p-2"
            name="username"
            onChange={handleChange}
            type="text"
            value={formState.username}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Mật khẩu</label>
          <input
            className="border border-black w-1/2 p-2"
            name="password"
            onChange={handleChange}
            type="text"
            value={formState.password}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Tên tài khoản</label>
          <input
            className="border border-black w-1/2 p-2"
            name="accountName"
            onChange={handleChange}
            type="text"
            value={formState.accountName}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Vai trò</label>
          <input
            className="border border-black w-1/2 p-2"
            name="role"
            onChange={handleChange}
            type="text"
            value={formState.role}
          />
        </div>
        {errors && <div className="text-center">{errors}</div>}
        <div className="flex flex-row w-1/2 justify-around">
          <Button type="submit" className="mt-2" onClick={closeModal}>
            Thoát
          </Button>
          <Button type="submit" className="mt-2 ml-4" onClick={handleSubmit}>
            {isEdt ? "Lưu" : "Tạo tài khoản"}
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default FormAccount;
