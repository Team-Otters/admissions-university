"use-client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormSubjectContainer: React.FC<{
  closeModal: () => void;
  isEdit: boolean;
  onSubmit: (data: SubjectSets) => void;
  defaultValue: SubjectSets;
  subjectSetsList: SubjectSets[];
}> = ({ closeModal, isEdit, onSubmit, defaultValue, subjectSetsList }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");
  const isEdt = isEdit || true;
  const [subject, setSubject] = React.useState<Subject[]>([
    {
        id: "SJ001",
        name: "Toán ",
        parameter:"aa",
        time: "90",
    },
    {
        id: "SJ002",
        name: "Vật lý",
        parameter:"aa",
        time: "90",
    },
    {
        id: "SJ003",
        name: "Hóa học",
        parameter:"aa",
        time: "90",
    },
    {
        id: "SJ004",
        name: "Sinh học",
        parameter:"aa",
        time: "90",
    },
    {
        id: "SJ005",
        name: "Lịch sử",
        parameter:"aa",
        time: "90",
    },
    {
        id: "SJ006",
        name: "Địa lý",
        parameter:"aa",
        time: "90",
    },
    {
        id: "SJ007",
        name: "Giáo dục công dân",
        parameter:"aa",
        time: "90",
    },
    {
        id: "SJ008",
        name: "Văn học",
        parameter:"aa",
        time: "90",
    }
]);
const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);

  const validateForm = () => {
    if (
      formState.id != "" &&
      formState.name != "" &&
      formState.mainSubject != ""&&
      formState.subjectList.length != 0 
    ) {
      const isIdExists = subjectSetsList.some(
        (subSet) => subSet.id == formState.id
      );

      if (!isEdit && isIdExists) {
        setErrors(
          "Mã tổ hợp đã tồn tại! Vui lòng nhập một mã khác."
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
              errorFields.push("Mã tổ hợp");
              break;
            case "name":
              errorFields.push("Tên tổ hợp");
              break;
            case "mainSubject":
              errorFields.push("Tên môn thi");
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
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    // Update selected subjects in formState based on checkbox changes
    const updateSelectedSubjects = () => {
      const newSelectedSubjects = subject.filter((item) => {
        return item.id === value ? checked : selectedSubjects.includes(item.id);
      }).map((item) => item.id);
      setSelectedSubjects(newSelectedSubjects);
      setFormState({ ...formState, subjectList: newSelectedSubjects });
    };

    updateSelectedSubjects();
  };

  React.useEffect(() => {
    // Check initial checkbox states based on subjectSetsList
    const initialSelectedSubjects = subjectSetsList
      .find((set) => set.id === formState.id)?.subjectList || [];
    setSelectedSubjects(initialSelectedSubjects);
  }, [formState.id, subjectSetsList]); 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      //   className="w-1/2 h-1/2 bg-white border border-black font-notoSans justify-center p-2 "
      className="z-20 w-5/6 sm:w-1/2 lg:w-1/3 h-5/6 pt-2 bg-white flex items-center justify-around font-notoSans border rounded-3xl"
      onClick={(e) => {
        // if (e.target. === "modal-container") closeModal();
      }}
    >
      {/* <div className="bg-mainBlue"> */}
      <form className="h-5/6 w-full items-center justify-around flex flex-col">
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Mã tổ hợp</label>
          <input
            className="border border-black w-1/2 p-2"
            name="paperContainerCode"
            onChange={handleChange}
            type="text"
            value={formState.id}
            disabled={isEdit}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Tên tổ hợp</label>
          <input
            className="border border-black w-1/2 p-2"
            name="roomName"
            onChange={handleChange}
            type="text"
            value={formState.name}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Tên môn thi chính</label>
          <Form.Select value={formState.mainSubject} onChange={e => {
            formState.mainSubject = e.target.value;
          }} className="border border-black w-1/2 p-2" aria-label="Default select example">
            <option>Chọn môn thi chính</option>
            {subject.map((item, index) => {
                return(
                    <option key={index} value={item.id}>{item.name}</option>
                );
            })}
          </Form.Select>
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Các môn thi</label>
          <Form.Group onChange={e => {
            
          }}>
            {subject.map((item, index) => {
                return(
                    <Form.Check key={index}
                      type={"checkbox"}
                      defaultChecked={false}
                      onChange={handleCheckboxChange}
                      id="index"
                      value={item.id}
                      label={item.name}
                    />
                );
            })}
            </Form.Group>
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

export default FormSubjectContainer;
