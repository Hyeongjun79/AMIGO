import { Link } from 'react-router-dom'
import { getGoogleLoginLink } from '../../api/googleApi'
import googleLogo from '../../assets/images/google_login.png'

const GoogleLoginComponent = () => {
  const link = getGoogleLoginLink()
  return (
    <div className="flex flex-col">
      <div className="justify-center">
        <div className="flex justify-center w-full">
          <Link to={link}>
            <img
              src={googleLogo}
              className="w-[183px] h-[45px] object-contain"
              alt="구글 로그인"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default GoogleLoginComponent
