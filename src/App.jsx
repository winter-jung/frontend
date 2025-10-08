import {
  getByCountryAndGenre,
  getTrending,
  getPopular,
  getOnTheAir,
  getAiringToday,
  getTopRated
} from "./api/axios";
import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import Section from "./components/Section";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trend, setTrend] = useState([]);
  const [airTV, setAirTV] = useState([]);
  const [popAni, setPopAni] = useState([]);
  const [popKD, setPopKD] = useState([]);
  const [eDrama, setEDrama] = useState([]);
  const [reality, setReality] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function loadNowPlaying() {
      try {
        const [po, np, up, tr, at, pa, pk, ed, rl] = await Promise.all([
          getPopular(),
          getOnTheAir(),
          getAiringToday(),
          getTrending(),
          getTopRated(),
          getByCountryAndGenre("JP", 16),
          getByCountryAndGenre("KR", 18),
          getByCountryAndGenre("US", 10751),
          getByCountryAndGenre("KR", 10764),
        ]);

        setPopular(po);
        setNowPlaying(np);
        setUpComing(up);
        setTrend(tr.data.results);
        setAirTV(at);
        setPopAni(pa.data.results);
        setPopKD(pk.data.results);
        setEDrama(ed.data.results);
        setReality(rl.data.results);
      } catch (err) {
        console.error("로딩실패", err);
      }
    }
    loadNowPlaying();
  }, []);

  const isLoading = nowPlaying.length === 0 && popular.length === 0 && upComing.length === 0;

  if (isLoading) {
    return (
      <main className="pt-16 min-h-screen bg-[#1A1442] text-white grid place-items-center">
        <p>로딩중...</p>
      </main>
    );
  }
  return (
    <div className="text-[#dfdfd9]">
      <VideoHero />
      <Section title="오늘의 몰밤 TOP 10" items={popular} m_v={2} p_v={5} />
      <Section title="지금 방영 중인 콘텐츠" items={nowPlaying} m_v={3} p_v={6} />
      <Section title="오늘 밤 몰아보기 추천" items={upComing} m_v={3} p_v={6} />
      <Section title="추천 인기 시리즈물" items={trend} m_v={3} p_v={6} />
      <Section title="급상승 콘텐츠" items={airTV} m_v={3} p_v={6} />
      <Section title="인기 애니 시리즈" items={popAni} m_v={3} p_v={6} />
      <Section title="추천 인기 K드라마" items={popKD} m_v={3} p_v={6} />
      <Section title="해외 코미디 가족 드라마" items={eDrama} m_v={3} p_v={6} />
      <Section title="인기 예능" items={reality} m_v={3} p_v={6} />
      <Chatbot />
    </div>
  );
}

function VideoHero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const handleToggleMute = () => {
    setMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
  };
  return (
    <section className="relative h-screen overflow-hidden">
      <video ref={videoRef} autoPlay muted={muted} loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="video.mp4" />
      </video>
      <div className="relative z-10 flex-col flex items-center justify-center h-full mt-65">
        <button onClick={handleToggleMute} className="bg-[#1A1442]/30 rounded-full p-7 hover:bg-[#1e1d25]/80 transition" aria-label={muted ? "음소거 해제" : "음소거"}>
          <FontAwesomeIcon icon={faVolumeHigh} beat={!muted} />
        </button>
      </div>
    </section>
  );
}
