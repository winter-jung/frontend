import Navi from "./Navi";
import StarBackground from '../components/StarBackground';

const Error = function () {
    return (
        <div className="relative min-h-screen">
            <StarBackground className="absolute inset-0" />
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navi />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-[5vw] font-bold z-10">404 Error</h1>
                <p className="text-[2vw] mt-4 z-10">🌠페이지를 찾을 수 없습니다.🌠</p>
            </div>
        </div>
    )
}

export default Error;