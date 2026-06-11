import { Link } from 'react-router-dom'
import { getKakaoLoginLink } from '../../api/kakaoApi'
import kakaoLogo from '../../assets/images/kakao_login.png'

const KakaoLoginComponent = () => {
  const link = getKakaoLoginLink()
  return (
    <div className="flex flex-col">
      <div className="text-center">로그인 시 자동 가입처리됩니다.</div>
      <div className="justify-center">
        <div className="flex justify-center w-full">
          <Link to={link}>
            <img src={kakaoLogo} alt="카카오 로그인" />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default KakaoLoginComponent
