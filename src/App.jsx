import api from "./api/axios";
import { api2 } from "./api/axios";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import Section from "./components/Section";
import Chatbot from "./components/Chatbot";
import Search from "./components/Search";

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
    async function loadNowPlaying() {
      try {
        const po = await api.get(`popular?language=ko-KR`);
        const np = await api.get(`on_the_air?language=ko-KR`);
        const up = await api.get(`airing_today?language=ko-KR`);
        //const pp = await api2.get(`https://api.themoviedb.org/3/discover/tv?with_genres=10764&api_key=045de676aa8d4291cf0170a6ef76e978`)
        const tr = await api.get(`https://api.themoviedb.org/3/trending/tv/day?language=ko-KR`)
        const at = await api.get(`top_rated?language=ko-KR`)
        const pa = await api2.get('', {
          params: {
            with_origin_country: 'JP',
            with_genres: 16,
            language: 'ko-KR'
          }
        });
        const pk = await api2.get('/discover/tv', {
          params: {
            with_origin_country: 'KR',
            with_genres: '18',
            sort_by: 'popularity.desc',
          },
        });
        const ed = await api2.get('https://api.themoviedb.org/3/discover/tv', {
          params: {

            with_origin_country: 'US', // 또는 다른 국가 코드
            with_genres: '10751',
            sort_by: 'popularity.desc',
            language: 'ko-KR',
          },
        });
        const rl = await api2.get('https://api.themoviedb.org/3/discover/tv', {
          params: {

            with_origin_country: 'KR', // 또는 다른 국가 코드
            with_genres: '10764',
            sort_by: 'popularity.desc',
            language: 'ko-KR',
          },
        });



        setPopular(po.data.results.filter(tv => tv.poster_path))
        setNowPlaying(np.data.results.filter(tv => tv.poster_path))
        setUpComing(up.data.results.filter(tv => tv.poster_path))
        setTrend(tr.data.results.filter(tv => tv.poster_path))
        setAirTV(at.data.results.filter(tv => tv.poster_path))
        setPopAni(pa.data.results.filter(tv => tv.poster_path))
        setPopKD(pk.data.results.filter(tv => tv.poster_path))
        setEDrama(ed.data.results.filter(tv => tv.poster_path))
        setReality(rl.data.results.filter(tv => tv.poster_path))
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
        <Section title="오늘의 몰밤 TOP 10" items={popular} m_v={2} p_v={5} />
        <Section title="지금 방영 중인 콘텐츠" items={nowPlaying} m_v={3} p_v={6} />
        <Section title="오늘 밤 몰아보기 추천" items={upComing} m_v={3} p_v={6} />
        <Section title="추천 인기 시리즈물" items={trend} m_v={3} p_v={6} />
        <Section title="급상승 콘텐츠" items={airTV} m_v={3} p_v={6} />
        <Section title="인기 애니 시리즈" items={popAni} m_v={3} p_v={6} />
        <Section title="추천 인기 K드라마" items={popKD} m_v={3} p_v={6} />
        <Section title="해외 코미디 가족 드라마" items={eDrama} m_v={3} p_v={6} />
        <Section title="인기 예능" items={reality} m_v={3} p_v={6} />

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
    <section className="relative h-screen overflow-hidden mb-4">
      <video autoPlay  muted={muted} loop playsInline className='absolute top-0 left-0 w-full h-full object-cover'>
        <source src='video.mp4' />
      </video>
      <div className="relative z-10 flex-col flex items-center justify-center h-full mt-65">
        <button
          onClick={handleToggleMute}
          className="bg-black/30 rounded-full p-7 hover:bg-black/80 transition"
          aria-label={muted ? '음소거 해제' : '음소거'}
        >
          <FontAwesomeIcon icon={faVolumeHigh} beat={!muted}/>
        </button>
      </div>
    </section>
  )
}