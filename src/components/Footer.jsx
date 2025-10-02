import { Link, useNavigate } from "react-router";

function Footer() {
    return (
        <div className="w-full text-white p-10 "
            style={{ background: 'linear-gradient(to bottom, #0d0727 0%, rgba(13,7,39,0.6) 87.5%, rgba(13,7,39,0.4) 100%)' }}>
            <div className="container mx-auto">
                <Link to="/">
                    <h1 className='w-[270px] mt-2 mb-20'><img src="../morebomb_logo.svg" alt="logo" /></h1>
                </Link>
                <div className="flex gap-20 mb-6">
                    <div>화면 해설</div>
                    <div>고객 센터</div>
                    <div>기프트카드</div>
                    <div>미디어 센터</div>
                </div>
                <div className="flex gap-20 mb-6">
                    <div>투자 정보(IR)</div>
                    <div>입사  정보</div>
                    <div>이용 약관</div>
                    <div>개인정보</div>
                </div>
                <div className="flex gap-20 mb-6">
                    <div>법적 고지</div>
                    <div>쿠키 설정</div>
                    <div>회사 정보</div>
                    <div>문의하기</div>
                </div>
                <div className="flex gap-20">
                    <div>몰밤 서비스 코리아 </div>
                    <div>통신 판매업</div>
                    <div>신고번호: 제2030-서울리라-1234호 </div>
                    <div>전화번호: 02-345-6789(수신자 부담)</div>
                </div>
                <div>대표: 망고살구</div>
                <div>이메일 주소: mango@morebomb.com</div>
                <div>주소: 대한민국 서울특별시 종로구 망고로 23</div>
                <div>사업자 등록번호: 123-45-67891</div>
                <div>공정거래위원회 웹사이트</div>
            </div>
        </div>

    )
}

export default Footer