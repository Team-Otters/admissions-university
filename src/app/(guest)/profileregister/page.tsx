"use client";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
//import { host } from "@/constants/string";
interface IFormData {
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  permanentResidence1: string;
  permanentResidence2: string;
  permanentResidence3: string;
  permanentResidence4: string;
  householdAddress1: string;
  householdAddress2: string;
  householdAddress3: string;
  householdAddress4: string;
  placeOfBirth: string;
  ethnicity: string;
  idImage: string;
  secondSchool: string;
  phoneNumber: string;
  email: string;
}

const ProfileRegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    permanentResidence1: "",
    permanentResidence2: "",
    permanentResidence3: "",
    permanentResidence4: "",
    householdAddress1: "",
    householdAddress2: "",
    householdAddress3: "",
    householdAddress4: "",
    placeOfBirth: "",
    ethnicity: "",
    idImage: "",
    secondSchool: "",
    phoneNumber: "",
    email: "",
  });

  const districts: { [key: string]: string[] } = {
    "An Giang": [
      "Thành phố Long Xuyên",
      "Thành phố Châu Đốc",
      "Huyện An Phú",
      "Thị xã Tân Châu",
      "Huyện Phú Tân",
      "Huyện Châu Phú",
      "Huyện Tịnh Biên",
      "Huyện Tri Tôn",
      "Huyện Châu Thành",
      "Huyện Chợ Mới",
      "Huyện Thoại Sơn",
    ],
    "Bà Rịa - Vũng Tàu": [
      "Thành phố Vũng Tàu",
      "Thành phố Bà Rịa",
      "Huyện Châu Đức",
      "Huyện Đất Đỏ",
      "Huyện Long Điền",
      "Huyện Tân Thành",
      "Huyện Xuyên Mộc",
      "Huyện Côn Đảo",
    ],
    "Bắc Giang": [
      "Thành phố Bắc Giang",
      "Huyện Hiệp Hòa",
      "Huyện Lạng Giang",
      "Huyện Lục Nam",
      "Huyện Lục Ngạn",
      "Huyện Sơn Động",
      "Huyện Tân Yên",
      "Huyện Việt Yên",
      "Huyện Yên Dũng",
      "Huyện Yên Thế",
    ],
    "Bắc Kạn": [
      "Thành phố Bắc Kạn",
      "Huyện Ba Bể",
      "Huyện Bạch Thông",
      "Huyện Chợ Đồn",
      "Huyện Chợ Mới",
      "Huyện Na Rì",
      "Huyện Ngân Sơn",
      "Huyện Pác Nặm",
    ],
    "Bạc Liêu": [
      "Thành phố Bạc Liêu",
      "Huyện Đông Hải",
      "Huyện Giá Rai",
      "Huyện Hòa Bình",
      "Huyện Hồng Dân",
      "Huyện Phước Long",
      "Huyện Vĩnh Lợi",
    ],
    "Bắc Ninh": [
      "Thành phố Bắc Ninh",
      "Huyện Gia Bình",
      "Huyện Lương Tài",
      "Huyện Quế Võ",
      "Huyện Thuận Thành",
      "Huyện Tiên Du",
      "Huyện Từ Sơn",
      "Huyện Yên Phong",
    ],
    "Bến Tre": [
      "Thành phố Bến Tre",
      "Huyện Ba Tri",
      "Huyện Bình Đại",
      "Huyện Châu Thành",
      "Huyện Chợ Lách",
      "Huyện Giồng Trôm",
      "Huyện Mỏ Cày Bắc",
      "Huyện Mỏ Cày Nam",
      "Huyện Thạnh Phú",
    ],
    "Bình Định": [
      "Thành phố Quy Nhơn",
      "Thị xã An Nhơn",
      "Huyện An Lão",
      "Huyện Hoài Ân",
      "Huyện Hoài Nhơn",
      "Huyện Phù Cát",
      "Huyện Phù Mỹ",
      "Huyện Tây Sơn",
      "Huyện Tuy Phước",
      "Huyện Vân Canh",
      "Huyện Vĩnh Thạnh",
    ],
    "Bình Dương": [
      "Thành phố Thủ Dầu Một",
      "Thị xã Bến Cát",
      "Thị xã Dĩ An",
      "Thị xã Tân Uyên",
      "Thị xã Thuận An",
      "Huyện Bàu Bàng",
      "Huyện Dầu Tiếng",
      "Huyện Bắc Tân Uyên",
      "Huyện Phú Giáo",
    ],
    "Bình Phước": [
      "Thành phố Đồng Xoài",
      "Thị xã Bình Long",
      "Thị xã Phước Long",
      "Huyện Bù Đăng",
      "Huyện Bù Đốp",
      "Huyện Bù Gia Mập",
      "Huyện Chơn Thành",
      "Huyện Đồng Phú",
      "Huyện Hớn Quản",
      "Huyện Lộc Ninh",
      "Huyện Phú Riềng",
    ],
    "Bình Thuận": [
      "Thành phố Phan Thiết",
      "Thị xã La Gi",
      "Huyện Bắc Bình",
      "Huyện Đức Linh",
      "Huyện Hàm Tân",
      "Huyện Hàm Thuận Bắc",
      "Huyện Hàm Thuận Nam",
      "Huyện Phú Quý",
      "Huyện Tánh Linh",
      "Huyện Tuy Phong",
    ],
    "Cà Mau": [
      "Thành phố Cà Mau",
      "Huyện Cái Nước",
      "Huyện Đầm Dơi",
      "Huyện Năm Căn",
      "Huyện Ngọc Hiển",
      "Huyện Phú Tân",
      "Huyện Thới Bình",
      "Huyện Trần Văn Thời",
      "Huyện U Minh",
    ],
    "Cần Thơ": [
      "Quận Bình Thủy",
      "Quận Cái Răng",
      "Quận Ninh Kiều",
      "Quận Ô Môn",
      "Quận Thốt Nốt",
      "Huyện Cờ Đỏ",
      "Huyện Phong Điền",
      "Huyện Thới Lai",
      "Huyện Vĩnh Thạnh",
    ],
    "Cao Bằng": [
      "Thành phố Cao Bằng",
      "Huyện Bảo Lạc",
      "Huyện Bảo Lâm",
      "Huyện Hạ Lang",
      "Huyện Hà Quảng",
      "Huyện Hòa An",
      "Huyện Nguyên Bình",
      "Huyện Phục Hòa",
      "Huyện Quảng Uyên",
      "Huyện Thạch An",
      "Huyện Thông Nông",
      "Huyện Trà Lĩnh",
      "Huyện Trùng Khánh",
    ],
    "Đà Nẵng": [
      "Quận Cẩm Lệ",
      "Quận Hải Châu",
      "Quận Liên Chiểu",
      "Quận Ngũ Hành Sơn",
      "Quận Sơn Trà",
      "Quận Thanh Khê",
      "Huyện Hòa Vang",
      "Huyện Hoàng Sa",
    ],
    "Đắk Lắk": [
      "Thành phố Buôn Ma Thuột",
      "Thị xã Buôn Hồ",
      "Huyện Buôn Đôn",
      "Huyện Cư Kuin",
      "Huyện Cư M'gar",
      "Huyện Ea H'leo",
      "Huyện Ea Kar",
      "Huyện Ea Súp",
      "Huyện Krông Ana",
      "Huyện Krông Bông",
      "Huyện Krông Búk",
      "Huyện Krông Năng",
      "Huyện Krông Pắc",
      "Huyện Lắk",
      "Huyện M'Drắk",
    ],
    "Đắk Nông": [
      "Thành phố Gia Nghĩa",
      "Huyện Cư Jút",
      "Huyện Đắk Glong",
      "Huyện Đắk Mil",
      "Huyện Đắk R'lấp",
      "Huyện Đắk Song",
      "Huyện Krông Nô",
      "Huyện Tuy Đức",
    ],
    "Điện Biên": [
      "Thành phố Điện Biên Phủ",
      "Thị xã Mường Lay",
      "Huyện Điện Biên",
      "Huyện Điện Biên Đông",
      "Huyện Mường Ảng",
      "Huyện Mường Chà",
      "Huyện Mường Nhé",
      "Huyện Nậm Pồ",
      "Huyện Tủa Chùa",
      "Huyện Tuần Giáo",
    ],
    "Đồng Nai": [
      "Thành phố Biên Hòa",
      "Thành phố Long Khánh",
      "Huyện Cẩm Mỹ",
      "Huyện Định Quán",
      "Huyện Long Thành",
      "Huyện Nhơn Trạch",
      "Huyện Tân Phú",
      "Huyện Thống Nhất",
      "Huyện Trảng Bom",
      "Huyện Vĩnh Cửu",
      "Huyện Xuân Lộc",
    ],
    "Đồng Tháp": [
      "Thành phố Cao Lãnh",
      "Thành phố Sa Đéc",
      "Thành phố Hồng Ngự",
      "Huyện Cao Lãnh",
      "Huyện Châu Thành",
      "Huyện Hồng Ngự",
      "Huyện Lai Vung",
      "Huyện Lấp Vò",
      "Huyện Tam Nông",
      "Huyện Tân Hồng",
      "Huyện Thanh Bình",
      "Huyện Tháp Mười",
    ],
    "Gia Lai": [
      "Thành phố Pleiku",
      "Thị xã An Khê",
      "Thị xã Ayun Pa",
      "Huyện Chư Păh",
      "Huyện Chư Prông",
      "Huyện Chư Sê",
      "Huyện Chư Pưh",
      "Huyện Đắk Đoa",
      "Huyện Đắk Pơ",
      "Huyện Đức Cơ",
      "Huyện Ia Grai",
      "Huyện Ia Pa",
      "Huyện KBang",
      "Huyện Kông Chro",
      "Huyện Krông Pa",
      "Huyện Mang Yang",
      "Huyện Phú Thiện",
    ],
    "Hà Giang": [
      "Thành phố Hà Giang",
      "Huyện Bắc Mê",
      "Huyện Bắc Quang",
      "Huyện Đồng Văn",
      "Huyện Hoàng Su Phì",
      "Huyện Mèo Vạc",
      "Huyện Quản Bạ",
      "Huyện Quang Bình",
      "Huyện Vị Xuyên",
      "Huyện Xín Mần",
      "Huyện Yên Minh",
    ],
    "Hà Nam": [
      "Thành phố Phủ Lý",
      "Thị xã Duy Tiên",
      "Huyện Bình Lục",
      "Huyện Kim Bảng",
      "Huyện Lý Nhân",
      "Huyện Thanh Liêm",
    ],
    "Hà Nội": [
      "Quận Ba Đình",
      "Quận Bắc Từ Liêm",
      "Quận Cầu Giấy",
      "Quận Đống Đa",
      "Quận Hà Đông",
      "Quận Hai Bà Trưng",
      "Quận Hoàn Kiếm",
      "Quận Hoàng Mai",
      "Quận Long Biên",
      "Quận Nam Từ Liêm",
      "Quận Tây Hồ",
      "Quận Thanh Xuân",
      "Thị xã Sơn Tây",
      "Huyện Ba Vì",
      "Huyện Chương Mỹ",
      "Huyện Đan Phượng",
      "Huyện Đông Anh",
      "Huyện Gia Lâm",
      "Huyện Hoài Đức",
      "Huyện Mê Linh",
      "Huyện Mỹ Đức",
      "Huyện Phú Xuyên",
      "Huyện Phúc Thọ",
      "Huyện Quốc Oai",
      "Huyện Sóc Sơn",
      "Huyện Thạch Thất",
      "Huyện Thanh Oai",
      "Huyện Thanh Trì",
      "Huyện Thường Tín",
      "Huyện Ứng Hòa",
    ],
    "Hà Tĩnh": [
      "Thành phố Hà Tĩnh",
      "Thị xã Hồng Lĩnh",
      "Thị xã Kỳ Anh",
      "Huyện Cẩm Xuyên",
      "Huyện Can Lộc",
      "Huyện Đức Thọ",
      "Huyện Hương Khê",
      "Huyện Hương Sơn",
      "Huyện Kỳ Anh",
      "Huyện Lộc Hà",
      "Huyện Nghi Xuân",
      "Huyện Thạch Hà",
      "Huyện Vũ Quang",
    ],
    "Hải Dương": [
      "Thành phố Hải Dương",
      "Thị xã Kinh Môn",
      "Huyện Bình Giang",
      "Huyện Cẩm Giàng",
      "Huyện Gia Lộc",
      "Huyện Kim Thành",
      "Huyện Nam Sách",
      "Huyện Ninh Giang",
      "Huyện Thanh Hà",
      "Huyện Thanh Miện",
      "Huyện Tứ Kỳ",
    ],
    "Hải Phòng": [
      "Quận Đồ Sơn",
      "Quận Dương Kinh",
      "Quận Hải An",
      "Quận Hồng Bàng",
      "Quận Kiến An",
      "Quận Lê Chân",
      "Quận Ngô Quyền",
      "Huyện An Dương",
      "Huyện An Lão",
      "Huyện Bạch Long Vĩ",
      "Huyện Cát Hải",
      "Huyện Kiến Thụy",
      "Huyện Thủy Nguyên",
      "Huyện Tiên Lãng",
      "Huyện Vĩnh Bảo",
    ],
    "Hậu Giang": [
      "Thành phố Vị Thanh",
      "Thành phố Ngã Bảy",
      "Huyện Châu Thành",
      "Huyện Châu Thành A",
      "Huyện Long Mỹ",
      "Huyện Phụng Hiệp",
      "Huyện Vị Thủy",
      "Thị xã Long Mỹ",
    ],
    "Hòa Bình": [
      "Thành phố Hòa Bình",
      "Huyện Cao Phong",
      "Huyện Đà Bắc",
      "Huyện Kim Bôi",
      "Huyện Lạc Sơn",
      "Huyện Lạc Thủy",
      "Huyện Lương Sơn",
      "Huyện Mai Châu",
      "Huyện Tân Lạc",
      "Huyện Yên Thủy",
    ],
    "Hưng Yên": [
      "Thành phố Hưng Yên",
      "Thị xã Mỹ Hào",
      "Huyện Ân Thi",
      "Huyện Khoái Châu",
      "Huyện Kim Động",
      "Huyện Phù Cừ",
      "Huyện Tiên Lữ",
      "Huyện Văn Giang",
      "Huyện Văn Lâm",
      "Huyện Yên Mỹ",
    ],
    "Khánh Hòa": [
      "Thành phố Nha Trang",
      "Thành phố Cam Ranh",
      "Thị xã Ninh Hòa",
      "Huyện Cam Lâm",
      "Huyện Diên Khánh",
      "Huyện Khánh Sơn",
      "Huyện Khánh Vĩnh",
      "Huyện Trường Sa",
      "Huyện Vạn Ninh",
    ],
    "Kiên Giang": [
      "Thành phố Rạch Giá",
      "Thành phố Hà Tiên",
      "Huyện An Biên",
      "Huyện An Minh",
      "Huyện Châu Thành",
      "Huyện Giang Thành",
      "Huyện Giồng Riềng",
      "Huyện Gò Quao",
      "Huyện Hòn Đất",
      "Huyện Kiên Hải",
      "Huyện Kiên Lương",
      "Huyện Phú Quốc",
      "Huyện Tân Hiệp",
      "Huyện U Minh Thượng",
      "Huyện Vĩnh Thuận",
    ],
    "Kon Tum": [
      "Thành phố Kon Tum",
      "Huyện Đắk Glei",
      "Huyện Đắk Hà",
      "Huyện Đắk Tô",
      "Huyện Ia H'Drai",
      "Huyện Kon Plông",
      "Huyện Kon Rẫy",
      "Huyện Ngọc Hồi",
      "Huyện Sa Thầy",
      "Huyện Tu Mơ Rông",
    ],
    "Lai Châu": [
      "Thành phố Lai Châu",
      "Huyện Mường Tè",
      "Huyện Nậm Nhùn",
      "Huyện Phong Thổ",
      "Huyện Sìn Hồ",
      "Huyện Tam Đường",
      "Huyện Tân Uyên",
      "Huyện Than Uyên",
    ],
    "Lâm Đồng": [
      "Thành phố Đà Lạt",
      "Thành phố Bảo Lộc",
      "Huyện Bảo Lâm",
      "Huyện Cát Tiên",
      "Huyện Đạ Huoai",
      "Huyện Đạ Tẻh",
      "Huyện Đam Rông",
      "Huyện Di Linh",
      "Huyện Đơn Dương",
      "Huyện Đức Trọng",
      "Huyện Lạc Dương",
      "Huyện Lâm Hà",
    ],
    "Lạng Sơn": [
      "Thành phố Lạng Sơn",
      "Huyện Bắc Sơn",
      "Huyện Bình Gia",
      "Huyện Cao Lộc",
      "Huyện Chi Lăng",
      "Huyện Đình Lập",
      "Huyện Hữu Lũng",
      "Huyện Lộc Bình",
      "Huyện Tràng Định",
      "Huyện Văn Lãng",
      "Huyện Văn Quan",
    ],
    "Lào Cai": [
      "Thành phố Lào Cai",
      "Thị xã Sa Pa",
      "Huyện Bắc Hà",
      "Huyện Bảo Thắng",
      "Huyện Bảo Yên",
      "Huyện Bát Xát",
      "Huyện Mường Khương",
      "Huyện Si Ma Cai",
      "Huyện Văn Bàn",
    ],
    "Long An": [
      "Thành phố Tân An",
      "Thị xã Kiến Tường",
      "Huyện Bến Lức",
      "Huyện Cần Đước",
      "Huyện Cần Giuộc",
      "Huyện Châu Thành",
      "Huyện Đức Hòa",
      "Huyện Đức Huệ",
      "Huyện Mộc Hóa",
      "Huyện Tân Hưng",
      "Huyện Tân Thạnh",
      "Huyện Tân Trụ",
      "Huyện Thạnh Hóa",
      "Huyện Thủ Thừa",
      "Huyện Vĩnh Hưng",
    ],
    "Nam Định": [
      "Thành phố Nam Định",
      "Huyện Giao Thủy",
      "Huyện Hải Hậu",
      "Huyện Mỹ Lộc",
      "Huyện Nam Trực",
      "Huyện Nghĩa Hưng",
      "Huyện Trực Ninh",
      "Huyện Vụ Bản",
      "Huyện Xuân Trường",
      "Huyện Ý Yên",
    ],
    "Nghệ An": [
      "Thành phố Vinh",
      "Thị xã Cửa Lò",
      "Thị xã Hoàng Mai",
      "Thị xã Thái Hòa",
      "Thị xã Nghĩa Đàn",
      "Huyện Anh Sơn",
      "Huyện Con Cuông",
      "Huyện Diễn Châu",
      "Huyện Đô Lương",
      "Huyện Hưng Nguyên",
      "Huyện Kỳ Sơn",
      "Huyện Nam Đàn",
      "Huyện Nghi Lộc",
      "Huyện Nghĩa Đàn",
      "Huyện Quế Phong",
      "Huyện Quỳ Châu",
      "Huyện Quỳ Hợp",
      "Huyện Quỳnh Lưu",
      "Huyện Tân Kỳ",
      "Huyện Thanh Chương",
      "Huyện Tương Dương",
      "Huyện Yên Thành",
    ],
    "Ninh Bình": [
      "Thành phố Ninh Bình",
      "Thành phố Tam Điệp",
      "Huyện Gia Viễn",
      "Huyện Hoa Lư",
      "Huyện Kim Sơn",
      "Huyện Nho Quan",
      "Huyện Yên Khánh",
      "Huyện Yên Mô",
    ],
    "Ninh Thuận": [
      "Thành phố Phan Rang - Tháp Chàm",
      "Huyện Bác Ái",
      "Huyện Ninh Hải",
      "Huyện Ninh Phước",
      "Huyện Ninh Sơn",
      "Huyện Thuận Bắc",
      "Huyện Thuận Nam",
    ],
    "Phú Thọ": [
      "Thành phố Việt Trì",
      "Thị xã Phú Thọ",
      "Huyện Cẩm Khê",
      "Huyện Đoan Hùng",
      "Huyện Hạ Hòa",
      "Huyện Lâm Thao",
      "Huyện Phù Ninh",
      "Huyện Tam Nông",
      "Huyện Tân Sơn",
      "Huyện Thanh Ba",
      "Huyện Thanh Sơn",
      "Huyện Thanh Thủy",
      "Huyện Yên Lập",
    ],
    "Phú Yên": [
      "Thành phố Tuy Hòa",
      "Thị xã Sông Cầu",
      "Huyện Đông Hòa",
      "Huyện Đồng Xuân",
      "Huyện Phú Hòa",
      "Huyện Sơn Hòa",
      "Huyện Sông Hinh",
      "Huyện Tây Hòa",
      "Huyện Tuy An",
    ],
    "Quảng Bình": [
      "Thành phố Đồng Hới",
      "Thị xã Ba Đồn",
      "Huyện Bố Trạch",
      "Huyện Lệ Thủy",
      "Huyện Minh Hóa",
      "Huyện Quảng Ninh",
      "Huyện Quảng Trạch",
      "Huyện Tuyên Hóa",
    ],
    "Quảng Nam": [
      "Thành phố Tam Kỳ",
      "Thành phố Hội An",
      "Thị xã Điện Bàn",
      "Huyện Bắc Trà My",
      "Huyện Đại Lộc",
      "Huyện Đông Giang",
      "Huyện Duy Xuyên",
      "Huyện Hiệp Đức",
      "Huyện Nam Giang",
      "Huyện Nam Trà My",
      "Huyện Nông Sơn",
      "Huyện Núi Thành",
      "Huyện Phú Ninh",
      "Huyện Phước Sơn",
      "Huyện Quế Sơn",
      "Huyện Tây Giang",
      "Huyện Thăng Bình",
      "Huyện Tiên Phước",
    ],
    "Quảng Ngãi": [
      "Thành phố Quảng Ngãi",
      "Huyện Ba Tơ",
      "Huyện Bình Sơn",
      "Huyện Đức Phổ",
      "Huyện Lý Sơn",
      "Huyện Minh Long",
      "Huyện Mộ Đức",
      "Huyện Nghĩa Hành",
      "Huyện Sơn Hà",
      "Huyện Sơn Tây",
      "Huyện Sơn Tịnh",
      "Huyện Trà Bồng",
      "Huyện Tư Nghĩa",
    ],
    "Quảng Ninh": [
      "Thành phố Hạ Long",
      "Thành phố Móng Cái",
      "Thành phố Cẩm Phả",
      "Thành phố Uông Bí",
      "Thị xã Đông Triều",
      "Thị xã Quảng Yên",
      "Huyện Ba Chẽ",
      "Huyện Bình Liêu",
      "Huyện Cô Tô",
      "Huyện Đầm Hà",
      "Huyện Hải Hà",
      "Huyện Hoành Bồ",
      "Huyện Tiên Yên",
      "Huyện Vân Đồn",
    ],
    "Quảng Trị": [
      "Thành phố Đông Hà",
      "Thị xã Quảng Trị",
      "Huyện Cam Lộ",
      "Huyện Cồn Cỏ",
      "Huyện Đa Krông",
      "Huyện Gio Linh",
      "Huyện Hải Lăng",
      "Huyện Hướng Hóa",
      "Huyện Triệu Phong",
      "Huyện Vĩnh Linh",
    ],
    "Sóc Trăng": [
      "Thành phố Sóc Trăng",
      "Thị xã Ngã Năm",
      "Thị xã Vĩnh Châu",
      "Huyện Châu Thành",
      "Huyện Cù Lao Dung",
      "Huyện Kế Sách",
      "Huyện Long Phú",
      "Huyện Mỹ Tú",
      "Huyện Mỹ Xuyên",
      "Huyện Thạnh Trị",
      "Huyện Trần Đề",
    ],
    "Sơn La": [
      "Thành phố Sơn La",
      "Huyện Bắc Yên",
      "Huyện Mai Sơn",
      "Huyện Mộc Châu",
      "Huyện Mường La",
      "Huyện Phù Yên",
      "Huyện Quỳnh Nhai",
      "Huyện Sông Mã",
      "Huyện Sốp Cộp",
      "Huyện Thuận Châu",
      "Huyện Vân Hồ",
      "Huyện Yên Châu",
    ],
    "Tây Ninh": [
      "Thành phố Tây Ninh",
      "Thị xã Hòa Thành",
      "Thị xã Trảng Bàng",
      "Huyện Bến Cầu",
      "Huyện Châu Thành",
      "Huyện Dương Minh Châu",
      "Huyện Gò Dầu",
      "Huyện Tân Biên",
      "Huyện Tân Châu",
    ],
    "Thái Bình": [
      "Thành phố Thái Bình",
      "Huyện Đông Hưng",
      "Huyện Hưng Hà",
      "Huyện Kiến Xương",
      "Huyện Quỳnh Phụ",
      "Huyện Thái Thụy",
      "Huyện Tiền Hải",
      "Huyện Vũ Thư",
    ],
    "Thái Nguyên": [
      "Thành phố Thái Nguyên",
      "Thành phố Sông Công",
      "Thị xã Phổ Yên",
      "Huyện Đại Từ",
      "Huyện Định Hóa",
      "Huyện Đồng Hỷ",
      "Huyện Phú Bình",
      "Huyện Phú Lương",
      "Huyện Võ Nhai",
    ],
    "Thanh Hóa": [
      "Thành phố Thanh Hóa",
      "Thị xã Bỉm Sơn",
      "Thị xã Nghi Sơn",
      "Huyện Bá Thước",
      "Huyện Cẩm Thủy",
      "Huyện Đông Sơn",
      "Huyện Hà Trung",
      "Huyện Hậu Lộc",
      "Huyện Hoằng Hóa",
      "Huyện Lang Chánh",
      "Huyện Mường Lát",
      "Huyện Nga Sơn",
      "Huyện Ngọc Lặc",
      "Huyện Như Thanh",
      "Huyện Như Xuân",
      "Huyện Nông Cống",
      "Huyện Quan Hóa",
      "Huyện Quan Sơn",
      "Huyện Quảng Xương",
      "Huyện Thạch Thành",
      "Huyện Thiệu Hóa",
      "Huyện Thọ Xuân",
      "Huyện Thường Xuân",
      "Huyện Triệu Sơn",
      "Huyện Vĩnh Lộc",
      "Huyện Yên Định",
    ],
    "Thừa Thiên - Huế": [
      "Thành phố Huế",
      "Thị xã Hương Thủy",
      "Thị xã Hương Trà",
      "Huyện A Lưới",
      "Huyện Nam Đông",
      "Huyện Phong Điền",
      "Huyện Phú Lộc",
      "Huyện Phú Vang",
      "Huyện Quảng Điền",
    ],
    "Tiền Giang": [
      "Thành phố Mỹ Tho",
      "Thị xã Cai Lậy",
      "Thị xã Gò Công",
      "Huyện Cái Bè",
      "Huyện Cai Lậy",
      "Huyện Châu Thành",
      "Huyện Chợ Gạo",
      "Huyện Gò Công Đông",
      "Huyện Gò Công Tây",
      "Huyện Tân Phú Đông",
      "Huyện Tân Phước",
    ],
    "TP Hồ Chí Minh": [
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 9",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Quận Bình Tân",
      "Quận Bình Thạnh",
      "Quận Gò Vấp",
      "Quận Phú Nhuận",
      "Quận Tân Bình",
      "Quận Tân Phú",
      "Quận Thủ Đức",
      "Huyện Bình Chánh",
      "Huyện Cần Giờ",
      "Huyện Củ Chi",
      "Huyện Hóc Môn",
      "Huyện Nhà Bè",
    ],
    "Trà Vinh": [
      "Thành phố Trà Vinh",
      "Thị xã Duyên Hải",
      "Huyện Càng Long",
      "Huyện Cầu Kè",
      "Huyện Cầu Ngang",
      "Huyện Châu Thành",
      "Huyện Duyên Hải",
      "Huyện Tiểu Cần",
      "Huyện Trà Cú",
    ],
    "Tuyên Quang": [
      "Thành phố Tuyên Quang",
      "Huyện Chiêm Hóa",
      "Huyện Hàm Yên",
      "Huyện Lâm Bình",
      "Huyện Na Hang",
      "Huyện Sơn Dương",
      "Huyện Yên Sơn",
    ],
    "Vĩnh Long": [
      "Thành phố Vĩnh Long",
      "Thị xã Bình Minh",
      "Huyện Bình Tân",
      "Huyện Long Hồ",
      "Huyện Mang Thít",
      "Huyện Tam Bình",
      "Huyện Trà Ôn",
      "Huyện Vũng Liêm",
    ],
    "Vĩnh Phúc": [
      "Thành phố Vĩnh Yên",
      "Thành phố Phúc Yên",
      "Huyện Bình Xuyên",
      "Huyện Lập Thạch",
      "Huyện Sông Lô",
      "Huyện Tam Dương",
      "Huyện Tam Đảo",
      "Huyện Vĩnh Tường",
      "Huyện Yên Lạc",
    ],
    "Yên Bái": [
      "Thành phố Yên Bái",
      "Thị xã Nghĩa Lộ",
      "Huyện Lục Yên",
      "Huyện Mù Cang Chải",
      "Huyện Trạm Tấu",
      "Huyện Trấn Yên",
      "Huyện Văn Chấn",
      "Huyện Văn Yên",
      "Huyện Yên Bình",
    ],
  };
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertVariant, setAlertVariant] = useState<string>("success");
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedCity1, setSelectedCity1] = useState("");
  const [selectedDistrict1, setSelectedDistrict1] = useState("");
  const [selectedWard1, setSelectedWard1] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const axios = require("axios");
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "householdAddress4") 
    {
      setDistrictOptions(districts[event.target.value] || []);
      setFormData({ ...formData, householdAddress4: event.target.value, householdAddress3: "" });
    console.log(event.target.name, event.target.value);
    }
  };

  const host = "https://vapi-vnappmob.readthedocs.io/en/latest/index.html";

  useEffect(() => {
    callAPI(`${host}`);
  }, []);

  const callAPI = (api: string) => {
    axios.get(api).then((response: any) => {
      console.log(response.data.data);
      setCities(response.data);
    });
  };

  // const callApiDistrict = (api: string) => {
  //   axios.get(api).then((response: any) => {
  //     setDistricts(response.data.districts);
  //     console.log(response.data.name);
  //     setProvince(response.data.name);
  //   });
  // };

  const callApiWard = (api: string) => {
    axios.get(api).then((response: any) => {
      setWards(response.data.wards);
      console.log(response.data.name);
      setDistrict(response.data.name);
    });
  };

  const callNameWard = (api: string) => {
    axios.get(api).then((response: any) => {
      setWard(response.data.name);
      console.log(response.data.name);
    });
  };

  // const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const cityCode = event.target.value;
  //   setSelectedCity(cityCode);
  //   setSelectedDistrict("");
  //   setSelectedWard("");
  //   if (cityCode) {
  //     callApiDistrict(`${host}p/${cityCode}?depth=2`);
  //   }

  //   console.log("");
  // };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtCode = event.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard("");
    if (districtCode) {
      callApiWard(`${host}d/${districtCode}?depth=2`);
    }
    //console.log(districts);
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWard(event.target.value);
    const wardCode = event.target.value;
    if (wardCode) {
      callNameWard(`${host}w/${wardCode}?depth=2`);
    }
    setWard(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setFormData({ ...formData, idImage: e.target?.result as string });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleCodeSubmit = () => {
    console.log("Confirm Code");
  };

  const handleSubmition = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        fullName: formData.fullName,
        numberId: "12345",
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        placeOfBirth: formData.placeOfBirth,
        ethnicType: formData.ethnicity,
        houseHold: `${formData.householdAddress1}, ${formData.householdAddress4}, ${formData.householdAddress3}, ${formData.householdAddress2}`,
        address: `${formData.permanentResidence1}, ${formData.permanentResidence4}, ${formData.permanentResidence3}, ${formData.permanentResidence2}`,
        school: formData.secondSchool,

        // "fullName": formData.fullName,
        // "numberID": "12345",
        // "gender": formData.gender,
        // "dateOfBirth": formData.dateOfBirth,
        // "phoneNumber": formData.phoneNumber,
        // "email": formData.email,
        // "placeOfBirth": formData.placeOfBirth,
        // "ethnicType": formData.ethnicity,
        // "houseHold": `${formData.householdAddress1}, ${formData.householdAddress4}, ${formData.householdAddress3}, ${formData.householdAddress2}`,
        // "address": `${formData.permanentResidence1}, ${formData.permanentResidence4}, ${formData.permanentResidence3}, ${formData.permanentResidence2}`,
        // "school": formData.secondSchool,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/register/student",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log(response.data);
      console.log("msg", response.data.message);

      // Handle successful registration
      if (response.data.message == "User already exist") {
        setAlertMessage("Email đã tồn tại!");
        setAlertVariant("danger");
      } else {
        setAlertMessage("Đăng ký thành công!");
        setAlertVariant("success");
      }

      setShowAlert(true);
    } catch (error: any) {
      console.error(error);
      console.log(error.response);
      console.log(error.response.status);

      // Handle errors appropriately (e.g., display error messages)
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          setAlertMessage("Email đã tồn tại!");
        } else {
          setAlertMessage(
            "An error occurred during registration. Please try again."
          );
        }
      } else {
        setAlertMessage("An unexpected error occurred. Please try again.");
      }
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

 

  // const householdAddress4 = formData.householdAddress4;
  // const districtOptions =
  //   householdAddress4 && districts[householdAddress4]
  //     ? districts[householdAddress4]
  //     : [];

  // // Tạo các option cho dropdown
  // const districtDropdownOptions = districtOptions.map((district) => (
  //   <option key={district} value={district}>
  //     {district}
  //   </option>
  // ));

  // const perma4 = formData.permanentResidence4;
  // const districtOptions1 =
  //   perma4 && districts[perma4]
  //     ? districts[perma4]
  //     : [];

  // // Tạo các option cho dropdown
  // const districtDropdownOptions1 = districtOptions1.map((district) => (
  //   <option key={district} value={district}>
  //     {district}
  //   </option>
  // ));
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const allFieldsFilled = Object.values(formData).every(
    //   (value) => value.trim() !== ""
    // );
    // setFormSubmitted(true);
    // if (allFieldsFilled && formData.idImage) {
    //   setFormSubmitted(true);
    //   setAlertMessage("Form submitted successfully!");
    //   setShowAlert(true);
    //   setTimeout(() => setShowAlert(false), 3000);
    // } else {
    //   setAlertMessage("Please fill in all fields and upload the image.");
    //   setShowAlert(true);
    //   setTimeout(() => setShowAlert(false), 3000);
    //   console.log("Please fill in all fields and upload the image.");
    // }
    try {
      let data = JSON.stringify({
        fullName: formData.fullName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        placeOfBirth: formData.placeOfBirth,
        ethnicType: formData.ethnicity,
        houseHold: `${formData.householdAddress1}, ${formData.householdAddress4}, ${formData.householdAddress3}, ${formData.householdAddress2}`,
        address: `${formData.permanentResidence1}, ${formData.permanentResidence4}, ${formData.permanentResidence3}, ${formData.permanentResidence2}`,
        school: formData.secondSchool,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8081/register/student",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "40px" }}
    >
      {formSubmitted ? (
        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <h1>Nhập thông tin thành công</h1>
          <p>Hãy nhập mã xác nhận được gửi qua email bạn dùng để đăng ký:</p>
          <Form className="flex items-center justify-evenly">
            <Form.Group
              className="col-xl-5 justify-self-center "
              controlId="formBlankField"
            >
              <Form.Control type="text" placeholder="Nhập mã xác nhận" />
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            type="submit"
            className="mt-6"
            onClick={handleCodeSubmit}
          >
            Submit
          </Button>
        </div>
      ) : (
        <>
          <h1>Đăng ký hồ sơ</h1>
          {showAlert && (
            <Alert
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <Form onSubmit={handleSubmition}>
            <Row className="mb-3">
              <Col md={4}>
                <Row className="mb-3  min-h-20">
                  <Form.Group controlId="formFullName">
                    <Form.Label className="pl-2">Họ tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Nhập họ tên"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="formDateOfBirth">
                    <Form.Label className="pl-2">Ngày sinh</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="mb-3 min-h-20">
                  <Form.Group controlId="formGender">
                    <Form.Label className="pl-2">Giới tính</Form.Label>
                    <div className="d-flex flex-wrap">
                      <Form.Check
                        className="me-md-3 mb-2"
                        inline
                        type="checkbox"
                        label="Nam"
                        name="gender"
                        value="Nam"
                        checked={formData.gender === "Nam"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        className="me-md-3 mb-2"
                        inline
                        type="checkbox"
                        label="Nữ"
                        name="gender"
                        value="Nữ"
                        checked={formData.gender === "Nữ"}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="formPlaceOfBirth">
                    <Form.Label className="pl-2">Nơi sinh</Form.Label>
                    <Form.Control
                      as="select"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn nơi sinh --</option>
                      <option value="An Giang">An Giang</option>
                      <option value="Bà Rịa - Vũng Tàu">
                        Bà Rịa - Vũng Tàu
                      </option>
                      <option value="Bắc Giang">Bắc Giang</option>
                      <option value="Bắc Kạn">Bắc Kạn</option>
                      <option value="Bạc Liêu">Bạc Liêu</option>
                      <option value="Bắc Ninh">Bắc Ninh</option>
                      <option value="Bến Tre">Bến Tre</option>
                      <option value="Bình Định">Bình Định</option>
                      <option value="Bình Dương">Bình Dương</option>
                      <option value="Bình Phước">Bình Phước</option>
                      <option value="Bình Thuận">Bình Thuận</option>
                      <option value="Cà Mau">Cà Mau</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Cao Bằng">Cao Bằng</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Đắk Lắk">Đắk Lắk</option>
                      <option value="Đắk Nông">Đắk Nông</option>
                      <option value="Điện Biên">Điện Biên</option>
                      <option value="Đồng Nai">Đồng Nai</option>
                      <option value="Đồng Tháp">Đồng Tháp</option>
                      <option value="Gia Lai">Gia Lai</option>
                      <option value="Hà Giang">Hà Giang</option>
                      <option value="Hà Nam">Hà Nam</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hà Tĩnh">Hà Tĩnh</option>
                      <option value="Hải Dương">Hải Dương</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Hậu Giang">Hậu Giang</option>
                      <option value="Hòa Bình">Hòa Bình</option>
                      <option value="Hưng Yên">Hưng Yên</option>
                      <option value="Khánh Hòa">Khánh Hòa</option>
                      <option value="Kiên Giang">Kiên Giang</option>
                      <option value="Kon Tum">Kon Tum</option>
                      <option value="Lai Châu">Lai Châu</option>
                      <option value="Lâm Đồng">Lâm Đồng</option>
                      <option value="Lạng Sơn">Lạng Sơn</option>
                      <option value="Lào Cai">Lào Cai</option>
                      <option value="Long An">Long An</option>
                      <option value="Nam Định">Nam Định</option>
                      <option value="Nghệ An">Nghệ An</option>
                      <option value="Ninh Bình">Ninh Bình</option>
                      <option value="Ninh Thuận">Ninh Thuận</option>
                      <option value="Phú Thọ">Phú Thọ</option>
                      <option value="Phú Yên">Phú Yên</option>
                      <option value="Quảng Bình">Quảng Bình</option>
                      <option value="Quảng Nam">Quảng Nam</option>
                      <option value="Quảng Ngãi">Quảng Ngãi</option>
                      <option value="Quảng Ninh">Quảng Ninh</option>
                      <option value="Quảng Trị">Quảng Trị</option>
                      <option value="Sóc Trăng">Sóc Trăng</option>
                      <option value="Sơn La">Sơn La</option>
                      <option value="Tây Ninh">Tây Ninh</option>
                      <option value="Thái Bình">Thái Bình</option>
                      <option value="Thái Nguyên">Thái Nguyên</option>
                      <option value="Thanh Hóa">Thanh Hóa</option>
                      <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                      <option value="Tiền Giang">Tiền Giang</option>
                      <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                      <option value="Trà Vinh">Trà Vinh</option>
                      <option value="Tuyên Quang">Tuyên Quang</option>
                      <option value="Vĩnh Long">Vĩnh Long</option>
                      <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                      <option value="Yên Bái">Yên Bái</option>
                      <option value="Nước ngoài">Nước ngoài</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Col>
              <Col xs="auto" className="justify-center">
                <Form.Group
                  controlId="formIDImage"
                  className="flex flex-col items-start"
                >
                  {!formData.idImage ? (
                    <div className="mb-2.5">
                      <Form.Label className="pl-2 justify-self-center">
                        Ảnh Thẻ
                      </Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  ) : (
                    <div className="mb-2.5">
                      <Form.Label className="pl-2">Ảnh Thẻ</Form.Label>
                      <img
                        src={formData.idImage}
                        alt="Uploaded Image"
                        className="mt-2 max-w-36 max-h-36"
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3 bg-amber-100 rounded">
              <Col>
                <Form.Group controlId="formHouseholdAddress2">
                  <Form.Label className="pl-2">Tỉnh/Thành Phố</Form.Label>
                  <Form.Control
                    as="select"
                    name="householdAddress2"
                    value={formData.householdAddress2}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Chọn địa chỉ --</option>

                    <option value="An Giang">An Giang</option>
                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                    <option value="Bắc Giang">Bắc Giang</option>
                    <option value="Bắc Kạn">Bắc Kạn</option>
                    <option value="Bạc Liêu">Bạc Liêu</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Bến Tre">Bến Tre</option>
                    <option value="Bình Định">Bình Định</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Bình Phước">Bình Phước</option>
                    <option value="Bình Thuận">Bình Thuận</option>
                    <option value="Cà Mau">Cà Mau</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Cao Bằng">Cao Bằng</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Đắk Lắk">Đắk Lắk</option>
                    <option value="Đắk Nông">Đắk Nông</option>
                    <option value="Điện Biên">Điện Biên</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Đồng Tháp">Đồng Tháp</option>
                    <option value="Gia Lai">Gia Lai</option>
                    <option value="Hà Giang">Hà Giang</option>
                    <option value="Hà Nam">Hà Nam</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                    <option value="Hải Dương">Hải Dương</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Hậu Giang">Hậu Giang</option>
                    <option value="Hòa Bình">Hòa Bình</option>
                    <option value="Hưng Yên">Hưng Yên</option>
                    <option value="Khánh Hòa">Khánh Hòa</option>
                    <option value="Kiên Giang">Kiên Giang</option>
                    <option value="Kon Tum">Kon Tum</option>
                    <option value="Lai Châu">Lai Châu</option>
                    <option value="Lâm Đồng">Lâm Đồng</option>
                    <option value="Lạng Sơn">Lạng Sơn</option>
                    <option value="Lào Cai">Lào Cai</option>
                    <option value="Long An">Long An</option>
                    <option value="Nam Định">Nam Định</option>
                    <option value="Nghệ An">Nghệ An</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                    <option value="Ninh Thuận">Ninh Thuận</option>
                    <option value="Phú Thọ">Phú Thọ</option>
                    <option value="Phú Yên">Phú Yên</option>
                    <option value="Quảng Bình">Quảng Bình</option>
                    <option value="Quảng Nam">Quảng Nam</option>
                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Quảng Trị">Quảng Trị</option>
                    <option value="Sóc Trăng">Sóc Trăng</option>
                    <option value="Sơn La">Sơn La</option>
                    <option value="Tây Ninh">Tây Ninh</option>
                    <option value="Thái Bình">Thái Bình</option>
                    <option value="Thái Nguyên">Thái Nguyên</option>
                    <option value="Thanh Hóa">Thanh Hóa</option>
                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                    <option value="Tiền Giang">Tiền Giang</option>
                    <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                    <option value="Trà Vinh">Trà Vinh</option>
                    <option value="Tuyên Quang">Tuyên Quang</option>
                    <option value="Vĩnh Long">Vĩnh Long</option>
                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                    <option value="Yên Bái">Yên Bái</option>
                    <option value="Nước ngoài">Nước ngoài</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHouseholdAddress3">
                  <Form.Label className="pl-2">Quận/Huyện</Form.Label>
                  <Form.Control
                    as="select"
                    name="householdAddress3"
                    value={formData.householdAddress3}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Di linh</option>
                    {Object.keys(districts).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHouseholdAddress4">
                  <Form.Label className="pl-2">Xã/Phường</Form.Label>
                  <Form.Control
                    as="select"
                    name="householdAddress4"
                    value={formData.householdAddress4}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Liên Đầm</option>
                    {Object.keys(districts).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHouseholdAddress1">
                  <Form.Label className="pl-2">Địa chỉ hộ khẩu</Form.Label>
                  <Form.Control
                    type="text"
                    name="householdAddress1"
                    placeholder="Nhập địa chỉ"
                    value={formData.householdAddress1}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 bg-pink-100 rounded">
              <Col>
                <Form.Group controlId="formPermanentResidence2">
                  <Form.Label className="pl-2">Tỉnh/Thành Phố</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentResidence2"
                    value={formData.permanentResidence2}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Chọn địa chỉ --</option>
                    <option value="">-- Chọn địa chỉ --</option>
                    <option value="An Giang">An Giang</option>
                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                    <option value="Bắc Giang">Bắc Giang</option>
                    <option value="Bắc Kạn">Bắc Kạn</option>
                    <option value="Bạc Liêu">Bạc Liêu</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Bến Tre">Bến Tre</option>
                    <option value="Bình Định">Bình Định</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Bình Phước">Bình Phước</option>
                    <option value="Bình Thuận">Bình Thuận</option>
                    <option value="Cà Mau">Cà Mau</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Cao Bằng">Cao Bằng</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Đắk Lắk">Đắk Lắk</option>
                    <option value="Đắk Nông">Đắk Nông</option>
                    <option value="Điện Biên">Điện Biên</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Đồng Tháp">Đồng Tháp</option>
                    <option value="Gia Lai">Gia Lai</option>
                    <option value="Hà Giang">Hà Giang</option>
                    <option value="Hà Nam">Hà Nam</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                    <option value="Hải Dương">Hải Dương</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Hậu Giang">Hậu Giang</option>
                    <option value="Hòa Bình">Hòa Bình</option>
                    <option value="Hưng Yên">Hưng Yên</option>
                    <option value="Khánh Hòa">Khánh Hòa</option>
                    <option value="Kiên Giang">Kiên Giang</option>
                    <option value="Kon Tum">Kon Tum</option>
                    <option value="Lai Châu">Lai Châu</option>
                    <option value="Lâm Đồng">Lâm Đồng</option>
                    <option value="Lạng Sơn">Lạng Sơn</option>
                    <option value="Lào Cai">Lào Cai</option>
                    <option value="Long An">Long An</option>
                    <option value="Nam Định">Nam Định</option>
                    <option value="Nghệ An">Nghệ An</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                    <option value="Ninh Thuận">Ninh Thuận</option>
                    <option value="Phú Thọ">Phú Thọ</option>
                    <option value="Phú Yên">Phú Yên</option>
                    <option value="Quảng Bình">Quảng Bình</option>
                    <option value="Quảng Nam">Quảng Nam</option>
                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Quảng Trị">Quảng Trị</option>
                    <option value="Sóc Trăng">Sóc Trăng</option>
                    <option value="Sơn La">Sơn La</option>
                    <option value="Tây Ninh">Tây Ninh</option>
                    <option value="Thái Bình">Thái Bình</option>
                    <option value="Thái Nguyên">Thái Nguyên</option>
                    <option value="Thanh Hóa">Thanh Hóa</option>
                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                    <option value="Tiền Giang">Tiền Giang</option>
                    <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                    <option value="Trà Vinh">Trà Vinh</option>
                    <option value="Tuyên Quang">Tuyên Quang</option>
                    <option value="Vĩnh Long">Vĩnh Long</option>
                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                    <option value="Yên Bái">Yên Bái</option>
                    <option value="Nước ngoài">Nước ngoài</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formPermanentResidence3">
                  <Form.Label className="pl-2">Quận/Huyện</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentResidence3"
                    value={formData.permanentResidence3}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Liên Đầm</option>
                    {Object.keys(districts).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPermanentResidence4">
                  <Form.Label className="pl-2">Xã/Phường</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentResidence4"
                    value={formData.permanentResidence4}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Hòa Ninh</option>
                    {Object.keys(districts).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPermanentResidence1">
                  <Form.Label className="pl-2">Địa chỉ thường trú</Form.Label>
                  <Form.Control
                    type="text"
                    name="permanentResidence1"
                    placeholder="Nhập địa chỉ"
                    value={formData.permanentResidence1}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formEthnicity">
                  <Form.Label className="pl-2">Dân tộc</Form.Label>
                  <Form.Control
                    type="text"
                    name="ethnicity"
                    placeholder="Nhập dân tộc"
                    value={formData.ethnicity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formSecondSchool">
                  <Form.Label className="pl-2">Trường THCS</Form.Label>
                  <Form.Control
                    type="text"
                    name="secondSchool"
                    placeholder="Nhập trường THCS"
                    value={formData.secondSchool}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label className="pl-2">Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Nhập SĐT"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label className="pl-2">Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 justify-center"></Row>
            <Row className="justify-center">
              <Col xs="auto">
                <Button className="btn-custom" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Container>
  );
};

export default ProfileRegisterPage;
