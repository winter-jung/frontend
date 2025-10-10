import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getByAdultFilter, getByGenre } from "../api/axios";
import Lists from "../components/Lists";
import Chatbot from "../components/Chatbot";

function ProfilePage() {
  const { type } = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);

        let response;
        if (type === "kids") {
          // 키즈는 장르 10762로 필터링
          response = await getByGenre(10762);
        } else {
          // 전체는 성인 콘텐츠 제외
          response = await getByAdultFilter(false, null);
        }

        setContent(response.data.results);
      } catch (err) {
        console.error("콘텐츠 로딩 실패", err);
      } finally {
        setLoading(false);
      }
    }

    if (type) {
      loadContent();
    }
  }, [type]);

  if (loading) {
    return (
      <main className="pt-24 min-h-screen bg-[#1e1d25] text-white grid place-items-center">
        <p>로딩중...</p>
      </main>
    );
  }

  const title = type === "kids" ? "키즈 콘텐츠" : "전체 콘텐츠";

  return (
    <div>
      <main className="pt-35 bg-[#1e1d25] text-white min-h-screen">
        <div className="container mx-auto px-4">{content.length > 0 ? <Lists title={title} items={content} /> : <p className="text-center text-gray-400">콘텐츠를 찾을 수 없습니다.</p>}</div>
      </main>
      <Chatbot />
    </div>
  );
}

export default ProfilePage;
