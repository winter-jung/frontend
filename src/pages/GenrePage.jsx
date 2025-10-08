import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getByGenre, GENRE_NAMES } from "../api/axios";
import Lists from "../components/Lists";
import Banner from "../components/Banner"
import Chatbot from "../components/Chatbot";


function GenrePage() {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genreName, setGenreName] = useState("");

    useEffect(() => {
        async function loadGenreMovies() {
            try {
                setLoading(true);
                const response = await getByGenre(genreId);
                setMovies(response.data.results);
                const name = GENRE_NAMES[genreId] || "알 수 없는 장르";
                setGenreName(name === "뉴스" ? "영화" : name);
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
            <main className="pt-24 min-h-screen bg-[#1e1d25] text-white grid place-items-center">
                <p>로딩중...</p>
            </main>
        );
    }

    return (
        <div>
            <main className="pt-35 bg-[#1e1d25] text-white min-h-screen">
                <div className="container mx-auto px-4">
                    <Banner />
                    {/* <h1 className="text-3xl font-bold mb-8">{genreName} 몰아보기</h1> */}
                    {movies.length > 0 ? (
                        <Lists title={`${genreName} 추천 콘텐츠`} items={movies} />
                    ) : (
                        <p className="text-center text-gray-400">해당 장르의 콘텐츠를 찾을 수 없습니다.</p>
                    )}
                </div>
            </main>
            <Chatbot />
        </div>
    );
}

export default GenrePage;