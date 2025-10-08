import axios from "axios";

// API 키
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 1. TV 프로그램 API (인기, 방영중 등)
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/",
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

// 2. 장르별 콘텐츠 API
const api2 = axios.create({
  baseURL: "https://api.themoviedb.org/3/discover/tv",
  params: {
    api_key: API_KEY,
    language: "ko-KR",
    sort_by: "popularity.desc",
  },
});

// 3. 장르 목록 API
const apiCate = axios.create({
  baseURL: "https://api.themoviedb.org/3/genre/tv/list",
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

// 4. 검색 API
const apiSearch = axios.create({
  baseURL: "https://api.themoviedb.org/3/search/tv",
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

// 5. 챗봇 API
const chatApi = axios.create({
  baseURL: "https://backend-75wa.onrender.com",
  // baseURL: 'http://localhost:10000',
  headers: {
    "Content-Type": "application/json",
  },
});

// 장르 ID 모음
const GENRES = {
  액션: 10759, // Action & Adventure
  애니메이션: 16, // Animation
  코미디: 35, // Comedy
  범죄: 80, // Crime
  다큐멘터리: 99, // Documentary
  드라마: 18, // Drama
  가족: 10751, // Family
  키즈: 10762, // Kids
  미스터리: 9648, // Mystery
  뉴스: 10763, // News
  리얼리티: 10764, // Reality
  SF판타지: 10765, // Sci-Fi & Fantasy
  연속극: 10766, // Soap
  토크쇼: 10767, // Talk
  전쟁정치: 10768, // War & Politics
  서부극: 37, // Western
};

// ID로 장르명 찾기 (역방향 매핑)
const GENRE_NAMES = {
  10759: "액션 & 어드벤처",
  16: "애니메이션",
  35: "코미디",
  80: "범죄",
  99: "다큐멘터리",
  18: "드라마",
  10751: "가족",
  10762: "키즈",
  9648: "미스터리",
  10763: "뉴스",
  10764: "예능",
  10765: "SF판타지",
  10766: "연속극",
  10767: "토크쇼",
  10768: "전쟁정치",
  37: "서부극",
};

// 헬퍼 함수: 국가와 장르로 필터링 (포스터 있는 것만, fillData 적용)
const getByCountryAndGenre = async (country, genre) => {
  const response = await api2.get("", {
    params: {
      with_origin_country: country,
      with_genres: genre,
    },
  });
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return { ...response, data: { ...response.data, results: filled } };
};

// 헬퍼 함수: 장르별 콘텐츠 가져오기 (포스터 있는 것만, fillData 적용)
const getByGenre = async (genreId) => {
  const response = await api2.get("", {
    params: {
      with_genres: genreId,
    },
  });
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return { ...response, data: { ...response.data, results: filled } };
};

// 헬퍼 함수: 성인 콘텐츠 필터링 (포스터 있는 것만, fillData 적용)
const getByAdultFilter = async (includeAdult, sortBy) => {
  const response = await api2.get("", {
    params: {
      include_adult: includeAdult,
      ...(sortBy && { sort_by: sortBy }),
    },
  });
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return { ...response, data: { ...response.data, results: filled } };
};

// 헬퍼 함수: 트렌딩 콘텐츠 가져오기 (포스터 있는 것만, fillData 적용)
const getTrending = async () => {
  const response = await axios.get("https://api.themoviedb.org/3/trending/tv/day", {
    params: {
      api_key: API_KEY,
      language: "ko-KR",
    },
  });
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return { ...response, data: { ...response.data, results: filled } };
};

// 헬퍼 함수: 인기 콘텐츠 가져오기 (포스터 있는 것만, fillData 적용)
const getPopular = async () => {
  const response = await api.get("popular");
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return filled;
};

// 헬퍼 함수: 현재 방영중인 콘텐츠 가져오기 (포스터 있는 것만, fillData 적용)
const getOnTheAir = async () => {
  const response = await api.get("on_the_air");
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return filled;
};

// 헬퍼 함수: 오늘 방영 콘텐츠 가져오기 (포스터 있는 것만, fillData 적용)
const getAiringToday = async () => {
  const response = await api.get("airing_today");
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return filled;
};

// 헬퍼 함수: 최고 평점 콘텐츠 가져오기 (포스터 있는 것만, fillData 적용)
const getTopRated = async () => {
  const response = await api.get("top_rated");
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return filled;
};

// 헬퍼 함수: 검색 (포스터 있는 것만, fillData 적용)
const searchTV = async (searchQuery) => {
  const response = await apiSearch.get("", {
    params: {
      query: searchQuery,
    },
  });
  const filtered = response.data.results.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  return filled;
};

// 헬퍼 함수: 비슷한 콘텐츠 가져오기 (포스터 있는 것만)
const getSimilar = async (type, id) => {
  const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar`, {
    params: {
      api_key: API_KEY,
      language: "ko-KR",
    },
  });
  const filtered = response.data.results.filter((item) => item.poster_path);
  return filtered;
};

// 헬퍼 함수: overview와 name 영어로 채우기
const fillData = async (items) => {
  const filled = await Promise.all(
    items.map(async (item) => {
      const needsOverview = !item.overview || item.overview.trim() === "";
      const needsName = !item.name || item.name.trim() === "";

      if (needsOverview || needsName) {
        try {
          const res = await api.get(`${item.id}?language=en-US`);
          return {
            ...item,
            overview: needsOverview ? res.data.overview || "관련 정보 준비중..." : item.overview,
            name: needsName ? res.data.name || "관련 정보 준비중..." : item.name,
          };
        } catch (err) {
          return {
            ...item,
            overview: needsOverview ? "관련 정보 준비중..." : item.overview,
            name: needsName ? "관련 정보 준비중..." : item.name,
          };
        }
      }
      return item;
    })
  );
  return filled;
};

// 모든 API를 한번에 export
export {
  api,
  api2,
  apiCate,
  apiSearch,
  chatApi,
  GENRES,
  GENRE_NAMES,
  getByCountryAndGenre,
  getByGenre,
  getByAdultFilter,
  getTrending,
  getPopular,
  getOnTheAir,
  getAiringToday,
  getTopRated,
  searchTV,
  getSimilar,
  fillData
};

// 기본 export
export default api;