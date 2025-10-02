import api from "../api/axios";
import { useEffect, useState } from "react";
import Section from "./Section";
import Chatbot from "./Chatbot";

function Moregak() {
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [trend, setTrend] = useState([]);
    const [airTV, setAirTV] = useState([]);
    const [popAni, setPopAni] = useState([]);

    useEffect(() => {
        async function loadNowPlaying() {
            try {
                const po = await api.get(`popular?language=ko-KR`);
                const np = await api.get(`on_the_air?language=ko-KR`);
                const up = await api.get(`airing_today?language=ko-KR`);
                //const pp = await api2.get(`https://api.themoviedb.org/3/discover/tv?with_genres=10764&api_key=045de676aa8d4291cf0170a6ef76e978`)
                const tr = await api.get(`https://api.themoviedb.org/3/trending/tv/day?language=ko-KR`)
                const at = await api.get(`top_rated?language=ko-KR`)
                // const pa = await apiCate.get(`tv?with_genres=16&`)

                setPopular(po.data.results.filter(tv => tv.poster_path))
                setNowPlaying(np.data.results.filter(tv => tv.poster_path))
                setUpComing(up.data.results.filter(tv => tv.poster_path))
                setTrend(tr.data.results.filter(tv => tv.poster_path))
                setAirTV(at.data.results.filter(tv => tv.poster_path))
                setPopAni(at.data.results.filter(tv => tv.poster_path))
            }
            catch (err) {
                console.error('로딩실패', err)
            }
        }
        loadNowPlaying();
    }, [])
    const isLoading = nowPlaying.length === 0 && popular.length === 0 && upComing.length === 0;

    if (isLoading) {
        return (
            <main className="pt-16 min-h-screen bg-black text-white grid place-items-center">
                <p>로딩중...</p>
            </main>
        )
    }

    return (
        <>
            <main className="bg-black text-white">
                <VideoHero />
                <Section title="내가 찜한 시리즈" items={nowPlaying} m_v={3} p_v={6} />
                <Section title="오늘 대한민국의 TOP 10 시리즈" items={popular} m_v={2} p_v={5} />
                <Section title="스릴러&미스터리 시리즈" items={upComing} m_v={3} p_v={6} />
                <Section title="일본 원화 원작 애니" items={popAni} m_v={3} p_v={6} />
                <Section title="예능 정주행" items={airTV} m_v={3} p_v={6} />
                <Section title="보고 또 봐도 좋은 인기 시리즈" items={trend} m_v={3} p_v={6} />
                <Section title="판타지 영화 시리즈물" items={trend} m_v={3} p_v={6} />

            </main>
            <Chatbot />
        </>
    );
}


function VideoHero() {
    const btnp = `bg-white hover:bg-black text-black hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors duration-300 cursor-pointer`
    const btni = `hover:bg-black bg-[#E0E0E0] text-black hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors duration-300 cursor-pointer`

    return (
        <div className="relative">
            <div className="absolute z-10 top-[250px] w-[500px] h-auto left-[150px] ml-6">
                <div className="w-[500px]">
                    <h2 className="text-white text-6xl font-bold mb-10">Title</h2>
                    <span>정보1 Lorem ipsum, dolor</span>
                    <br />
                    <span>정보2 Lorem ispansum dolor sit amet consectetur adipisicing elit. Est nulla sit alias consequatur debitis. Ipsa libero sequi quisquam optio, debitis dolor omnis beatae nisi fuga hic enim ab dolorum aliquam.</span>
                </div>
                <div className="flex gap-2 mt-20">
                    <button className={btnp}>재생</button>
                    <button className={btni}>상세정보
                    </button>
                </div>
            </div>

            <section className="relative h-screen overflow-hidden">
                <video autoPlay muted loop playsInline className='absolute top-0 left-0 w-full h-full object-cover'>
                    <source src='mbk.mp4' />
                </video>
            </section>
        </div>
    )
}

export default Moregak;