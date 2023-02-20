import { Footer } from "../commons/Footer";
import { Menu } from "../commons/Menu";
import { SEOBlock } from "./SeoBlock";

export const cmsSections = {
  CommonSeoBlockRecord: (props) => <SEOBlock {...props} />,
  CommonMenuRecord: (props) => <Menu {...props} />,
  PageHomeHerosectionRecord: () => "Bloco do Hero da Home",
  CommonFooterRecord: (props) => <Footer {...props} />,
};
