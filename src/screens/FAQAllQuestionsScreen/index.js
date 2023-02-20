import { pageHOC } from "../../components/wrappers/pageHOC";
import { CMSSectionRender } from "../../infra/cms/CMSSectionRender";
import { cmsService } from "../../infra/cms/cmsService";

export async function getStaticProps({ preview }) {
  const { data: cmsContent } = await cmsService({
    query: `
    query {
      pageFaq {
        pageContent {
          section {
            componentName: __typename
            ...on CommonSeoBlockRecord {
              id
              title
            }
            ...on CommonMenuRecord {
              id
            }
            ...on CommonFooterRecord {
              id
            }
            ...on PagefaqDisplayquestionSectionRecord {
              categories {
                id
                title
                questions {
                  title
                  id
                }
              }
            }
          }
        }
      }
    }
    `,
    preview,
  });

  return {
    props: {
      cmsContent,
    },
  };
}

function FAQAllQuestionsScreen() {
  return <CMSSectionRender pageName="pageFaq" />;
}

export default pageHOC(FAQAllQuestionsScreen);
