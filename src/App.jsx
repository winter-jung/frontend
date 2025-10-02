import api from "./api/axios";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import Section from "./components/Section";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upComing, setUpComing] = useState([]);

  useEffect(() => {
    async function loadNowPlaying() {
      try {
        const np = await api.get(`on_the_air?language=ko-KR`);
        const po = await api.get(`popular?language=ko-KR`);
        const up = await api.get(`airing_today?language=ko-KR`);
        setNowPlaying(np.data.results.filter(movie => movie.poster_path))
        setPopular(po.data.results.filter(movie => movie.poster_path))
        setUpComing(up.data.results.filter(movie => movie.poster_path))
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
        <Section title="오늘의 몰밤 TOP 10" items={nowPlaying} m_v={2} p_v={5} />
        <Section title="지금 방영 중인 콘텐츠" items={popular} m_v={3} p_v={6} />
        <Section title="오늘 밤 몰아보기 추천" items={upComing} m_v={3} p_v={6} />
        <Section title="추천 인기 드라마" items={upComing} m_v={3} p_v={6} />
        <Section title="급상승 영화" items={upComing} m_v={3} p_v={6} />
        <Section title="인기 애니 시리즈" items={upComing} m_v={3} p_v={6} />
        <Section title="긴장감 넘치는 한국 시리즈" items={upComing} m_v={3} p_v={6} />
        <Section title="가을이면 생각나는 로맨스 영화" items={upComing} m_v={3} p_v={6} />
        <Section title="흥미진진한 해외 가족 코미디 영화" items={upComing} m_v={3} p_v={6} />
        <Section title="인기 예능" items={upComing} m_v={3} p_v={6} />
      </main>
      <Chatbot />
    </>
  )
}


function VideoHero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useState(null);

  const handleToggleMute = () => {
    setMuted(prev => !prev);
    if (videoRef[0]) {
      videoRef[0].muted = !muted;
    }
  };
  return (
    <section className="relative h-screen overflow-hidden">
      <video autoPlay muted={false} loop playsInline className='absolute top-0 left-0 w-full h-full object-cover'>
        <source src='video.mp4' />
      </video>
      <div className="relative z-10 flex-col flex items-center justify-center h-full mt-65">
        <button
          onClick={handleToggleMute}
          className="bg-black/60 rounded-full p-4 hover:bg-black/80 transition"
          aria-label={muted ? '음소거 해제' : '음소거'}
        >
          <FontAwesomeIcon icon={faVolumeHigh} beat={!muted}/>
        </button>
      </div>
    </section>
  )
}