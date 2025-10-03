import api from "../api/axios";
import { api2 } from "../api/axios";
import Section from "../components/Section";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from 'axios';


// 플레이화면 링크연결해야함

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    async function getMovieDetails() {
      const res = await api.get(`${id}?language=ko-KR`);
      setMovie(res.data)
      console.log(res.data);
    }
    getMovieDetails()
  }, [id])/* 의존성배열의 값이 바꿀때  실행 */
  if (!movie) {
    return <div className="min-h-screen bg-black text-white flex-item-center justify-center">Loading...</div>
  }
  // 버튼 및 텍스트 css
  const btn = `bg-white hover:bg-[#D4F312] hover:text-black text-black px-8 py-4 rounded-lg text-lg font-bold transition duration-300 cursor-pointer hover:scale-110`
  const text = `text-[#D4F312] font-bold text-lg mb-2`
  const text2 = `text-[#5A4FCF] font-bold text-lg mb-2`

  //영화상세정보
  return (
    <div className="min-h-screen bg-black text-white p-4 py-[80px]">
      <div className="container mx-auto py-8 mt-10">
        <div className="flex flex-col gap-8 md:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.name}
            className="w-full h-full md:w-1/3 rounded-lg"
          />

          <div className="md:w-2/3 mx-10">
            <h1 className="text-4xl font-bold my-10">{movie.name}</h1>
            <button className={`${btn} mb-10`}>시청하기</button>
            <p className="text-lg mb-4">{movie.overview}</p>
            <div className="grid grid-cols-2 gap-4 mt-15">
              <div>
                <h3 className={text2}>장르</h3>
                <p>{movie.genres.map((el) => (
                  <span key={el.id}>{el.name}</span>
                ))}</p>
              </div>
              <div>
                <h3 className={text2}>평점</h3>
                <p>{movie.vote_average}점</p>
              </div>
              <div>
                <h3 className={text2}>시즌 정보</h3>
                <p>  {movie.seasons.map((el) => (
                  <span key={el.id}>
                    {el.name} ({el.air_date}, {el.episode_count}부작) <br />
                  </span>
                ))}</p>
              </div>
              <div>
                <h3 className={text2}>방영 상태</h3>
                <p>{movie.status}</p>
              </div>
            </div>
          </div>
        </div>
        <SimilarContent id={id} type="tv"/>
        <SimilarContent id={id} type="movie" />
      </div>
    </div>
  )

}
// 비슷한 콘텐츠
function SimilarContent({ id, type = 'tv' }) {
  const [similar, setSimilar] = useState([]);
const title = type === 'tv' ? 'TV 비슷한 콘텐츠' : '영화 비슷한 콘텐츠';

  useEffect(() => {
    async function loadSimilarContent() {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: 'ko-KR',
          },
        });
        setSimilar(res.data.results.filter(item => item.poster_path));
      } catch (err) {
        console.error('비슷한 콘텐츠 로딩 실패:', err);
      }
    }

    if (id) loadSimilarContent();
  }, [id, type]);

  if (similar.length === 0) {
    return (
      <main className="pt-16 min-h-[426px] bg-black text-white grid place-items-center">
        <p className="text-2xl"> {type} 비슷한 콘텐츠가 없습니다.</p>
      </main>
    );
  }
  return (
    <main className="bg-black text-white">
      <Section title={title} items={similar} m_v={3} p_v={6} />
    </main>
  );
}


export default MovieDetail