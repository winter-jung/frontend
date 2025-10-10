import { useEffect, useState } from "react";
import { getTrending } from "../api/axios";
import Lists from "../components/Lists";
import Banner from "../components/Banner";
import Chatbot from "../components/Chatbot";

function TrendingPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function loadTrending() {
      try {
        setLoading(true);
        const response = await getTrending();
        setContent(response.data.results);
      } catch (err) {
        console.error("트렌딩 콘텐츠 로딩 실패", err);
      } finally {
        setLoading(false);
      }
    }

    loadTrending();
  }, []);

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
          {content.length > 0 ? <Lists title="요즘 대세 콘텐츠" items={content} /> : <p className="text-center text-gray-400">콘텐츠를 찾을 수 없습니다.</p>}
        </div>
      </main>
      <Chatbot />
    </div>
  );
}

export default TrendingPage;
