import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { cmsService } from "../../infra/cms/cmsService";
import { Box, Text, theme } from "../../theme/components";
import { renderNodeRule, StructuredText } from "react-datocms";
import { isHeading, isCode } from "datocms-structured-text-utils";
import { pageHOC } from "../../components/wrappers/pageHOC";

export async function getStaticPaths() {
  const pathsQuery = `
  query($first: IntType, $skip: IntType) {
    allContentFaqQuestions(first: $first, skip: $skip) {
      id
      title
    }
  }
  `;

  const { data } = await cmsService({
    query: pathsQuery,
    variables: {
      first: 100,
      skip: 0,
    },
  });

  return {
    paths: data.allContentFaqQuestions.map((item) => {
      return {
        params: { id: item.id },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview }) {
  const { id } = params;
  const contentQuery = `
  query($id: ItemId) {
    contentFaqQuestion(filter: {
      id :{
        eq: $id
      }
    }) {
      id
      title
      content {
        value
      }
    }
  }
  `;
  const { data } = await cmsService({
    query: contentQuery,
    variables: {
      id,
    },
    preview,
  });

  return {
    props: {
      id,
      cmsContent: data,
    },
  };
}

function FAQQuestionScreen({ cmsContent }) {
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            gap: theme.space.x4,
            flexDirection: "column",
            width: "100%",
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: "auto",
          }}
        >
          <Text tag="h1" variant="heading1">
            {cmsContent.contentFaqQuestion.title}
          </Text>
          <StructuredText
            data={cmsContent.contentFaqQuestion.content}
            customNodeRules={[
              renderNodeRule(isHeading, ({ node, children, key }) => {
                const tag = `h${node.level}`;
                const variant = `heading${node.level}`;
                return (
                  <Text tag={tag} variant={variant} key={key}>
                    {children}
                  </Text>
                );
              }),
            ]}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default pageHOC(FAQQuestionScreen);
