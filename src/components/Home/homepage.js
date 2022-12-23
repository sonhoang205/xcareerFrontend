import video from "../../assets/video-1920.mp4";
import videoSecond from "../../assets/inline-form-2.mp4";
import { useTranslation, Trans } from 'react-i18next';

const Homepage = (props) => {
  const { t } = useTranslation();

  return (
    // autoplay muted loop
    <>
      <div className=" Homepage-container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4 " />
        </video>
        <div className="homepage-cotent">
          <div className="first-tittle">
            {t('homepage.firstTittle')}

          </div>
          <div className="second-tittle">
            {t('homepage.secondTittle')}

          </div>
          <div className="third-tittle">

            <button> {t('homepage.thirdTittle.button')}
            </button>
          </div>
          <div className="fourth-tittle">
            <div>{t('homepage.fourthTittle.textOne')}</div>
            <div> {t('homepage.fourthTittle.textTwo')}</div>
          </div>
        </div>
      </div>
      {/* <div className="Homepage-body">
        <div className="Homepage-body-first">
          <h2>Create forms, surveys, and quizzes </h2>
          <h5>people enjoy answering</h5>
        </div>
        <div className="Homepage-second">
          <div className="Homepage-second_tittle">
            <h1>BUILT WITH BRAINS </h1>
            <h4>
              Conditional logic lets you ask the right follow-up
              <br /> questions and skip the rest.
              <br /> Surveys feel less like interrogations, and more like
              conversations.
            </h4>
          </div>

          <video autoPlay muted loop width="700" height="700">
            <source src={videoSecond} type="video/mp4 " />
          </video>
        </div>
      </div> */}
    </>
  );
};

export default Homepage;
