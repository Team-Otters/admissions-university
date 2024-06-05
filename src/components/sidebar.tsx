//demo
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";
import { TbMenu2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useRole from "@/hooks/useRole";
import React from "react";
import AuthContext from "@/context/AuthContext";

const Sidebar: React.FC<{ route: string }> = ({ route }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const { role } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logout();
    // router.push("");
  };
  const handleNavigate = (path: string) => {
    router.push(path); // Use `router.push` for dynamic navigation
  };
  React.useEffect(() => {
    // ... your existing logic for retrieving role from local storage

    setForceRender(forceRender + 1); // Trigger re-render
  }, []);

  return (
    <div>
      {role == "Khach" ? (
        <div></div>
      ) : (
        <div className="text-black text-xl flex-col font-notoSans flex mr-0 lg:mr-52">
          <div className="bg-white h-full lg:w-52 lg:mt-8 xl:mt-0 hidden lg:flex xl:flex 2xl:flex fixed top-20 bottom-0">
            {/* <div className={`px-4 py-2 ${isOpen ? "hidden" : "block"}`}> */}
            {role == "Khach" ? (
              <></>
            ) : role === "STUDENT" ? (
              <ul className="flex-1">
                <li
                  onClick={() => handleNavigate("/studentscore")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Tra cứu
                </li>
                <li
                  onClick={() => handleNavigate("/studentprofile")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Hồ sơ
                </li>
                <li
                  onClick={() => handleNavigate("/wishlist")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Nguyện vọng
                </li>
                <li
                  onClick={handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : role === "TAICHINH" ? (
              <ul className="flex-1">
                <li
                  onClick={() => handleNavigate("/feemanage")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý lệ phí
                </li>
                <li
                  onClick={() => handleNavigate("/financeStudentList")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý thí sinh
                </li>
                <li
                  onClick={handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : role === "DAOTAO" ? (
              <ul className="flex-1">
                <li
                  onClick={() => handleNavigate("/financeStudentList")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý thí sinh
                </li>
                <li
                  onClick={() => handleNavigate("/venueManage")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý điểm thi
                </li>
                <li
                  onClick={() => handleNavigate("/subjectsets")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý môn thi
                </li>
                <li
                  onClick={() => handleNavigate("/examManage")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý kỳ thi
                </li>
                <li
                  onClick={() => handleNavigate("/")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Bài viết và thông báo
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý mốc thời gian
                </li>
                <li
                  onClick={() => handleNavigate("/scoreChart")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Báo cáo
                </li>
                <li
                  onClick={handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : role === "KHAOTHI" ? (
              <ul className="flex-1">
                <li
                  onClick={() => handleNavigate("/paperContainer")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý chấm thi
                </li>
                <li
                  onClick={handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : role === "ADMIN" ? (
              <ul className="flex-1">
                <li
                  onClick={() => handleNavigate("/accountManage")}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý tài khoản
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">Quy định</li>
                <li
                  onClick={handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : (
              <></>
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
            {role == "Khach" ? (
              <></>
            ) : role === "STUDENT" ? (
              <ul className="flex-1">
                <li className="py-2 cursor-pointer hover:bg-gray">Tra cứu</li>
                <li className="py-2 cursor-pointer hover:bg-gray">Hồ sơ</li>
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Nguyện vọng
                </li>
                <li
                  onClick={() => handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : role === "TAICHINH" ? (
              <ul className="flex-1">
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý lệ phí
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý thí sinh
                </li>
                <li
                  onClick={() => handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : role === "DAOTAO" ? (
              <ul className="flex-1">
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý thí sinh
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý điểm thi
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý môn thi
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý kỳ thi
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Bài viết và thông báo
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý mốc thời gian
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">Báo cáo</li>
                <li
                  onClick={() => handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : role === "KHAOTHI" ? (
              <ul className="flex-1">
                <li
                  onClick={() => handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Quản lý chấm thi
                </li>
                <li
                  onClick={() => handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : role === "ADMIN" ? (
              <ul className="flex-1">
                <li className="py-2 cursor-pointer hover:bg-gray">
                  Quản lý tài khoản
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray">Quy định</li>
                <li
                  onClick={() => handleLogout}
                  className="py-2 cursor-pointer hover:bg-gray"
                >
                  Đăng xuất
                </li>
              </ul>
            ) : (
              <></>
            )}
          </div>
          {/* Mobile Toggle Button */}
          <TbMenu2
            className={`absolute left-0 top-40 lg:hidden bg-white  ${
              isOpen ? "hidden" : ""
            } cursor-pointer`}
            size={40}
            onClick={toggleMenu}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
