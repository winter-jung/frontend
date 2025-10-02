import { Link, useNavigate } from "react-router";

function Navi() {
    const back = useNavigate(-1);
    return (
        <div className="fixed top-0 left-0 w-full py-8 bg-black/90 z-50 backdrop-blur-lg"
            style={{ background: 'linear-gradient(to bottom, #0d0727 0%, rgba(13,7,39,0.6) 87.5%, rgba(13,7,39,0.4) 100%)' }}>
            <div className="container mx-auto flex whitespace-nowrap justify-between items-center">
                <div className="flex items-center gap-20">
                    <Link to="/">
                        <h1 className='w-[270px]'><img src="./morebomb_logo.svg" alt="logo" /></h1>
                    </Link>
                    <div className="flex gap-8 p-4 text-white text-[20px] justify-center ">
                        <Link to={`/`}>홈</Link>
                        <Link to={`/genres/18`}>드라마</Link>
                        <Link to={`/genres/16`}>영화</Link>
                        <Link to={`/genres/10759`}>애니</Link>
                        <Link to={`/genres/18`}>예능</Link>
                        <Link to="/moregak">몰밤각</Link>
                        <Link to={`/genres/16`}>요즘 대세 콘텐츠</Link>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <Link to="/search"><img src="./search.svg" alt="search" /></Link>
                    <Link><img src="./noti.svg" alt="noti" /></Link>
                    <Link><img src="./people.svg" alt="people" /></Link>
                </div>
            </div>

        </div>
    )
}

export default Navi;