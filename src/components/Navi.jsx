import { Link } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navi() {
    // const back = useNavigate(-1);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full py-8 bg-[#1A1442]/60 z-50 backdrop-blur-lg ">
            <div className="lg:container mx-auto flex whitespace-nowrap justify-between items-center md:gap-2">
                <div className="flex items-center md:gap-6 lg:gap-10 xl:gap-16">
                    <Link to="/">
                        <h1 className='w-[200px] lg:w-[270px] transition-all duration-300'><img src="./morebomb_logo.svg" alt="logo" /></h1>
                    </Link>
                    {/* 데스크탑 메뉴 */}
                    <div className="hidden lg:flex md:flex md:text-lg md:gap-3 lg:gap-6 xl:gap-10 p-4 text-white lg:text-xl justify-center">
                        <Link to={`/`}>홈</Link>
                        <Link to={`/genres/18`}>드라마</Link>
                        <Link to={`/genres/16`}>영화</Link>
                        <Link to={`/genres/10759`}>애니</Link>
                        <Link to={`/genres/18`}>예능</Link>
                        <Link to="/moregak">몰밤각</Link>
                        <Link to={`/genres/16`}>요즘 대세 콘텐츠</Link>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div className="flex gap-6 ">
                        <Link to="/search"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-3xl md:text-4xl lg:text-4xl"style={{color: "#ffffff",}} /></Link>
                        <Link to="/genres/p"><FontAwesomeIcon icon={faCircleUser} className="text-3xl md:text-4xl lg:text-4xl" style={{color: "#ffffff",}} /></Link>
                    </div>
                    {/* 모바일 햄버거 버튼 */}
                    <button className="lg:hidden md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <FontAwesomeIcon icon={faBars} style={{color: "#ffffff", fontSize: "34px"}} />
                    </button>
                </div>
            </div>
            {/* 모바일 메뉴 */}
            {isOpen && (
                <div className="lg:hidden md:hidden mt-4 flex flex-col gap-4 text-white text-[18px] px-4">
                    <Link to="/">홈</Link>
                    <Link to="/genres/18">드라마</Link>
                    <Link to="/genres/16">영화</Link>
                    <Link to="/genres/10759">애니</Link>
                    <Link to="/genres/18">예능</Link>
                    <Link to="/moregak">몰밤각</Link>
                    <Link to="/genres/16">요즘 대세 콘텐츠</Link>
                </div>
            )}
        </div>
    )
}

export default Navi;