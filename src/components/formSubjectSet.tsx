"use-client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";


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
]);
const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>(formState.subjectList);

  const validateForm = () => {
    if (
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
        const newSelectedSubjects = checked
          ? [...selectedSubjects, value] // Add ID to selectedSubjects if checked
          : selectedSubjects.filter((id) => id !== value); // Remove ID if unchecked
    
        setSelectedSubjects(newSelectedSubjects);
        setFormState({ ...formState, subjectList: newSelectedSubjects });
      };
      console.log(formState)
      updateSelectedSubjects();
    };

    const getAllSubject = async () => {
      try {       
        let token = localStorage.getItem('accessToken');
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:8080/subject',
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.request(config);
         //createUser(newUser);
         setSubject(response.data.content);
         console.log(`subject list: ${response.data.content}`);
        // Handle successful login based on your API's response structure
      } catch (error) {
        console.error(error); // Handle errors appropriately (e.g., display error messages)
      }

    }

    // Pre-select checkboxes based on subjectList in defaultValue
    React.useEffect(() => {
      getAllSubject();
      const preselectedSubjects = (defaultValue.subjectList || []).filter((id) =>
        subject.some((item) => item.id === id)
      );
      //console.log(selectedSubjects)
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
  const getAllSubjectIds = (subjectList) => {
    if (Array.isArray(subjectList)) {
      // If an array, map the IDs directly
      return subjectList.map((subject) => subject.id);
    } else if (subjectList && typeof subjectList === "object") {
      // If an object (assuming it has an ID property), return an array with that ID
      return [subjectList.id]; // Adjust based on your object structure
    } else {
      // Handle other cases (e.g., undefined subjectList)
      console.error("subjectList is not an array or a valid object!");
      return []; // Or return an empty array
    }
  };
  const isSubjectSelected = (subjectId) => {
    const subjectList = getAllSubjectIds(formState.subjectList    ); // Assert it's an array of strings
    for (const subjectObject of subjectList) {
      if (subjectObject.id === subjectId) {
        return true;
      }
    }
    return false;
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
          {isEdit? <div>
            <label className="w-1/3 lg:w-1/2">Mã tổ hợp</label>
          <input
            className="border border-black w-1/2 p-2"
            name="id"
            onChange={handleChange}
            type="text"
            value={formState.id}
            disabled={isEdit}
          />
          </div> : <></>}
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
                      defaultChecked={isEdit ? isSubjectSelected(item.id) : false}                      onChange={handleCheckboxChange}
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
