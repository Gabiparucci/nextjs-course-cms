import { getCmsContent } from "./CMSProvider";
import { cmsSections } from "../../components/cmsSections";

export function CMSSectionRender({ pageName }) {
  const sections = getCmsContent(`${pageName}.pageContent[0].section`);

  return sections.map((sectionProps) => {
    const Component = cmsSections[sectionProps.componentName];

    if (!Component) return null;

    return <Component key={sectionProps.id} {...sectionProps} />;
  });
}
