import Navi from "./Navi";
const Error = function () {
    return (
        <div>
            <Navi />
            <div className="w-screen h-screen text-[5vw] text-white bg-red-600">
                <h1>404 Error</h1>
            </div>
        </div>
    )
}

export default Error;