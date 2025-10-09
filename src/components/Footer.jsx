import { Link, useNavigate } from "react-router";

function Footer() {
    return (
        <div className="w-full text-white p-10 "
            style={{ background: 'linear-gradient(to bottom, #0d0727 0%, rgba(13,7,39,0.6) 87.5%, rgba(13,7,39,0.4) 100%)' }}>
            <div className="container mx-auto">
                <Link to="/">
                    <h1 className='w-[270px] mt-2 mb-20'><img src="../morebomb_logo.svg" alt="logo" /></h1>
                </Link>
                <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                    <div>화면 해설</div>
                    <div><strong>고객 센터</strong></div>
                    <div>기프트카드</div>
                    <div>미디어 센터</div>
                    <div>투자 정보(IR)</div>
                    <div>입사 정보</div>
                    <div><strong>이용 약관</strong></div>
                    <div>개인정보</div>
                    <div>법적 고지</div>
                    <div>쿠키 설정</div>
                    <div>회사 정보</div>
                    <div>문의하기</div>
                    <div className="col-span-4">몰밤 서비스 코리아 <strong>통신 판매업 신고번호: 제2030-서울리라-1234호 </strong>&nbsp;&nbsp; 전화번호: 02-345-6789(수신자 부담)</div>
                    <div className="col-span-4">대표: 수울정령</div>
                    <div className="col-span-4">이메일 주소: soowooljungryeong@morebomb.com</div>
                    <div className="col-span-4">주소: 대한민국 서울특별시 종로구 망고로 23</div>
                    <div className="col-span-4"><strong>사업자 등록번호: 123-45-67891</strong></div>
                    <div className="col-span-4">공정거래위원회 웹사이트</div>
                </div>
            </div>
        </div>

    )
}

export default Footer