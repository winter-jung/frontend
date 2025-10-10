import { useNavigate, useLocation } from "react-router";
import { memo } from "react";

function Card({ movie, item }) {
  const content = movie || item;
  const navigate = useNavigate();
  const location = useLocation();

  if (!content || !content.poster_path) {
    return null;
  }

  const img = `https://image.tmdb.org/t/p/w500${content.poster_path}`;

  const handleCardClick = (e) => {
    e.preventDefault();

    // 프로필 페이지에서 온 경우 query parameter 추가
    const isFromProfile = location.pathname.startsWith('/profile');
    if (isFromProfile) {
      navigate(`/tv/${content.id}?from=profile&type=${location.pathname.split('/')[2]}`);
    } else {
      navigate(`/tv/${content.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="block group cursor-pointer"
    >
      <div className="px-6 py-6 rounded-lg transition-transform duration-300 group-hover:scale-105 bg-[#282730] w-full relative">
        {/* 트레일러 배지 */}
        {content.hasTrailer && (
          <div className="absolute top-2 right-2 bg-[#D4F312] text-black text-xs px-2 py-1 rounded-full font-bold z-10">
            🎬 예고편
          </div>
        )}

        <div className="max-h-[300px] rounded-lg overflow-hidden">
          <img src={img} alt={content.title || content.name || "콘텐츠"} />
        </div>
        <div className="font-bold text-xl my-4 line-clamp-1">{content.title || content.name}</div>
        <p className="text-gray-500 text-base line-clamp-2 min-h-[50px]">{content.overview}</p>
      </div>
    </div>
  );
}

export default memo(Card);
