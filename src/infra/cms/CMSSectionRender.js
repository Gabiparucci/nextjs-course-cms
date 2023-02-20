import { cmsSections } from "../../components/cmsSections";
import { getCmsContent } from "./CMSProvider";

export function CMsSectionRender({ pageName }) {
  const sections = getCmsContent(`${pageName}.pageContent[0].section`);
  return sections.map((sectionProps) => {
    const Component = cmsSections[sectionProps.componentName];
    return (
      <p key={sectionProps.id}>
        <Component {...sectionProps} />
      </p>
    );
  });
}
