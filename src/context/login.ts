import { NextApiResponse } from 'next';
import axios from 'axios';
import { host } from '@/constants/string';
import { useAuth } from '@/hooks/useAuth';

const APIFacade = {
  login : async (username: string, password: string) => {
    try{
      let data = JSON.stringify({
        username: username,
        password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${host}login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      //createUser(newUser);
      console.log(response.data);
      await localStorage.setItem("username", username);
      await localStorage.setItem("accessToken", response.data.access_token);
      await localStorage.setItem("refreshToken", response.data.refresh_token);
      // await localStorage.setItem("role", response.data.role);
      const storedData = localStorage.getItem("accessToken");
      console.log(storedData);

      return response;
      // Handle successful login based on your API's response structure
      // You can use the response data to redirect the user to a different page, store authentication tokens, etc.
    } catch (error) {
      throw new Error("Failed to fetch user data."); 
  }},
  getAllUser : async () => {
    try {
      let token = localStorage.getItem('accessToken');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}admin/user`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
      console.log(response.data);
      return response.data;
    } catch (error) {throw new Error("Failed to fetch list user!")}
  },
  addUser : async (data: Account) => {
    try {
      let dt = JSON.stringify({
        "username": data.username,
        "password": data.password,
        "role": data.role
      });
      let token = localStorage.getItem('accessToken');
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${host}register`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data : dt
      };
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }

  },
  getAllBenchmark : async () => {
    try {
      let token = localStorage.getItem('accessToken');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}bench_mark`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
      console.log(response.data);
      return response.data;
    } catch (error) {throw new Error("Failed to fetch list user!")}
  },
  getAllClass : async () => {
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
      return response.data;
       console.log(response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  },
  addClass : async (data: Class) => {
    try {       
      let token = localStorage.getItem('accessToken');
      let dt = JSON.stringify({
        "name": data.name,
        "year": data.year,
        "quotas": data.quotas
      })
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${host}major_class`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: dt
      };
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }      

  },
  updateClass : async (data: Class) => {
    try {       
      let token = localStorage.getItem('accessToken');
      let dt = JSON.stringify({
        "name": data.name,
        "year": data.year,
        "quotas": data.quotas
      })
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${host}major_class/${data.id}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: dt
      };
      const response = await axios.request(config);
      return response;
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }      

  },
  deleteClass : async (id: string) => {
    try {       
      let token = localStorage.getItem('accessToken');

      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${host}major_class/${id}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
      return response;
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }      

  },
  getAllExam : async () => {
    try {       
        let token = localStorage.getItem('accessToken');
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${host}exam`,
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.request(config);
         //createUser(newUser);
         console.log(response.data);
         return response.data;
        // Handle successful login based on your API's response structure
      } catch (error) {
        console.error(error); // Handle errors appropriately (e.g., display error messages)
      }
  },
  addExam: async (data: Exam) => {
    let dt = JSON.stringify({
        "name": data.name,
        "year": data.year
      });
      let token = localStorage.getItem('accessToken');

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${host}exam`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        data : dt
      };
      try{
        const response = await axios.request(config);
        return response;
      }catch(error){
        console.error(error); // Handle errors appropriately (e.g., display error messages)

  }},
  deleteExam: async (id: string) => {
    let token = localStorage.getItem('accessToken');

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${host}exam/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    };
    try{
      const response = await axios.request(config);
      return response;
    }catch(error){
      console.error(error); 
    }
  },
  getExam: async (id: string) => {
    try {       
      let token = localStorage.getItem('accessToken');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}exam/${id}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
      return response.data;
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  },
  getAllStudent : async () => {
    try {
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${host}student/all`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      const jsonData = response.data;
      console.log("fj: ", jsonData);

    // Alternative: Manual parsing with type safety (recommended)
    const studentss: std[] = jsonData.content.map((studentData: any) => ({
      id: studentData.id,
      fullName: studentData.profile.fullName,
      numberId: studentData.profile.numberId,
      gender: studentData.profile.gender,
      dateOfBirth: studentData.profile.dateOfBirth.toString(), // Assuming dateOfBirth is a number in milliseconds
      phoneNumber: studentData.profile.phoneNumber,
      email: studentData.profile.email,
      placeOfBirth: studentData.profile.placeOfBirth,
      ethnicType: studentData.profile.ethnicType,
      houseHold: studentData.profile.houseHold,
      address: studentData.profile.address,
      school: studentData.profile.school,
    }));

      return studentss;
      console.log("sj: ", studentss);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }

  },
  getAllPost : async () => { 
    let token = localStorage.getItem('accessToken');

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${host}notification`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },
  deletePost : async (id: string) => {
    try {
      console.log(id);
      // Get the token from local storage
      const token = localStorage.getItem("accessToken");
      
      // Make a DELETE request to the server endpoint with the specific ID and authorization token
      await axios.delete(`${host}admin/notification/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
            
      console.log('Successfully deleted notification with ID:', id);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },
  addPost : async (data: Post) => {
      console.log(data);
      const currentDate = new Date().toISOString();

      // Get the token from local storage
      const token = localStorage.getItem("accessToken");
  
      try {
        const response = await axios.post(`${host}admin/notification`, {
          ...data,
          day: currentDate,
        }, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
  
        console.log(response.data);
        return response;
        // Reset form after successful submission

         } catch (error) {
      console.error(error);
    }
  },
  getPost : async (id: string) => {
    try {
      console.log(id);
      // Get the token from local storage
      const token = localStorage.getItem("accessToken");
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}notification/${id}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);

      console.log('Successfully deleted notification with ID:', id);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },
  updatePost : async (data: Post) => {
    const currentDate = new Date().toISOString();

    // Get the token from local storage
    const token = localStorage.getItem("accessToken");
    const dt = JSON.stringify({
      "title":data.title,
      "topic" : data.topic,
      "content" : data.content,
      "day" : currentDate
    })
    try {
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${host}admin/notification/${data.id}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: dt 
      };
      console.log(data.id);
      const response = await axios.request(config);
      return response;
      // Reset form after successful submission

       } catch (error) {
    console.error(error);
  }
},
  getAllSubject : async () => {
  try {       
    let token = localStorage.getItem('accessToken');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${host}subject`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await axios.request(config);
     return response.data.content;
    // Handle successful login based on your API's response structure
  } catch (error) {
    console.error(error); // Handle errors appropriately (e.g., display error messages)
  }
  },
  deleteSubject : async (id: string) => {
    try {       
      let token = localStorage.getItem('accessToken');

      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${host}subject/${id}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        },
      };
      const response = await axios.request(config);
      return response;
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }  

  },
  addSubject: async (data: Subject) => {
    try {       
      let token = localStorage.getItem('accessToken');
      let dt = JSON.stringify({
        "name": data.name,
        "parameter": data.parameter,
        "time": data.time
      })
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${host}subject`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: dt
      };
      const response = await axios.request(config);
      return response;
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }      
},
  updateSubject: async (data: Subject) => {
    try {       
      let token = localStorage.getItem('accessToken');
      let dt = JSON.stringify({
        "name": data.name,
        "parameter": data.parameter,
        "quotas": data.time
      })
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${host}subject/${data.id}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: dt
      };
      const response = await axios.request(config);
      return response;
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }        
},
  getAllSubjectSet : async () => {
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
       return response.data;
       //console.log(response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  },
  addSubjectSet: async (data: SubjectSets) => {
    try {       
      let token = localStorage.getItem('accessToken');
      let dt = JSON.stringify({
        "name": data.name,
        "subjects": data.subjectList
      })
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${host}subjectSets`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: dt
      };
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  },
  deleteSubjectSet : async (id: string) => {
    try {       
      let token = localStorage.getItem('accessToken');
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${host}subjectSets/${id}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
      return response;
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); 
      alert(`Bug because of constraint in database. Error code:${error}`)
      // Handle errors appropriately (e.g., display error messages)
    }
  },
  getAllExamRoom : async () => {
    try {
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${host}exam_room`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      return response.data;
      console.log("er: ", response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  },
  deleteExamRoom : async (id: string) => {
    try {
    let token = localStorage.getItem("accessToken");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${host}exam_room/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config)
    return response;
    //createUser(newUser);
    // Handle successful login based on your API's response structure
  } catch (error) {
    console.error(error); // Handle errors appropriately (e.g., display error messages)
  }

  },
  addExamRoom: async (data: ExamRoomManageForm) => {
    let token = localStorage.getItem("accessToken");
    let dt = JSON.stringify({
      examRoomId: data.room,
      subjectId: data.subject,
      date: data.date,
      paperContainersId: "AA001",
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${host}exam_room`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: dt,
    };
    const response = await axios.request(config).then((response) => {
    return response;
    });
    //createUser(newUser);
    // Handle successful login based on your API's response structure
  },
  updateExamRoom: async (data: ExamRoomManageForm) => {
    try {
      let dt = JSON.stringify({
        examRoomId: data.room,
        subjectId: data.subject,
        date: data.date,
      });
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${host}exam_room/${data.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: dt,
      };
      const response = await axios.request(config).then((response) => {
      return response;
      });
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }},
  getAllRooms : async () => {
    try {
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${host}room`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      return response.data;
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  },
  getAllPaperContainers : async () => {
    try {
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${host}paper-containers`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      //createUser(newUser);
      return response.data
      console.log("pc: ", response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  },
  deletePaperContainer: async (paperContainer: ExamManageForm) => {
    try {
      let token = localStorage.getItem("accessToken");
      let dt = JSON.stringify({
        id: paperContainer.id,
      });
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${host}paper-containers/${paperContainer.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: dt,
      };
      const response = await axios.request(config).then((response) => {
       return response;
      });
      //createUser(newUser);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }

  },
  updatePaperContainer: async (data: ExamManageForm ) => {
    try {
      let dt = JSON.stringify({
        examRoomId: data.examRoomId,
        subjectId: data.subjectId,
        numberOfPapers: data.numberOfPapers,
      });
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${host}paper-containers/${data.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: dt,
      };
      const response = await axios.request(config).then((response) => {
       return response;
      });
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }

  },
  addPaperContainer: async (data: ExamManageForm) => {
    try {
      let token = localStorage.getItem("accessToken");
      let dt = JSON.stringify({
        examRoomId: data.examRoomId,
        subjectId: data.subjectId,
        numberOfPapers: data.numberOfPapers,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${host}paper-containers`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: dt,
      };
      const response = await axios.request(config).then((response) => {
      return response;
      });
      //createUser(newUser);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }

  },
  getAllExamDetail : async () => {
    try {
      let token = localStorage.getItem("accessToken");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${host}examRoomDetails`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      //createUser(newUser);
      return response.data;
      console.log("pc: ", response.data);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  },
  
}
export default APIFacade;