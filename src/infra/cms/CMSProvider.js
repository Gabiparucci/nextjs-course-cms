import React from "react";
import get from "lodash/get";
const CMSContext = React.createContext({
  cmsContent: {},
});

export const getCmsContent = (path = "") => {
  const cmsContent = React.useContext(CMSContext).cmsContent;
  if (path == "") return cmsContent;
  const output = get(cmsContent, path);

  if (!output) throw new Error("não foi possível encontrar a chave" + path);
  return output;
};

export default function CMSProvider({ cmsContent, children }) {
  return (
    <CMSContext.Provider value={{ cmsContent }}>{children}</CMSContext.Provider>
  );
}
