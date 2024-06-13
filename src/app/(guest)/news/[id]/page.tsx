'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container } from "react-bootstrap";
import { ok } from "assert";
import APIFacade from "@/context/login";

interface Notification {
  title: string;
  target: string;
  content: string;
}

const NotificationDetail = ({params}) => {
    const {id} = params;
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const getPost = async (data:string) =>{
    try { 
      const response = await APIFacade.getInstance().getPost(id);
       //createUser(newUser);
       setNotification(response.data);
       setLoading(false)
       console.log(response);
      // Handle successful login based on your API's response structure
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  }
  useEffect(() => {
    
    getPost(id);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!notification) return <p>No notification found</p>;

  return (
    <Container fluid style={{ height: "100vh", paddingTop: "50px" }} className="font-notoSans">
      <h1>{notification.title}</h1>
      <p><strong>Target:</strong> {notification.target}</p>
      <div>
        <p>{notification.content}</p>
      </div>
    </Container>
  );
};

export default NotificationDetail;
