import { useFetch } from '../hooks/useFetch';
import SocialBar, { type SocialLink } from '../componenets/miscellaneous/socialBar';
import ProfilePicture from '../componenets/image/profilePicture';
import './home.css';

type Profile = {
  name: string;
  intro: string;
  profilePicture: string;
  cvUrl: string;
  social: SocialLink[];
};

const EMPTY_PROFILE: Profile = {
  name: '',
  intro: '',
  profilePicture: '/profilePicture.jpeg',
  cvUrl: '/cv.pdf',
  social: [],
};

function Home() {
  const profile = useFetch<Profile>('/data/profile.json', EMPTY_PROFILE);

  return (
    <div className="home-container">
      <ProfilePicture imgUri={profile.profilePicture} />
      <div className="intro-text">
        <p className="intro-paragraph">
          I'm <span className="intro-name">{profile.name}</span>
          {profile.intro ? `, ${profile.intro}` : ''}
        </p>
        <SocialBar links={profile.social} cvUrl={profile.cvUrl} />
      </div>
    </div>
  );
}

export default Home;