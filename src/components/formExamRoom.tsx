"use-client";
import { formatDate } from "@/utils/something";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const FormExamRoom: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: ExamRoomManageForm) => void;
  defaultValue: ExamRoomManageForm;
  examRooms: ExamRoomManageForm[];
  rooms: Room[];
  subjects: Subject[];
}> = ({
  closeModal,
  isEdit,
  onSubmit,
  defaultValue,
  examRooms,
  rooms,
  subjects,
}) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;

  const validateForm = () => {
    if (formState.date != "") {
      const isRoomUsable = examRooms.some(
        (examRoom) =>
          examRoom.id != formState.id &&
          examRoom.room.id == formState.room &&
          formatDate(examRoom.date) == formState.date.toString()
      );
      // const isPaperContainerUsable = examRooms.some(
      //   (examRoom) =>
      //     examRoom.room !== formState.room &&
      //     examRoom.paperContainersId == formState.paperContainersId
      // );
      if (isRoomUsable) {
        setErrors("Phòng thi này đã được sử dụng vào ngày " + formState.date);
        return false;
      }
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (key !== "paperContainersId" && value == "") {
          switch (key) {
            // case "room":
            //   errorFields.push("Phòng thi");
            //   break;
            // case "subject":
            //   errorFields.push("Môn thi");
            //   break;
            // // case "paperContainersId":
            // //   errorFields.push("Mã túi bài thi");
            // //   break;
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

  const handleChange = (e: any) => {
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
          <label className="w-1/3 lg:w-1/2">Phòng thi</label>
          <select
            name="room"
            onChange={handleChange}
            className="border border-black w-1/2 p-2"
            id="room"
            value={formState.room}
          >
            {rooms.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Môn thi</label>
          <select
            name="subject"
            onChange={handleChange}
            className="border border-black w-1/2 p-2"
            id="subject"
            defaultValue={subjects[0].id}
            value={formState.subject}
          >
            {subjects.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Ngày thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="date"
            onChange={handleChange}
            type="date"
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
