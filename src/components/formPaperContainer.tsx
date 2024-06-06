"use-client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const FormPaperContainer: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: ExamManageForm) => void;
  defaultValue: ExamManageForm;
  paperContainers: ExamManageForm[];
  examRooms: ExamRoomManageForm[];
}> = ({
  closeModal,
  isEdit,
  onSubmit,
  defaultValue,
  paperContainers,
  examRooms,
}) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;

  const validateForm = () => {
    if (formState.examRoomId != "" && formState.numberOfPapers > 0) {
      const isRoomUsable = paperContainers.some(
        (ppCon) =>
          ppCon.id != formState.id && ppCon.examRoomId == formState.examRoomId
      );

      if (isRoomUsable) {
        setErrors("Phòng thi này đã có túi bài thi");
        return false;
      }
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (key != "id" && value == "") {
          switch (key) {
            case "examRoomId":
              errorFields.push("Phòng thi");
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
          <select
            name="examRoomId"
            onChange={handleChange}
            className="border border-black w-1/2 p-2"
            id="examRoomId"
            value={formState.examRoomId}
          >
            {examRooms?.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.room.name || ""}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Số lượng bài thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="numberOfPapers"
            onChange={handleChange}
            type="number"
            min={0}
            value={formState.numberOfPapers}
          />
        </div>
        {errors && <div className="text-center">{errors}</div>}
        <div className="flex flex-row w-1/2 justify-around">
          <Button type="submit" className="mt-2" onClick={closeModal}>
            Thoát
          </Button>
          <Button type="submit" className="mt-2 ml-4" onClick={handleSubmit}>
            {isEdt ? "Lưu" : "Thêm túi thi"}
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default FormPaperContainer;
