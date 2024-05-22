"use-client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const FormExamRoom: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: ExamRoomManageForm) => void;
  defaultValue: ExamRoomManageForm;
  examRooms: ExamRoomManageForm[];
}> = ({ closeModal, isEdit, onSubmit, defaultValue, examRooms }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;

  const validateForm = () => {
    if (
      formState.roomCode != "" &&
      formState.roomName != "" &&
      formState.subjectName != "" &&
      formState.date != ""
    ) {
      const isIdExists = examRooms.some(
        (examRoom) => examRoom.roomCode == formState.roomCode
      );
      const isRoomUsable = examRooms.some(
        (examRoom) =>
          examRoom.roomName == formState.roomName &&
          examRoom.date == formState.date
      );

      if (!isEdit && isIdExists) {
        setErrors(
          "Mã phòng thi này đã tồn tại! Vui lòng nhập một mã phòng thi khác."
        );
        return false;
      } else if (isRoomUsable) {
        setErrors("Phòng thi này đã được sử dụng vào ngày " + formState.date);
        return false;
      }
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            case "roomCode":
              errorFields.push("Mã phòng thi");
              break;
            case "roomName":
              errorFields.push("Phòng thi");
              break;
            case "subjectName":
              errorFields.push("Tên môn thi");
              break;
            case "date":
              errorFields.push("Ngày thi");
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
          <label className="w-1/3 lg:w-1/2">Mã phòng thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="roomCode"
            onChange={handleChange}
            type="text"
            value={formState.roomCode}
            disabled={isEdit}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Tên môn thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="subjectName"
            onChange={handleChange}
            type="text"
            value={formState.subjectName}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Phòng thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="roomName"
            onChange={handleChange}
            type="text"
            value={formState.roomName}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Ngày thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="date"
            onChange={handleChange}
            type="text"
            value={formState.date}
          />
        </div>
        {errors && <div className="text-center">{errors}</div>}
        <div className="flex flex-row w-1/2 justify-around">
          <Button type="submit" className="mt-2" onClick={closeModal}>
            Thoát
          </Button>
          <Button type="submit" className="mt-2 ml-4" onClick={handleSubmit}>
            {isEdt ? "Lưu" : "Tạo phòng thi"}
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default FormExamRoom;
