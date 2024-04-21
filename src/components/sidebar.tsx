//demo
import { useState } from "react";
import { Button } from "react-bootstrap";

const Sidebar: React.FC<{ route: string }> = ({ route }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  route = "Admin";
  return (
    <div className="text-black text-xl flex-col font-notoSans flex">
      <div className="bg-white h-full lg:w-52 xl:w-52 2xl:w-52 hidden lg:flex xl:flex 2xl:flex h-fullscreen">
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
        <div className="flex justify-between items-center mb-4">
          <button className="text-black" onClick={toggleMenu}>
            Close
          </button>
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
      {/* Mobile Toggle Button */}
      <div
        className={`w-16 h-12 absolute top-24 bg-blueTitle lg:hidden  ${
          isOpen ? "hidden" : ""
        } cursor-pointer`}
        onClick={toggleMenu}
      >
        Menu
      </div>
    </div>
  );
};

export default Sidebar;
