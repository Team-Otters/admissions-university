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
  //const [formSubjectList, setFormSubjectList] = useState<String[]>(formState.subjectList);
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
const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>(formState.subjectList);

  const validateForm = () => {
    if (
      formState.id != "" &&
      formState.name != "" &&
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
    // Update selected subjects in formState based on checkbox changes
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = event.target;
  
      const updateSelectedSubjects = () => {
        const newSelectedSubjects = subject.filter((item) => {
          return item.id === value ? checked : selectedSubjects.includes(item.id);
        }).map((item) => item.id);
        //console.log(newSelectedSubjects);
        setSelectedSubjects(newSelectedSubjects);
        //console.log(`selected list: ${selectedSubjects}`)
        setFormState({ ...formState, "subjectList" : newSelectedSubjects});
        //console.log(`formstate list: ${formState.subjectList}`)
      };
  
      updateSelectedSubjects();
    };
  
    // Pre-select checkboxes based on subjectList in defaultValue
    React.useEffect(() => {
      const preselectedSubjects = (defaultValue.subjectList || []).filter((id) =>
        subject.some((item) => item.id === id)
      );
      //setSelectedSubjects(preselectedSubjects);
      //console.log(selectedSubjects);
    }, [defaultValue.subjectList, selectedSubjects, subject]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("invalid")
      return;};
      console.log(formState.subjectList)
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
          <label className="w-1/3 lg:w-1/2">Mã tổ hợp</label>
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
          <label className="w-1/3 lg:w-1/2">Tên tổ hợp</label>
          <input
            className="border border-black w-1/2 p-2"
            name="name"
            onChange={handleChange}
            type="text"
            value={formState.name}
          />
        </div>
        <div className="flex flex-row w-4/6">
          <label className="w-1/3 lg:w-1/2">Các môn thi</label>
          <Form.Group onChange={e => {
            
          }}>
            {subject.map((item, index) => {
                return(
                    <Form.Check key={index}
                      type={"checkbox"}
                      defaultChecked={selectedSubjects.includes(item.id)}
                      onChange={handleCheckboxChange}
                      id={index.toString()}
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
