import { Link, useNavigate } from "react-router";

function Navi() {
    const back = useNavigate();

    return (
        <div className="flex gap-8 bg-pink-100 p-4 text-[20px]">
            <Link to='/'>홈</Link>
            <Link to='/drama'>드라마</Link>
            <Link to='/movie'>영화</Link>
            <Link to='/ani'>애니</Link>
            <Link to='/comedy'>예능</Link>
            <Link to='/morebomb'>몰밤각</Link>
            <Link to='/now'>요즘 대세 콘텐츠</Link>
        </div>
    )
}

export default Navi;