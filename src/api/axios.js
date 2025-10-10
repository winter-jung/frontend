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

// 헬퍼 함수: 트렌딩 콘텐츠 가져오기 (트레일러 우선 정렬)
const getTrending = async () => {
  const response = await axios.get("https://api.themoviedb.org/3/trending/tv/day", {
    params: {
      api_key: API_KEY,
      language: "ko-KR",
    },
  });
  const filtered = response.data.results.filter((item) => item.poster_path);
  const sorted = await fillDataWithTrailerSort(filtered);
  return { ...response, data: { ...response.data, results: sorted } };
};

// 헬퍼 함수: 인기 콘텐츠 가져오기 (트레일러 우선 정렬)
const getPopular = async () => {
  const response = await api.get("popular");
  const filtered = response.data.results.filter((item) => item.poster_path);
  const sorted = await fillDataWithTrailerSort(filtered);
  return sorted;
};

// 헬퍼 함수: 현재 방영중인 콘텐츠 가져오기 (트레일러 우선 정렬)
const getOnTheAir = async () => {
  const response = await api.get("on_the_air");
  const filtered = response.data.results.filter((item) => item.poster_path);
  const sorted = await fillDataWithTrailerSort(filtered);
  return sorted;
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
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
      },
    });
    const filtered = response.data.results.filter((item) => item.poster_path);
    return filtered;
  } catch (error) {
    console.warn(`비슷한 ${type} 콘텐츠를 찾을 수 없습니다. ID: ${id}`, error.message);
    return []; // 오류 발생 시 빈 배열 반환
  }
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

// 헬퍼 함수: 개별 콘텐츠의 트레일러 존재 여부 확인
const checkTrailerExists = async (contentId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${contentId}/videos`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
      },
    });

    const videos = response.data.results;
    const hasTrailer = videos.some(video =>
      video.type === "Trailer" || video.type === "Teaser"
    );

    return hasTrailer;
  } catch (error) {
    console.warn(`트레일러 확인 실패 (ID: ${contentId}):`, error.message);
    return false;
  }
};

// 헬퍼 함수: 콘텐츠 목록에 트레일러 정보 추가 및 정렬 (성능 최적화 버전)
const sortByTrailerAvailability = async (items, maxCheck = 10) => {
  if (!items || items.length === 0) return [];

  // 성능을 위해 상위 몇 개만 트레일러 확인
  const itemsToCheck = items.slice(0, maxCheck);
  const remainingItems = items.slice(maxCheck);

  // 상위 아이템들에 트레일러 존재 여부 추가 (병렬 처리로 성능 향상)
  const checkedItems = await Promise.all(
    itemsToCheck.map(async (item) => {
      const hasTrailer = await checkTrailerExists(item.id);
      return {
        ...item,
        hasTrailer
      };
    })
  );

  // 나머지 아이템들은 트레일러 정보 없이 추가
  const remainingWithoutTrailer = remainingItems.map(item => ({
    ...item,
    hasTrailer: false
  }));

  // 확인된 아이템들을 트레일러 우선으로 정렬
  const sortedChecked = checkedItems.sort((a, b) => {
    // 트레일러 우선 정렬
    if (a.hasTrailer && !b.hasTrailer) return -1;
    if (!a.hasTrailer && b.hasTrailer) return 1;

    // 트레일러 상태가 같으면 인기도(vote_average) 순으로 정렬
    return b.vote_average - a.vote_average;
  });

  // 트레일러가 있는 것들을 먼저, 그 다음 나머지 순으로 배열
  return [...sortedChecked, ...remainingWithoutTrailer];
};

// 향상된 fillData 함수 (트레일러 정렬 포함)
const fillDataWithTrailerSort = async (items) => {
  const filtered = items.filter((item) => item.poster_path);
  const filled = await fillData(filtered);
  const sorted = await sortByTrailerAvailability(filled);
  return sorted;
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
  fillData,
  checkTrailerExists,
  sortByTrailerAvailability,
  fillDataWithTrailerSort
};

// 기본 export
export default api;