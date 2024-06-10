"use-client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { host } from "@/constants/string";
import axios from "axios";
const FormWish: React.FC<{
  closeModal: () => void;
  onSubmit: (data: Wish) => void;
  defaultValue: Wish;
}> = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      subjectSetId: "",
      classId: ""
    }
  );
   const [selectedClass, setSelectedClass] = useState(''); // Selected class name
  const [selectedSubjectSet, setSelectedSubjectSet] = useState('');
  const [classList, setClassList] = React.useState<Class[]>([]);
  const [subjectSetList, setSubjectSetList] = React.useState<SubjectSets[]>([]);

  const getAllClass = async () => {
    try {       
      let token = localStorage.getItem('accessToken');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}major_class`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
       //createUser(newUser);
       setClassList(response.data);
       //console.log(response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  }
  const getAllSubjectSet = async () => {
    try {       
      let token = localStorage.getItem('accessToken');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}subjectSets`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
       //createUser(newUser);
       setSubjectSetList(response.data);
       //console.log(response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  }
  const [errors, setErrors] = useState("");
   const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [formState.classId]: e.target.value });
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [formState.subjectSetId]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();


    onSubmit(formState);

    closeModal();
  };
  React.useEffect(()=> {
    getAllClass();
    getAllSubjectSet();
  },[])

  return (
    <div
      //   className="w-1/2 h-1/2 bg-white border border-black font-notoSans justify-center p-2 "
      className="z-20 w-5/6 sm:w-1/2 lg:w-1/3 h-1/4 bg-white flex items-center justify-center font-notoSans border rounded-3xl"
      onClick={(e) => {
        // if (e.target.className === "modal-container") closeModal();
      }}
    >
      {/* <div className="bg-mainBlue"> */}
      <form className="h-5/6 w-full items-center justify-center flex flex-col">
        <div className="flex flex-col">
        <label className="w-1/3 lg:w-1/2">Lớp học</label>
      <select  className="border border-black p-2"
 id="className" name="class" onChange={()=>handleChange1}>
        <option value="">-- Select Class --</option>
        {classList.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="w-1/3 lg:w-1/2">Tổ hợp môn</label>
      <select className="border border-black p-2"
 id="subjectSetName" name="subjectSet"  onChange={()=>handleChange2}>
        <option value="">-- Select Subject Set --</option>
        {subjectSetList.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
       </div>
        {errors && (
          <div className="error">{`Không được để trống: ${errors}`}</div>
        )}
        <div className="flex flex-row w-1/2 justify-around">
          <Button type="submit" className="mt-2" onClick={closeModal}>
            Thoát
          </Button>
          <Button type="submit" className="mt-2 ml-4" onClick={handleSubmit}>
            Lưu
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default FormWish;
