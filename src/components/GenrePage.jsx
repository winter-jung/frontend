import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Section from "./Section";

function GenrePage() {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genreName, setGenreName] = useState("");

    // Genre ID to name mapping
    const genreNames = {
        10759: "액션 & 어드벤처",
        16: "애니메이션", 
        18: "드라마"
    };

    useEffect(() => {
        async function loadGenreMovies() {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_API_KEY,
                        with_genres: genreId,
                        language: 'ko-KR'
                    }
                });
                setMovies(response.data.results.filter(movie => movie.poster_path));
                setGenreName(genreNames[genreId] || "알 수 없는 장르");
            } catch (err) {
                console.error('장르별 콘텐츠 로딩 실패', err);
            } finally {
                setLoading(false);
            }
        }

        if (genreId) {
            loadGenreMovies();
        }
    }, [genreId]);

    if (loading) {
        return (
            <main className="pt-24 min-h-screen bg-black text-white grid place-items-center">
                <p>로딩중...</p>
            </main>
        );
    }

    return (
        <main className="pt-24 bg-black text-white min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">{genreName} 콘텐츠</h1>
                {movies.length > 0 ? (
                    <Section title={`${genreName} 추천 콘텐츠`} items={movies} m_v={3} p_v={6} />
                ) : (
                    <p className="text-center text-gray-400">해당 장르의 콘텐츠를 찾을 수 없습니다.</p>
                )}
            </div>
        </main>
    );
}

export default GenrePage;