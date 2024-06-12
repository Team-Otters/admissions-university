"use client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useDebounce from "@/hooks/useDebounce";
import FormAccount from "@/components/formAccount";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
import { host } from "@/constants/string";
import APIFacade from "@/context/login";

const AccountManagePage: React.FC = () => {
  const router = useRouter();
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<Account>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isHiddens, setIsHiddens] = useState<boolean[]>([]);
  const [filterGroupList, setFilterGroupList] = useState([
    "All",
    "Username",
    "Password",
    "Tên tài khoản",
    "Vai trò",
  ]);
  const [recentFilterGroupList, setRecentFilterGroupList] =
    useState(filterGroupList);
  const [searchText, setSearchText] = React.useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([
 ]);

  const [searchAccounts, setSearchAccounts] =
    React.useState<Account[]>(accounts);

  const search = (text: string): Account[] => {
    let temp: Account[] = accounts.filter((account) => {
      for (const element of recentFilterGroupList) {
        switch (element) {
          case "All":
            console.log(text.toLowerCase());
            if (
              account.username.toLowerCase().includes(text.toLowerCase()) ||
              account.accountName.toLowerCase().includes(text.toLowerCase()) ||
              account.role.toLowerCase().includes(text.toLowerCase())
            ) {
              return account;
            }
            break;
          case "Tên tài khoản":
            if (
              account.accountName.toLowerCase().includes(text.toLowerCase())
            ) {
              return account;
            }
            break;
          case "Username":
            if (account.username.toLowerCase().includes(text.toLowerCase())) {
              return account;
            }
            break;
          case "Vai trò":
            if (account.role.toLowerCase().includes(text.toLowerCase())) {
              return account;
            }
            break;
          default:
            console.log("Unknown search group");
        }
      }
    });
    return temp;
  };

  const applyFilter = (): void => {
    let selectElement = document.getElementById("filter") as HTMLSelectElement;
    console.log(selectElement.value);
    setRecentFilterGroupList([selectElement.value]);
  };

  const handleSubmit = async (data: Account) => {
    try {
      await APIFacade.addUser(data);
      getAllUser();
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };

  const handleEdit = (data: Account): void => {
    let idx: number = -1;
    accounts.map((account, index) => {
      if (account.username == data.username) {
        idx = index;
      }
    });

    if (idx != -1) {
      let temp: Account[] = [...accounts];
      temp[idx] = data || {
        accountName: "",
        username: "",
        password: "",
        role: "",
      };
      setAccounts(temp);
      console.log(temp[idx]);
    } else {
      console.log("Lỗi update");
    }
  };

  const handleEditRow = (account: Account): void => {
    setRowToEdit(account);
    setIsOpenForm(true);
  };

  const handleClearRow = (username: string): void => {
    let temp: Account[] = [...accounts];
    temp = temp.filter((value) => {
      if (value.username !== username) {
        return value;
      }
    });
    setAccounts(temp);
  };

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };
  const getAllUser = async () => {
    const response = await APIFacade.getAllUser();
    setAccounts(response);
  }
  const handleHiddenPass = (idx: number): void => {
    let temp: boolean[] = [...isHiddens];
    temp[idx] = !temp[idx];
    setIsHiddens(temp);
  };

  const debounceSearch = useDebounce(searchText, 500);
  useEffect(() => {
    router.refresh();
    getAllUser();
    // if (debounceSearch == ''){
    //     setSearchExam({mostRelevant: [], albums: [], tracks: [], artists: []});
    // }
    // else {
    //     executeSearchQuery(debounceSearch);
    // }
    setSearchAccounts(search(searchText));
  }, [debounceSearch]);

  React.useEffect(() => {
    console.log("truoc khi search in filter: ", recentFilterGroupList);
    let temp = search(searchText);
    console.log("sau khi search in array ketqua: ", temp);
    setSearchAccounts(temp);
  }, [recentFilterGroupList]);

  React.useEffect(() => {
    setSearchAccounts(accounts);
    setRecentFilterGroupList(["All"]);
    let selectElement = document.getElementById("filter") as HTMLSelectElement;
    selectElement.selectedIndex = 0;
    setSearchText("");
  }, [accounts]);

  React.useEffect(() => {
    let temp: boolean[] = [...isHiddens];
    temp.length = 0;
    searchAccounts.forEach(() => {
      temp.push(true);
    });
    setIsHiddens(temp);
  }, [searchAccounts]);

  React.useEffect(() => {
    let temp: boolean[] = [...isHiddens];
    temp.length = 0;
    accounts.forEach(() => {
      temp.push(true);
    });
    setIsHiddens(temp);
  }, []);

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-1 mb-4">
        <h2 className="text-3xl">Quản lý tài khoản</h2>
        <div className="w-11/12 mx-auto flex flex-row justify-between">
          <div
            className={`w-1/3 bg-white overflow-hidden h-12 rounded-3xl px-2 border-black border ${
              isInputFocused ? "border-2" : "border-1"
            } flex flex-row`}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          >
            <input
              className="w-full focus:border-transparent focus:outline-none"
              placeholder="Tìm kiếm..."
              type="search"
              value={searchText}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={handleSearchText}
            ></input>
            <FaSearch className="w-2/12 lg:w-1/12 self-center" />
          </div>
          <div className="flex flex-row">
            <MdOutlineFilterAlt className="self-center ml-2" size={24} />
            <select
              name="filter"
              id="filter"
              className="ml-2 rounded-xl border border-black"
              onChange={applyFilter}
            >
              {filterGroupList.map((item, index) => {
                return (
                  <option key={index} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <Button
            onClick={() => {
              setRowToEdit(undefined);
              setIsEdit(false);
              setIsOpenForm(true);
            }}
          >
            Tạo tài khoản
          </Button>
        </div>
        <div className="w-11/12 mx-auto font-notoSans font-bold mt-6 align-center text-lg">
          Tổng: {searchAccounts?.length}
        </div>
        <table className="max-w-11/12 w-11/12 mx-auto text-lg shadow-tableShadow border-collapse rounded-3xl bg-white">
          <thead>
            <tr className="text-center text-blueTitle border-b border-gray">
              <th className="p-2 w-1/12">STT</th>
              <th className="border-l border-gray p-2">username</th>
              <th className="border-l border-gray p-2">Mật khẩu</th>
              <th className="border-l border-gray p-2">Tên tài khoản</th>
              <th className="border-l border-gray p-2">Vai trò</th>
              <th className="w-12 border-gray p-2"></th>
            </tr>
          </thead>
          <tbody>
            {searchAccounts?.map((item, index) => {
              return (
                <tr
                  className="border-b border-gray rounded-b-lg last:border-none"
                  key={index}
                >
                  <td className="px-2 py-1 border-r">{index + 1}</td>
                  <td className="px-2 py-1 border-r">{item.username}</td>
                  <td className="px-2 py-1 border-r flex flex-row justify-between">
                    <input
                      className="bg-white"
                      type={`${
                        isHiddens.length == 0
                          ? "password"
                          : isHiddens[index]
                          ? "password"
                          : "text"
                      }`}
                      value={`${item.password}`}
                      disabled
                    ></input>
                    {isHiddens[index] ? (
                      <IoMdEyeOff
                        size={20}
                        className="self-center cursor-pointer"
                        onClick={() => handleHiddenPass(index)}
                      />
                    ) : (
                      <IoMdEye
                        size={20}
                        className="self-center cursor-pointer"
                        onClick={() => handleHiddenPass(index)}
                      />
                    )}
                  </td>
                  <td className="px-2 py-1 border-r">{item.accountName}</td>
                  <td className="px-2 py-1">{item.role}</td>
                  <td className="flex flex-row justify-center h-9 self-center justify-self-center">
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isOpenForm && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <FormAccount
              accounts={accounts}
              closeModal={() => setIsOpenForm(false)}
              isEdit={isEdit}
              onSubmit={isEdit ? handleEdit : handleSubmit}
              defaultValue={
                rowToEdit === undefined
                  ? {
                      accountName: "",
                      username: "",
                      password: "",
                      role: "",
                    }
                  : rowToEdit
              }
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AccountManagePage;
