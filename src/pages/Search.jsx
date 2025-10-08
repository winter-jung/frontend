import { useState } from 'react';
import { searchTV } from '../api/axios';
import Card from '../components/Card';
import { Link, useNavigate } from "react-router";


function Search() {
    // 상태 관리
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // TV 검색 함수
    const performSearch = async (searchQuery) => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const filled = await searchTV(searchQuery);
            setResults(filled);
        } catch (error) {
            console.error('검색 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 검색 폼 제출 처리
    const handleSearch = (e) => {
        e.preventDefault();
        performSearch(query);
    };

    return (
        <div className="min-h-screen bg-[#1e1d25] text-white pt-32 px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">오늘의 정주행 콘텐츠는?</h1>

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="오늘은 무슨 시리즈로 몰밤할까요?"
                            className="flex-1 p-2 rounded-[20px] bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-[#918adf] "
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-[#5A4FCF] rounded-[20px] hover:bg-[#322996] disabled:opacity-50 trasition-transform duration-200 active:scale-96"
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

