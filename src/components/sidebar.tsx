//demo
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";
import { TbMenu2 } from "react-icons/tb";

const Sidebar: React.FC<{ route: string }> = ({ route }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //route = "Admin";
  return (
    <div className="text-black text-xl flex-col font-notoSans flex mr-0 lg:mr-52">
      <div className="bg-white h-full lg:w-52 lg:mt-8 xl:mt-0 hidden lg:flex xl:flex 2xl:flex fixed top-20 bottom-0">
        {/* <div className={`px-4 py-2 ${isOpen ? "hidden" : "block"}`}> */}
        {route === "Khach" ? (
          <></>
        ) : route === "ThiSinh" ? (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">Tra cứu</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Hồ sơ</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Nguyện vọng</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        ) : route === "TaiChinh" ? (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý lệ phí
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý thí sinh
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        ) : route === "DaoTao" ? (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý thí sinh
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý điểm thi
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý thông số
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">
              Bài viết và thông báo
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">Báo cáo</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        ) : route === "KhaoThi" ? (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">Tra cứu</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Hồ sơ</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Nguyện vọng</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        ) : (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý tài khoản
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">Quy định</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        )}
      </div>
      {/* Mobile Menu */}
      <div
        className={`bg-white h-full px-4 py-2 ${
          isOpen ? "block" : "hidden"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center mb-2 mt-10 cursor-pointer">
          <FaWindowClose size={24} onClick={toggleMenu} color="red" />
        </div>
        {route === "Khach" ? (
          <></>
        ) : route === "ThiSinh" ? (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">Tra cứu</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Hồ sơ</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Nguyện vọng</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        ) : route === "TaiChinh" ? (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý lệ phí
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý thí sinh
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        ) : route === "DaoTao" ? (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý thí sinh
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý điểm thi
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý thông số
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">
              Bài viết và thông báo
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">Báo cáo</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        ) : route === "KhaoThi" ? (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý chấm thi
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        ) : (
          <ul className="flex-1">
            <li className="py-2 cursor-pointer hover:bg-gray">
              Quản lý tài khoản
            </li>
            <li className="py-2 cursor-pointer hover:bg-gray">Quy định</li>
            <li className="py-2 cursor-pointer hover:bg-gray">Đăng xuất</li>
          </ul>
        )}
      </div>
      {/* Mobile Toggle Button */}
      <TbMenu2
        className={`absolute left-0 md:top-28 sm:top-32 top-40 lg:hidden bg-white  ${
          isOpen ? "hidden" : ""
        } cursor-pointer`}
        size={40}
        onClick={toggleMenu}
      />
    </div>
  );
};

export default Sidebar;
