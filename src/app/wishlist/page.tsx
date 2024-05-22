"use client";
import FormWish from "@/components/formWish";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const WishlistPage: React.FC = () => {
  const [isOpenForm, setIsOpenForm] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<Wish>();
  const [wishlistData, setWishlistData] = React.useState<Wish[]>([
    {
      id: "NV001",
      name: "Toán",
      priority: 1,
    },
    {
      id: "NV002",
      name: "Tin",
      priority: 2,
    },
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

  const handleClearRow = (id: string): void => {
    let temp = wishlistData;
    temp = temp.filter((value) => {
      if (value.id !== id) {
        return value;
      }
    });
    setWishlistData(temp);
  };

  const handleSubmit = (newWish: Wish): void => {
    let temp = wishlistData;
    temp.push(newWish);
    setWishlistData(temp);
  };

  const handleEditRow = (w: Wish): void => {
    setRowToEdit(w);
    setIsOpenForm(true);
  };
  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-4 mb-4">
        <h2 className="text-3xl">Danh sách nguyện vọng</h2>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {wishlistData.length}
        </div>
        <table className="w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="border-gray w-2/12 lg:w-1/12 rounded-t-lg p-2">
                STT
              </th>
              <th className="border-l border-gray p-2">Tên môn</th>
              <th className="w-2/12 border-gray p-2"></th>
            </tr>
          </thead>
          <tbody>
            {wishlistData
              ?.sort((a, b) => b.priority - a.priority)
              .map((item, index) => {
                return (
                  <tr
                    className="border-b border-gray rounded-b-lg last:border-none"
                    key={index}
                  >
                    <td className="px-2 py-1 text-center border-r">
                      {index + 1}
                    </td>
                    <td className="px-2 py-1">{item.name}</td>
                    <td className="flex flex-row justify-center h-9 self-center justify-self-center">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          handleEditRow(item);
                        }}
                      >
                        <FaPencil size={18} />
                      </button>
                      <button
                        className="cursor-pointer ml-1"
                        onClick={() => {
                          handleClearRow(item.id);
                        }}
                      >
                        <MdDelete size={24} />
                      </button>
                    </td>
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
          <Button
            className="bg-mainBlue"
            onClick={() => {
              setRowToEdit(undefined);
              setIsOpenForm(true);
            }}
          >
            Thêm nguyện vọng
          </Button>
        </div>
        {isOpenForm && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <FormWish
              closeModal={() => setIsOpenForm(false)}
              onSubmit={handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? { id: "", name: "", priority: -1 }
                  : rowToEdit
              }
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default WishlistPage;
