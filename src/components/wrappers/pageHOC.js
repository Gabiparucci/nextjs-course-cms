import CMSProvider from "../../infra/cms/CMSProvider";

export function pageHOC(Component) {
  return (props) => {
    return (
      <CMSProvider cmsContent={props.cmsContent}>
        <Component {...props} />
      </CMSProvider>
    );
  };
}
