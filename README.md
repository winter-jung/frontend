# MOREBOMB 🎬

> Netflix 스타일의 스마트 TV 스트리밍 플랫폼

## 📋 프로젝트 개요

MOREBOMB는 **The Movie Database (TMDB) API**와 **네이버 AI 챗봇**을 활용한 스마트 TV 콘텐츠 스트리밍 플랫폼입니다. Netflix와 유사한 UI/UX를 제공하며, 연령별 맞춤 콘텐츠 필터링과 AI 추천 기능을 통해 사용자가 드라마, 애니메이션, 예능 등 다양한 TV 프로그램을 쉽게 탐색할 수 있습니다.

## 🔗 링크

### 🌐 배포 URL
- **프론트엔드**: [배포 예정](https://your-deployment-url.com)
- **백엔드 API**: [https://backend-75wa.onrender.com](https://backend-75wa.onrender.com)

### 📂 리포지토리 URL
- **프론트엔드**: [GitHub Repository](https://github.com/winter-jung/frontend)
- **백엔드**: [Backend Repository](https://github.com/winter-jung/frontend)


## ✨ 주요 기능

### 📺 TV 콘텐츠 정보
- **현재 방영작**: 현재 방영 중인 TV 프로그램 목록
- **인기 방영작**: 높은 인기를 얻고 있는 드라마 및 예능
- **오늘 방영**: 오늘 방영되는 프로그램 목록
- **장르별 탐색**: 드라마, 애니메이션, 예능, 액션 등 장르별 분류
- **콘텐츠 상세 정보**: 포스터, 줄거리, 평점, 방영일, 상영시간 등

### 🔞 스마트 연령 필터링
- **성인 모드**: 모든 콘텐츠 접근 가능 (성인 콘텐츠 포함)
- **아동 모드**: 안전한 콘텐츠만 필터링하여 제공
- **실시간 모드 전환**: 상단 네비게이션에서 즉시 연령 모드 변경
- **연령별 맞춤 추천**: 선택된 연령에 따른 콘텐츠 추천

### 🤖 네이버 AI 챗봇
- **실시간 AI 상담**: 네이버 클로바 AI와 연동된 지능형 챗봇
- **콘텐츠 추천**: AI가 사용자 취향에 맞는 프로그램 추천
- **플로팅 UI**: 우하단 고정 챗봇 인터페이스
- **자연어 처리**: 한국어 기반 자연스러운 대화

### � 검색 및 탐색
- **통합 검색**: 제목, 장르, 출연진 기반 검색
- **장르 페이지**: 세분화된 장르별 콘텐츠 탐색
- **네비게이션 메뉴**: 홈, 드라마, 영화, 애니, 예능, 몰밤각 등

### �📱 사용자 경험
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **다크 테마**: 시청에 최적화된 어두운 테마
- **부드러운 애니메이션**: 호버 효과 및 카드 트랜지션
- **배경 비디오**: 몰입도 높은 메인 페이지 히어로 섹션

## 🛠 기술 스택

### Frontend
- **React 19.1.1**: 최신 React 버전 with Context API
- **Vite 7.1.2**: 차세대 빌드 도구 및 개발 서버
- **React Router 7.9.1**: 클라이언트 사이드 라우팅 및 동적 라우팅
- **TailwindCSS 4.1.13**: 유틸리티 퍼스트 CSS 프레임워크
- **FontAwesome 7.0.1**: 아이콘 라이브러리 및 React 컴포넌트
- **Axios 1.12.0**: HTTP 클라이언트 (TMDB API, 챗봇 API)
- **Swiper 12.0.2**: 터치 슬라이더 컴포넌트

### Backend & APIs
- **TMDB API**: TV 프로그램 데이터 제공 (현재 방영작, 인기작, 장르별)
- **네이버 클로바 AI**: 자연어 처리 및 챗봇 서비스
- **Flask Backend**: Python 기반 챗봇 API 서버

### Deployment
- **Frontend**: Vite 빌드 + 정적 호스팅 (배포 준비 중)
- **Backend**: Render.com (https://backend-75wa.onrender.com)

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js (18+)
- npm 또는 yarn
- TMDB API 키

### 1. 저장소 클론
```bash
git clone https://github.com/winter-jung/frontend.git
cd frontend
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env` 파일을 루트 디렉토리에 생성하고 다음 내용을 추가하세요:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

**TMDB API 키 발급 방법:**
1. [TMDB 웹사이트](https://www.themoviedb.org/)에서 계정 생성
2. API 키 신청 및 발급
3. 위 환경 변수에 키 입력

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 프로덕션 빌드
```bash
npm run build
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── api/
│   ├── axios.js          # API 설정 (TMDB, 네이버 챗봇)
│   └── tmdbService.js    # TMDB API 서비스 함수들
├── components/
│   ├── Card.jsx          # TV 프로그램 카드 컴포넌트
│   ├── Chatbot.jsx       # 네이버 AI 챗봇 UI
│   ├── Error.jsx         # 에러 페이지 컴포넌트
│   ├── GenrePage.jsx     # 장르별 콘텐츠 페이지
│   ├── MovieDetail.jsx   # 콘텐츠 상세 페이지
│   ├── Navi.jsx          # 네비게이션 및 연령 필터
│   ├── RootLayout.jsx    # 라우팅 레이아웃
│   ├── SearchPage.jsx    # 검색 페이지
│   └── Section.jsx       # 콘텐츠 섹션 컴포넌트
├── AgeContext.jsx        # 연령 필터 상태 관리
├── App.jsx               # 메인 앱 컴포넌트
├── main.jsx              # React 엔트리포인트
└── index.css             # TailwindCSS 스타일
```

## 🎯 주요 컴포넌트 설명

### App.jsx
- 메인 애플리케이션 로직 및 상태 관리
- TMDB API 데이터 fetching (현재 방영작, 인기작, 오늘 방영)
- 연령별 맞춤 콘텐츠 필터링 로직
- 히어로 섹션 및 배경 비디오 관리

### AgeContext.jsx
- React Context API를 활용한 연령 필터 상태 관리
- 성인/아동 모드 전역 상태 제공
- 컴포넌트 간 연령 필터 데이터 공유

### Navi.jsx
- 상단 네비게이션 바 및 메뉴
- 연령 필터 드롭다운 (성인/아동 모드 전환)
- 장르별 페이지 링크 (드라마, 영화, 애니, 예능 등)
- 검색 기능 및 사용자 프로필

### GenrePage.jsx
- 장르별 콘텐츠 목록 페이지
- 연령 필터에 따른 동적 콘텐츠 로딩
- URL 파라미터 기반 장르 ID 처리

### MovieDetail.jsx
- 개별 TV 프로그램/영화의 상세 정보 표시
- URL 파라미터를 통한 콘텐츠 ID 추출
- 포스터, 줄거리, 평점, 방영 정보 등 렌더링

### Chatbot.jsx
- 네이버 클로바 AI와 연동된 실시간 챗봇
- Flask 백엔드 API와 통신
- 메시지 송수신, 로딩 상태, 에러 처리
- 플로팅 UI 및 확장/축소 기능

### SearchPage.jsx
- 통합 검색 기능
- 제목, 장르, 출연진 기반 검색
- 실시간 검색 결과 표시

## 📊 API 연동

### TMDB API (TV 프로그램)
```javascript
// 현재 방영작
GET /tv/on_the_air?language=ko-KR&include_adult=false

// 인기 TV 프로그램
GET /tv/popular?language=ko-KR&include_adult=false

// 오늘 방영
GET /tv/airing_today?language=ko-KR&include_adult=false

// 장르별 콘텐츠 (연령 필터 적용)
GET /discover/tv?with_genres={genreId}&include_adult={age=='adult'}&language=ko-KR

// 장르 목록
GET /genre/tv/list?language=ko-KR

// 콘텐츠 상세
GET /tv/{id}?language=ko-KR
```

### 네이버 AI 챗봇 API
```javascript
// 챗봇 메시지 전송
POST https://backend-75wa.onrender.com/chat
Content-Type: application/json

{
  "message": "사용자 메시지"
}

// 응답 형식
{
  "reply": "AI 챗봇 응답 메시지"
}
```

### 연령 필터링 로직
```javascript
// 성인 모드: include_adult=true (모든 콘텐츠)
// 아동 모드: include_adult=false (안전한 콘텐츠만)

const includeAdult = age === 'adult';
const response = await tmdbService.getByGenre(genreId, includeAdult);
```

## 🎨 디자인 특징

- **다크 테마**: 시청 환경에 최적화된 어두운 배경 (#0d0727)
- **그라디언트 네비**: 상단에서 하단으로 자연스러운 그라디언트
- **MOREBOMB 브랜드**: 커스텀 로고 및 브랜드 아이덴티티
- **카드 기반 레이아웃**: TV 프로그램 정보를 시각적 카드로 구성
- **호버 애니메이션**: 마우스 오버 시 스케일 및 그림자 효과
- **반응형 그리드**: 화면 크기별 적응형 콘텐츠 레이아웃
- **연령 표시**: 상단 네비에 현재 연령 모드 시각적 표시
- **플로팅 챗봇**: 우하단 고정된 AI 챗봇 버튼

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 린트 검사
npm run lint

# 빌드 미리보기
npm run preview
```

## 🌟 향후 개선 계획

- [ ] 사용자 인증 및 개인 프로필 관리
- [ ] 시청 기록 및 개인 시청 목록
- [ ] AI 기반 개인 맞춤 추천 시스템
- [ ] 콘텐츠 리뷰 및 평점 시스템
- [ ] 소셜 공유 및 친구 추천 기능
- [ ] PWA (Progressive Web App) 지원
- [ ] 다국어 지원 (영어, 일본어 등)
- [ ] 실시간 방영 스케줄 알림
- [ ] 콘텐츠 즐겨찾기 및 위시리스트
- [ ] 고급 검색 필터 (연도, 평점, 장르 조합)


### Git 브랜치 전략
이 프로젝트는 **단일 브랜치 전략(Trunk-based Development)**을 사용하였습니다. 모든 개발은 main 브랜치에서 직접 이루어졌으며, 다음과 같은 커밋 메시지 규칙을 따릅니다:


| 타입 | 설명 |
|------|------|
| **Feat** | 새로운 기능 추가 |
| **Fix** | 버그 수정 |
| **Docs** | 문서 수정(README, 주석 등) |
| **Style** | 코드 포맷, 세미콜론 누락 등 비기능적 수정 |
| **Refactor** | 코드 리팩토링(기능 변경 없음) |
| **Test** | 테스트 코드 추가 및 수정 |
| **Chore** | 기타 작업(빌드 설정, 패키지 설치 등) |
| **Remove** | 코드/파일 삭제 |
| **Rename** | 파일/변수명 변경 |

| 타입 | 설명 |
|------|------|
| **Feat** | 새로운 기능 추가 |
| **Fix** | 버그 수정 |
| **Docs** | 문서 수정(README, 주석 등) |
| **Style** | 코드 포맷, 세미콜론 누락 등 비기능적 수정 |
| **Refactor** | 코드 리팩토링(기능 변경 없음) |
| **Test** | 테스트 코드 추가 및 수정 |
| **Chore** | 기타 작업(빌드 설정, 패키지 설치 등) |
| **Remove** | 코드/파일 삭제 |
| **Rename** | 파일/변수명 변경 |


### 커밋 메시지 예시
```bash
# 새 기능 추가
git commit -m "Feat: TV 프로그램 검색 기능 추가"

# 버그 수정
git commit -m "Fix: 연령 필터링 API 연결 오류 수정"

# 문서 업데이트
git commit -m "Docs: README.md 프로젝트 설명 업데이트"

# 스타일 수정
git commit -m "Style: 네비게이션 UI 개선 및 반응형 최적화"
```

## 📝 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.

## 📞 문의

프로젝트와 관련된 문의사항이 있으시면 언제든지 연락해주세요.

---

**MOREBOMB** - 스마트하고 안전한 TV 스트리밍 플랫폼 🎬✨