const token = process.env.TOKEN;
const URL = "https://graphql.datocms.com/";
const URL_PREVIEW = "https://graphql.datocms.com/preview";
const globalQuery = `query {
	globalFooter {
  	description
  }
}`;

export async function cmsService({ query, variables, preview }) {
  const URL_CMS = preview ? URL_PREVIEW : URL;
  try {
    const pageContentResponse = await fetch(URL_CMS, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }).then(async (resp) => {
      const body = await resp.json();
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    const globalContentResponse = await fetch(URL_CMS, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        query: globalQuery,
      }),
    }).then(async (resp) => {
      const globalBody = await resp.json();
      if (!globalBody.errors) return globalBody;
      throw new Error(JSON.stringify(globalBody));
    });

    return {
      data: {
        ...pageContentResponse.data,
        globalContent: {
          ...globalContentResponse.data,
        },
      },
    };
  } catch (e) {
    throw new Error(e.message);
  }
}
