import Navi from "./Navi";
const Error = function () {
    return (
        <div>
            <Navi />
            <div className="py-10 w-screen h-screen text-[5vw] text-white bg-black">
                <h1>404 Error</h1>
            </div>
        </div>
    )
}

export default Error;