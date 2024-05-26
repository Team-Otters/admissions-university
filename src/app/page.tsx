'use client'
import Image from "next/image";
import {Button, Col, Container, Row } from "react-bootstrap";
import Slider from "@/components/Slider";
import { motion } from "framer-motion";
import { IoMdSearch } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { CgCalendar } from "react-icons/cg";
import { GrAchievement } from "react-icons/gr";
import React from "react";
import Link from "next/link";

const images = [
  {
    url: "/images/banner_1.png",
  },
  {
    url: "/images/banner_2_0.png",
  },
  {
    url: "/images/banner_3_-_v2.png",
  },

];

export default function Home() {
  const [newListData, setNewlistData] = React.useState<Post[]>([
    {
      title: "Thông báo lịch thi tập trung",
      date: "4:13, 12/5/2024",
      id: "",
      content: ""
    },
    {
      "title": "Thông báo tuyển sinh lớp 10 năm học 2024-2025",
      "date": "11:00, 20/4/2024",
      id: "",
      content: ""
    },
    {
      "title": "Kế hoạch tư vấn hướng nghiệp cho học sinh lớp 9",
      "date": "8:30, 15/4/2024",
      id: "",
      content: ""
    },
    {
      "title": "Thông báo kết quả thi học sinh giỏi cấp trường",
      "date": "14:20, 10/4/2024",
      id: "",
      content: ""
    },
    {
      "title": "Hội thảo định hướng cho phụ huynh học sinh lớp 9",
      "date": "9:00, 5/4/2024",
      id: "",
      content: ""
    },
    {
      "title": "Thông báo tuyển sinh lớp 6 vào trường THPT Chuyên",
      "date": "16:00, 30/3/2024",
      id: "",
      content: ""
    },
    {
      "title": "Kế hoạch hoạt động ngoại khóa hè 2024",
      "date": "10:30, 25/3/2024",
      id: "",
      content: ""
    },
    {
      "title": "Thông báo thành lập đội tuyển học sinh giỏi quốc gia",
      "date": "14:00, 20/3/2024",
      id: "",
      content: ""
    },
    {
      "title": "Hội nghị phụ huynh học sinh đầu năm học 2023-2024",
      "date": "8:00, 15/3/2024",
      id: "",
      content: ""
    },
    {
      "title": "Khai giảng năm học 2023-2024",
      "date": "7:00, 5/9/2023",
      id: "",
      content: ""
    }
  ]);
  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-2 bg-white mb-4">
        <Row>
          <Col>
          <Image
          src="/images/main1.png"
          alt=""
          height={900}
          width={700}
          sizes="80%"
        />
          </Col>
          <Col>
            <Row>
            <p className="text-center p-4 ">     <a className="no-underline ">Trường ĐH CNTT</a> là một trung tâm đào tạo đại học, sau đại học, cung cấp nguồn nhân lực, đội ngũ chuyên gia trình độ cao trong lĩnh vực Công nghệ thông tin và Truyền thông (CNTT&TT), có năng lực phát triển tự thân ngành CNTT&TT và năng lực triển khai ứng dụng CNTT&TT trong các ngành công nghệ cao, quản lý, kinh tế - tài chính, có năng lực sáng tạo, làm việc trong môi trường quốc tế. Trường ĐH CNTT thực hiện nghiên cứu khoa học và chuyển giao công nghệ CNTT&TT và các công nghệ liên quan, triển khai các ứng dụng CNTT&TT trong các lĩnh vực công nghệ cao, quản lý kinh tế, tài chính theo nhu cầu phát triển kinh tế của đất nước và phù hợp với xu thế phát triển của khu vực Đông Nam Á và thế giới.
            </p>
            </Row>
            <Row>
              <div  className=" flex justify-items-center justify-center">
                <Button variant="primary" className=" w-50 ">Đăng ký hồ sơ</Button>{' '}
              </div>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="p-2 bg-white mb-4 col-auto">
        <Slider imageList={images} width={1300} height={500}></Slider>
      </div>
      <div className="p-2 bg-white mb-4 col-auto">
        <p className=" text-black text-2xl mt-4 ml-20 font-bold"> Tin tức mới</p>
        <div className="ml-20">
          {newListData.map((news, index) => {
            // console.log(news);
            // console.log(index);
            if (index <= 7) {
              return (
                <div key={index} className=" flex">
                  <a href="#" className="no-underline hover:underline ...">{news.title} .</a>
                  <p>{news.date}</p>
                </div>
              );
            }
            else return (<></>);
          })}
          </div>
      </div>
      <div className="p-2 bg-white mb-4 col-auto flex justify-evenly align-middle" style={{
        backgroundImage: `url(/images/Rectangle.png)`,
        backgroundSize: "Cover",
        width: '100%',
        height: '50%',
      }}>

        <motion.div whileHover={{ scale: 1.2}}  className=" bg-blue-800 h-40 w-80 mt-20 flex">
          <IoMdSearch style={{height: 60, width: 60,}} className=" m-6"></IoMdSearch>
          <div className=" flex-row">
            <Link href={"#"} >
              <p className=" font-bold mt-4 text-black no-underline">Điểm chuẩn hằng năm</p>
              <p className=" text-left text-black no-underline">Xem điểm chuẩn hằng năm</p>
            </Link>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} className=" bg-blue-800 h-40 w-80 mt-20 flex">
        <CgCalendar style={{height: 60, width: 60,}} className=" m-6"></CgCalendar>
          <div className=" flex-row">
          <Link href={"#"} >
            <p className=" font-bold mt-4 text-black no-underline">Tin tức mới</p>
            <p className=" text-left text-black no-underline">Tin tức mới cùng với sự kiện nổi bật</p>
            </Link>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} className=" bg-blue-800 h-40 w-80 mt-20 flex">
        <GrAchievement href="#" style={{height: 60, width: 60,}} className=" m-6"></GrAchievement>
          <div className=" flex-row">
          <Link href={"#"} >
            <p className=" font-bold mt-4 text-black no-underline">Thành tựu</p>
            <p className=" text-left text-black no-underline">Các thanh tựu của trường</p>
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="p-2 bg-white mb-4">
        <Row>
          <Col>
          <Image
          src="/images/main2.png"
          alt=""
          height={700}
          width={500}
          sizes="80%"
          className=" p-2 pl-4"
        />
          </Col>
          <Col>
            <Row className=" flex">
              <p className=" font-bold text-center pt-20">Bạn có thắc mắc?</p>
              <p className="text-center ">Gửi gmail đến chúng tôi để được tư vấn cụ thể nhé!</p>
            </Row>
            <Row>
              <div  className=" flex justify-items-center justify-center">
                <Button variant="primary" className=" w-50 ">Gửi mail thắc mắc</Button>{' '}
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
