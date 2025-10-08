import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navi() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full py-8 bg-[#1A1442]/60 z-50 backdrop-blur-lg ">
      <div className="lg:container mx-auto flex whitespace-nowrap justify-between items-center md:gap-2">
        <div className="flex items-center md:gap-6 lg:gap-10 xl:gap-16">
          <Link to="/">
            <h1 className="w-[200px] lg:w-[270px] transition-all duration-300">
              <img src="./morebomb_logo.svg" alt="logo" />
            </h1>
          </Link>
          <div className="profile hidden lg:flex md:flex md:text-lg md:gap-3 lg:gap-6 xl:gap-10 p-4 text-white lg:text-xl justify-center">{showProfile ? <Profile onMenuClick={() => setShowProfile(false)} /> : <Gnb />}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-6 ">
            <NavLink to="/search">{({ isActive }) => <FontAwesomeIcon icon={faMagnifyingGlass} className="text-3xl md:text-4xl lg:text-4xl" style={{ color: isActive ? "#dcf312" : "#ffffff" }} />}</NavLink>
            <button onClick={() => {
              if (!showProfile) {
                navigate('/profile/all');
              }
              setShowProfile(!showProfile);
            }} className="cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="text-3xl md:text-4xl lg:text-4xl" style={{ color: showProfile ? "#dcf312" : "#ffffff" }} />
            </button>
          </div>
          {/* 모바일 햄버거 버튼 */}
          <button className="lg:hidden md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff", fontSize: "34px" }} />
          </button>
        </div>
      </div>
      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="lg:hidden md:hidden mt-4 flex flex-col gap-4 text-white text-[18px] px-4">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")} end>
            홈
          </NavLink>
          <NavLink to="/genres/18" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
            드라마
          </NavLink>
          <NavLink to="/genres/10759" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
            영화
          </NavLink>
          <NavLink to="/genres/16" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
            애니
          </NavLink>
          <NavLink to="/genres/18" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
            예능
          </NavLink>
          <NavLink to="/moregak" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
            몰밤각
          </NavLink>
          <NavLink to="/trending" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
            요즘 대세 콘텐츠
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navi;

function Gnb() {
  return (
    <>
      <NavLink to={`/`} className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")} end>
        홈
      </NavLink>
      <NavLink to={`/genres/18`} className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
        드라마
      </NavLink>
      <NavLink to={`/genres/10763`} className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
        영화
      </NavLink>
      <NavLink to={`/genres/16`} className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
        애니
      </NavLink>
      <NavLink to={`/genres/10764`} className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
        예능
      </NavLink>
      <NavLink to="/moregak" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
        몰밤각
      </NavLink>
      <NavLink to="/trending" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
        요즘 대세 콘텐츠
      </NavLink>
    </>
  );
}

function Profile({ onMenuClick }) {
  return (
    <>
      <NavLink to="/" onClick={onMenuClick} className="cursor-pointer">
        메뉴
      </NavLink>
      <NavLink to={`/profile/all`} className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
        전체
      </NavLink>
      <NavLink to="/profile/kids" className={({ isActive }) => (isActive ? "text-[#dcf312]" : "")}>
        키즈
      </NavLink>
    </>
  );
}
