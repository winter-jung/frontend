import {
  getPopular,
  getOnTheAir,
  getAiringToday,
  getTrending,
  getTopRated,
} from "../api/axios";
import { useEffect, useState } from "react";
import Section from "../components/Section";
import Chatbot from "../components/Chatbot";
import { Link } from "react-router";

function Moregak() {
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [trend, setTrend] = useState([]);
    const [airTV, setAirTV] = useState([]);
    const [popAni, setPopAni] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        async function loadNowPlaying() {
            try {
                const [po, np, up, tr, at] = await Promise.all([
                    getPopular(),
                    getOnTheAir(),
                    getAiringToday(),
                    getTrending(),
                    getTopRated(),
                ]);

                setPopular(po);
                setNowPlaying(np);
                setUpComing(up);
                setTrend(tr.data.results);
                setAirTV(at);
                setPopAni(at);
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
            <main className="pt-16 min-h-screen bg-[#1e1d25] text-white grid place-items-center">
                <p>로딩중...</p>
            </main>
        )
    }

    return (
        <>
            <main className="bg-[#1e1d25] text-white">
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
    const btnp = `bg-[#5A4FCF]/90 hover:bg-[#322996] text-white px-8 py-4 rounded-lg text-lg transition-colors duration-300 cursor-pointer`
    const btni = `hover:bg-[#1e1d25] bg-[#E0E0E0] text-[#1e1d25] hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors duration-300 cursor-pointer`

    return (
        <div className="relative">
            <div className="text-[#F5F5F5] absolute z-10 top-80 md:top-60 w-full max-w-full md:max-w-[620px] h-auto md:h-[400px] left-0 md:left-20 ml-0 md:ml-6 rounded-[20px] p-4 md:p-10 bg-[#1e1d25]/20 mx-auto">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-10"><span>몰밤</span> 전용관</h2>
                    <div className="text-lg md:text-2xl mb-2">잠들기엔 너무 아까운 <span className="text-[#D4F312] font-bold">오늘 밤</span>,</div>
                    <div className="text-lg md:text-2xl">몰밤 전용관에서 지금 바로 즐겨보세요.</div>
                </div>
                <div className="flex gap-2 mt-6 md:mt-10 flex-wrap">
                    <Link to={``} className={btnp + ' transition-transform duration-300 hover:scale-110'}>시리즈 이동하기</Link>
                    {/* <button className={btni}>상세정보</button>  버튼링크 어디로 이동하는걸로 넣을지 */}
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