import { Link } from 'react-router-dom'
import { getNaverLoginLink } from '../../api/naverApi'
import naverLogo from '../../assets/images/NAVER_login.png'

const NaverLoginComponent = () => {
  const link = getNaverLoginLink()
  return (
    <div className="flex flex-col">
      <div className="justify-center">
        <div className="flex justify-center w-full">
          <Link to={link}>
            <img
              src={naverLogo}
              className="w-[183px] h-[45px] object-contain"
              alt="네이버 로그인"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default NaverLoginComponent
