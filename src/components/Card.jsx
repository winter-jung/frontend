import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Card({ movie }) {
  const img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <Link to={`/tv/${movie.id}`} className="block group">
      <img src={img} alt={movie.title} className="w-full rounded-md transition-transform duration-300 group-hover:scale-105 bg-neutral-800" />
    </Link>
  )
}