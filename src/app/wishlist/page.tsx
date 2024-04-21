"use client";
import React from "react";
import { Button, Container } from "react-bootstrap";

const WishlistPage: React.FC = () => {
  const [wishlistData, setWishlistData] = React.useState<string[]>([
    "Toán",
    "Tin",
  ]);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   setFormData({ ...formData, [event.target.name]: event.target.value });
  // };
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       setFormData({ ...formData, idImage: e.target?.result as string });
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // handle form submission here
  //   console.log(formData);
  //   setFormData({
  //     fullName: "",
  //     idNumber: "",
  //     dateOfBirth: "",
  //     gender: "",
  //     permanentResidence1: "",
  //     permanentResidence2: "",
  //     permanentResidence3: "",
  //     householdAddress1: "",
  //     householdAddress2: "",
  //     householdAddress3: "",
  //     placeOfBirth: "",
  //     ethnicity: "",
  //     idImage: "",
  //     secondSchool: "",
  //     phoneNumber: "",
  //     email: "",
  //   });
  // };

  // const handleChangeWish;
  const handleClear = (): void => {
    setWishlistData([]);
  };
  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-4 bg-white mb-4">
        <h2 className="text-3xl">Danh sách nguyện vọng</h2>
        <table className="w-11/12 mx-auto mt-8 border-collapse border border-gray text-lg">
          <thead>
            <tr className="border border-gray text-center">
              <th className="w-2/12 lg:w-1/12">STT</th>
              <th>Tên môn</th>
            </tr>
          </thead>
          <tbody>
            {wishlistData?.map((item, index) => {
              return (
                <tr className="border border-gray" key={index}>
                  <td className="px-2 py-1 text-center">{index + 1}</td>
                  <td className="px-2 py-1">{item}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-around mt-4 w-11/12 lg:w-8/12 xl:w-6/12 2xl:4/12 mx-auto">
          <Button
            className="bg-white border-black text-black"
            onClick={handleClear}
          >
            Xóa tất cả
          </Button>
          <Button className="bg-mainBlue">Thêm nguyện vọng</Button>
        </div>
      </div>
    </Container>
  );
};

export default WishlistPage;
