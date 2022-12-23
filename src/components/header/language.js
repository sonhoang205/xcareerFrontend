import i18next from "i18next";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from 'react-i18next';


const Language = (props) => {
  const { t, i18n } = useTranslation();

  const handleChangLanguage = (Language) => {
    i18n.changeLanguage(Language)
  }
  return (
    <NavDropdown
      title={i18n.language === "vi" ?
        <div style={{ width: "50px", height: "50px" }}>
          <img style={{ maxWidth: "100%", maxHeight: "100%" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png" alt="" />
        </div>
        : <div style={{ width: "50px", height: "50px" }}>

          <img style={{ maxWidth: "100%", maxHeight: "100%" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/285px-Flag_of_the_United_States_%28Pantone%29.svg.png" alt="" />
        </div>}
      id="basic-nav-dropdown"
      className="languages"
    >
      <NavDropdown.Item onClick={() => handleChangLanguage("en")}>
        English
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => handleChangLanguage("vi")} >Viet Nam</NavDropdown.Item>
    </NavDropdown>
  )
}


export default Language