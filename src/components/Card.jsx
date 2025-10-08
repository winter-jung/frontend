import { Link } from "react-router";

export default function Card({ movie, item }) {
  const content = movie || item;

  if (!content || !content.poster_path) {
    return null;
  }

  const img = `https://image.tmdb.org/t/p/w500${content.poster_path}`;

  return (
    <Link to={`/tv/${content.id}`} className="block group">
      <div className="px-6 py-6 rounded-lg transition-transform duration-300 group-hover:scale-105 bg-[#282730] w-full">
        <div className="max-h-[300px] rounded-lg overflow-hidden"><img src={img} alt={content.title || content.name || "콘텐츠"}/></div>
        <div className="font-bold text-xl my-4 line-clamp-1">{content.title || content.name}</div>
        <p className="text-gray-500 text-base line-clamp-2 min-h-[50px]">{content.overview}</p>
      </div>
    </Link>
  );
}
