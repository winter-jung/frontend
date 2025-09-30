import { Link, useNavigate } from "react-router";

function Navi() {
    const back = useNavigate(-1);
    return (
        <div className="flex gap-8 bg-pink-100 p-4 text-[20px]">
            <Link to="/">
                <h1 className='w-[270px]'><img src="./morebomb_logo.svg" alt="logo" /></h1>
            </Link>
            <Link to={`/genres/18`}>드라마</Link>
            <Link to={`/genres/10759`}>액션 & 어드벤처</Link>
            <Link to={`/genres/16`}>애니메이션</Link>
        </div>
    )
}

export default Navi;