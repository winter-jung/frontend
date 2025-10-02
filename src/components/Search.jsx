import { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Link, useNavigate } from "react-router";


function Search() {
    // 상태 관리
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // API 설정
   const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';

    // TV 검색 함수
    const searchTV = async (searchQuery) => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/search/tv`, {
                params: {
                    api_key: API_KEY,
                    query: searchQuery,
                    language: 'ko-KR'
                }
            });
            setResults(response.data.results.filter(tv => tv.poster_path));
        } catch (error) {
            console.error('검색 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 검색 폼 제출 처리
    const handleSearch = (e) => {
        e.preventDefault();
        searchTV(query);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">오늘의 정주행 콘텐츠는?</h1>

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="TV 프로그램을 검색하세요..."
                            className="flex-1 p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? '검색 중...' : '검색'}
                        </button>
                    </div>
                </form>

                {results.length > 0 && (
                    <div>
                        <h2 className="text-xl mb-4">검색 결과 ({results.length}개)</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {results.map((tv) => (
                                <Card key={tv.id} movie={tv} />
                            ))}
                        </div>
                    </div>
                )}

                {results.length === 0 && query && !loading && (
                    <div className="text-center text-gray-400 mt-8">
                        검색 결과가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;

