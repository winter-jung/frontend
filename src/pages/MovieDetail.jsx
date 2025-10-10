import api, { getSimilar } from "../api/axios";
import Section from "../components/Section";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonVideos, setSeasonVideos] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const movieRes = await api.get(`${id}?language=ko-KR`);
        setMovie(movieRes.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    getMovieDetails();
  }, [id]);

  // 시즌별 비디오 로드 (폴백 포함)
  useEffect(() => {
    async function getSeasonVideos() {
      if (!movie || !selectedSeason) return;

      try {
        // 1차: 시즌별 비디오 확인
        let videos = [];
        let videoSource = "season";

        try {
          const seasonVideoRes = await api.get(`${id}/season/${selectedSeason}/videos?language=ko-KR`);
          videos = seasonVideoRes.data.results;
          console.log('Season videos:', videos);
        } catch (seasonError) {
          console.warn('Season videos not found, trying series videos...');
        }

        // 2차: 시즌별 비디오가 없으면 TV 시리즈 전체 비디오 확인
        if (videos.length === 0) {
          try {
            const seriesVideoRes = await api.get(`${id}/videos?language=ko-KR`);
            videos = seriesVideoRes.data.results;
            videoSource = "series";
            console.log('Series videos:', videos);
          } catch (seriesError) {
            console.warn('Series videos not found either');
          }
        }

        setSeasonVideos(videos);

        // 비디오 타입 우선순위: Trailer > Teaser > Clip > Behind the Scenes
        const videoTypePriority = ["Trailer", "Teaser", "Clip", "Behind the Scenes"];

        let bestVideo = null;
        for (const type of videoTypePriority) {
          bestVideo = videos.find(video => video.type === type);
          if (bestVideo) break;
        }

        if (bestVideo) {
          setVideoId(bestVideo.key);
          console.log(`Found ${bestVideo.type} from ${videoSource}:`, bestVideo.name);
        } else {
          setVideoId(null);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setSeasonVideos([]);
        setVideoId(null);
      }
    }

    getSeasonVideos();
  }, [id, movie, selectedSeason]);

  const handleWatchClick = () => {
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    } else {
      const seasonText = movie?.seasons ? `시즌 ${selectedSeason}` : "이 콘텐츠";
      alert(`죄송합니다. ${seasonText}의 예고편이 현재 제공되지 않습니다.`);
    }
  };

  // 현재 찾은 비디오 타입 확인
  const getCurrentVideoType = () => {
    if (!videoId || seasonVideos.length === 0) return null;
    const currentVideo = seasonVideos.find(v => v.key === videoId);
    return currentVideo?.type || null;
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (!videoId) return "예고편 없음";

    const videoType = getCurrentVideoType();
    switch(videoType) {
      case "Trailer": return "🎬 예고편 보기";
      case "Teaser": return "🎥 티저 보기";
      case "Clip": return "📹 클립 보기";
      case "Behind the Scenes": return "🎭 메이킹 보기";
      default: return "▶️ 영상 보기";
    }
  };

  if (!movie) {
    return <div className="min-h-screen bg-[#1e1d25] text-white flex-item-center justify-center">Loading...</div>;
  }

  // 버튼 및 텍스트 css
  const btn = `bg-[#ffffff] hover:bg-[#FBFEE7] hover:text-[#1e1d25] text-[#1e1d25] px-6 py-3 rounded-lg transition duration-300 cursor-pointer hover:scale-110`;
  const text = `text-[#D4F312] font-bold text-lg mb-2`;
  const text2 = `text-[#5A4FCF] font-bold text-lg mb-2`;

  //영화상세정보
  return (
    <div className="min-h-screen bg-[#1e1d25] text-white p-4 py-[80px]">
      <div className="container mx-auto py-8 mt-10">
        <div className="flex flex-col gap-8 md:flex-row">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.name} className="w-full h-full md:w-1/3 rounded-lg" />

          <div className="md:w-2/3 mx-10">
            <h1 className="text-4xl font-bold my-10">{movie.name}</h1>

            {/* 시즌 선택 */}
            {movie.seasons && movie.seasons.length > 1 && (
              <div className="mb-6">
                <h3 className={text2}>시즌 선택</h3>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
                  className="bg-[#282730] text-white px-4 py-2 rounded-lg border border-[#5A4FCF] focus:outline-none focus:ring-2 focus:ring-[#D4F312]"
                >
                  {movie.seasons
                    .filter((season) => season.season_number > 0) // 시즌 0 제외
                    .map((season) => (
                      <option key={season.id} value={season.season_number}>
                        {season.name} ({season.episode_count}부작)
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button
              className={`${btn} mb-10 ${!videoId ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleWatchClick}
              disabled={!videoId}
            >
              {getButtonText()}
            </button>

            <p className="text-lg mb-4">{movie.overview}</p>
            <div className="grid grid-cols-3 gap-4 mt-15">
              <div>
                <h3 className={text2}>장르</h3>
                <p>
                  {movie.genres.map((el) => (
                    <span key={el.id}>{el.name}</span>
                  ))}
                </p>
              </div>
              <div>
                <h3 className={text2}>평점</h3>
                <p>{movie.vote_average}점</p>
              </div>
              <div>
                <h3 className={text2}>방영 상태</h3>
                <p>{movie.status}</p>
              </div>
            </div>
          </div>
        </div>
        <SimilarContent id={id} type="tv" />
        <SimilarContent id={id} type="movie" />
      </div>
    </div>
  );
}

// 비슷한 콘텐츠
function SimilarContent({ id, type = "tv" }) {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const title = type === "tv" ? "TV 비슷한 콘텐츠" : "영화 비슷한 콘텐츠";

  useEffect(() => {
    async function loadSimilarContent() {
      try {
        setLoading(true);
        const similarData = await getSimilar(type, id);
        setSimilar(similarData);
      } catch (error) {
        console.error(`Error loading similar ${type} content:`, error);
        setSimilar([]);
      } finally {
        setLoading(false);
      }
    }

    loadSimilarContent();
  }, [id, type]);

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-[#D4F312] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (similar.length === 0) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <p className="text-gray-400">비슷한 콘텐츠를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <Section title={title} items={similar} />
    </div>
  );
}

export default MovieDetail;