"use-client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const FormPaperContainer: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: ExamManageForm) => void;
  defaultValue: ExamManageForm;
  paperContainers: ExamManageForm[];
}> = ({ closeModal, isEdit, onSubmit, defaultValue, paperContainers }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;

  const validateForm = () => {
    if (
      formState.paperContainerCode != "" &&
      formState.roomName != "" &&
      formState.subject != "" &&
      formState.date != ""
    ) {
      const isIdExists = paperContainers.some(
        (ppCon) => ppCon.paperContainerCode == formState.paperContainerCode
      );
      const isRoomUsable = paperContainers.some(
        (ppCon) =>
          ppCon.roomName == formState.roomName && ppCon.date == formState.date
      );

      if (!isEdit && isIdExists) {
        setErrors(
          "Mã túi thi này đã tồn tại! Vui lòng nhập một mã túi thi khác."
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
            case "paperContainerCode":
              errorFields.push("Mã túi thi");
              break;
            case "roomName":
              errorFields.push("Phòng thi");
              break;
            case "subject":
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

  const handleSubmit = (e : any) => {
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
            name="paperContainerCode"
            onChange={handleChange}
            type="text"
            value={formState.paperContainerCode}
            disabled={isEdit}
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
          <label className="w-1/3 lg:w-1/2">Tên môn thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="subject"
            onChange={handleChange}
            type="text"
            value={formState.subject}
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
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Số lượng bài thi</label>
          <input
            className="border border-black w-1/2 p-2"
            name="numberOfPapers"
            onChange={handleChange}
            type="number"
            defaultValue={isEdit ? defaultValue.numberOfPapers : 0}
            min={0}
            disabled
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
