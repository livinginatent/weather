import {
  FaRunning,
  FaWind,
  FaWalking,
  FaSyncAlt,
  FaBiking,
  FaMask,
  FaTimes,
  FaHome,
  FaExclamation,
  FaBan,
  
} from "react-icons/fa";
import { GiGasMask, GiPoisonCloud, GiWindSlap } from "react-icons/gi";
import { MdDangerous, MdOutdoorGrill, MdOutlineSick, MdRunningWithErrors } from "react-icons/md";
import { CiMedicalMask } from "react-icons/ci";
import { BsHouseCheck } from "react-icons/bs";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { LuBiohazard } from "react-icons/lu";

export const getEPARecommendations = (data: any) => {
  const recommendations = [];

  switch (data) {
    case 1: // Good
      recommendations.push(
        {
          icon: <MdOutdoorGrill />,
          recommendation:
            "Hava keyfiyyəti yaxşıdır. Açıq havada fəaliyyətlərdən sərbəst şəkildə zövq ala bilərsiniz.",
          actionText: "Heç bir tədbir lazım deyil.",
        },
        {
          icon: <GiWindSlap />,
          recommendation: "Hava təmiz və təravətlidir.",
          actionText: "Təzə hava üçün pəncərələrinizi açın.",
        },
        {
          icon: <FaWalking />,
          recommendation: "Gəzinti və ya qaçış üçün əla vaxtdır.",
          actionText: "Heç bir məhdudiyyət yoxdur.",
        },
        {
          icon: <FaHeartCircleCheck />,
          recommendation:
            "Bütün qruplar açıq havada fəaliyyətlərinə narahat olmadan davam edə bilərlər.",
          actionText: "Heç bir ehtiyat tədbiri tələb olunmur.",
        }
      );
      break;
    case 2: // Moderate
      recommendations.push(
        {
          icon: <FaBiking />,
          recommendation:
            "Hava keyfiyyəti orta səviyyədədir. Açıq havada fəaliyyət təhlükəsizdir, lakin diqqətli olmaq lazımdır.",
          actionText: "Həssas şəxslər qısa fasilələr verməlidirlər.",
        },
        {
          icon: <FaWalking />,
          recommendation:
            "Uzun müddət açıq havada qalmaq həssas insanlar üçün narahatlıq yarada bilər.",
          actionText: "Açıq havada daha az vaxt keçirməyi nəzərə alın.",
        },
        {
          icon: <FaWind />,
          recommendation:
            "Pəncərələri açmaq olar, lakin havanın gedişatını nəzərə alın.",
          actionText: "Ev havalandırmasına nəzarət edin.",
        },
        {
          icon: <CiMedicalMask />,
          recommendation:
            "Bəzi həssas şəxslər açıq havada maska taxmağı nəzərə ala bilərlər.",
          actionText: "Maska istifadəsi ilə daha rahat hiss edə bilərsiniz.",
        }
      );
      break;
    case 3: // Unhealthy for sensitive groups
      recommendations.push(
        {
          icon: <FaWalking />,
          recommendation:
            "Hava keyfiyyəti həssas qruplar üçün sağlamlıq təhlükəsi yaradır.",
          actionText: "Açıq hava fəaliyyətlərini azaldın və ya məhdudlaşdırın.",
        },
        {
          icon: <FaHome />,
          recommendation: "Həssas qruplar mümkün qədər evdə qalmalıdır.",
          actionText: "Zəruri olmadıqca çölə çıxmayın.",
        },
        {
          icon: <FaExclamation />,
          recommendation:
            "Simptomlarınız varsa, fiziki fəaliyyətinizi azaldın və həkimlə məsləhətləşin.",
          actionText: "Havanın pik çirklənmə saatlarında evdə qalın.",
        },
        {
          icon: <FaBan />,
          recommendation: "Zəruri deyilsə, pəncərələri bağlı saxlayın.",
          actionText:
            "Evdə hava təmizləyicilərindən istifadə etməyi nəzərdən keçirin.",
        }
      );
      break;
    case 4: // Unhealthy
      recommendations.push(
        {
          icon: <MdOutlineSick />,
          recommendation:
            "Hava çirkliliyi hamı üçün sağlamlıq təhlükəsi yaradır.",
          actionText: "Açıq hava fəaliyyətlərini məhdudlaşdırın.",
        },
        {
          icon: <BsHouseCheck />,
          recommendation: "Pəncərələrinizi bağlayın.",
          actionText: "Evdə hava təmizləyicilərindən istifadə edin.",
        },
        {
          icon: <CiMedicalMask />,
          recommendation:
            "Həssas qruplar açıq hava fəaliyyətlərindən yayınmalıdır.",
          actionText: "Çölə çıxmaq zəruridirsə, maska taxın.",
        },
        {
          icon: <MdRunningWithErrors />,
          recommendation: "Açıq hava fəaliyyətləri minimuma endirilməlidir.",
          actionText: "Mümkün qədər evdə qalın.",
        }
      );
      break;
    case 5: // Very unhealthy
      recommendations.push(
        {
          icon: <GiPoisonCloud />,
          recommendation:
            "Hava çirkliliyi hamı üçün çox ciddi sağlamlıq təhlükəsi yaradır.",
          actionText: "Açıq hava fəaliyyətlərini ciddi şəkildə məhdudlaşdırın.",
        },
        {
          icon: <FaHome />,
          recommendation: "Pəncərələr bağlı vəziyyətdə evdə qalın.",
          actionText: "Açıq havada olmaqdan qaçının.",
        },
        {
          icon: <FaExclamation />,
          recommendation: "Açıq hava fəaliyyətləri minimuma endirilməlidir.",
          actionText: "Evdə hava təmizləyicilərindən istifadə edin.",
        },
        {
          icon: <CiMedicalMask />,
          recommendation:
            "Yalnız vacib açıq hava fəaliyyətləri icra edilməlidir.",
          actionText: "Çöldə olarkən maska taxın.",
        }
      );
      break;
    case 6: // Hazardous
      recommendations.push(
        {
          icon: <LuBiohazard />,
          recommendation:
            "Hava çirkliliyi təhlükəlidir. Bütün açıq hava fəaliyyətlərindən qaçının.",
          actionText: "Evdə qalın və pəncərələri bağlayın.",
        },
        {
          icon: <FaHome />,
          recommendation:
            "Sağlamlıq səviyyəsindən asılı olmayaraq hərkəs evdə qalmalıdır.",
          actionText:
            "Hava təmizləyicilərindən istifadə edin və mümkün olduğunca kənar hava ilə təmasınızı azaldın.",
        },
        {
          icon: <FaExclamation />,
          recommendation:
            "Nəfəs problemləri yaşasanız, həkiminizə müraciət edin",
          actionText: "Açıq hava fəaliyyətlərini təxirə salın.",
        },
        {
          icon: <FaBan />,
          recommendation: "Çirkli havanın içəri daxil olmaması üçün pəncərələri bağlayın.",
          actionText: "Lazımsız səyahətlərdən qaçının.",
        }
      );
      break;
    default:
      recommendations.push({
        icon: <FaExclamation />,
        recommendation: "Naməlum hava keyfiyyəti səviyyəsi.",
        actionText: "Yerli hava keyfiyyəti indeksini yoxlayın.",
      });
  }

  return recommendations;
};
