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
    const btnp = `bg-white hover:bg-[#5A4FCF] text-black hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors duration-300 cursor-pointer`
    const btni = `hover:bg-black bg-[#E0E0E0] text-black hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors duration-300 cursor-pointer`

    return (
        <div className="relative">
            <div className="text-[#F5F5F5] absolute z-10 top-60 w-full mx-auto max-w-[620px] h-[500px] left-20 ml-6 rounded-[20px] p-10 bg-black/20">
                <div>
                    <h2 className="text-6xl font-bold mb-10"><span className="text-[#D4F312]">몰밤</span> 전용관</h2>
                    <div className="text-3xl mb-2">잠들기엔 너무 아까운 <span className="text-[#5A4FCF] font-bold">오늘 밤</span>,</div>
                    <div className="text-3xl">몰밤 전용관에서 지금 바로 즐겨보세요.</div>
                </div>
                <div className="flex gap-2 mt-25">
                    <button className={btnp}>시리즈 이동하기</button> {/* 버튼링크 어디로 이동하는걸로 넣을지 */}
                    <button className={btni}>상세정보</button>  {/* 버튼링크 어디로 이동하는걸로 넣을지 */}
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