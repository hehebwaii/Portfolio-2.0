export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PortfolioPartsFragmentDoc = gql`
    fragment PortfolioParts on Portfolio {
  __typename
  biosBoot {
    __typename
    kernelVersion
    diagnosticLines
    completionTime
    copyrightText
    loadingText
    loadedText
    energyStarText
  }
  navigationSettings {
    __typename
    logoText
    navLinks {
      __typename
      label
      slug
    }
  }
  hero {
    __typename
    mainTitle
    subtitle
    signatureSvgPath
    signatureScaleMobile
    signatureScaleDesktop
  }
  services {
    __typename
    sectionHeading
    items {
      __typename
      index
      title
      description
    }
  }
  projects {
    __typename
    sectionHeading
    cards {
      __typename
      index
      name
      category
      description
      liveUrl
      col1Image1
      col1Image2
      col2TallImage
    }
  }
  skillsMatrix {
    __typename
    sectionHeading
    skillCategories {
      __typename
      categoryName
      skills {
        __typename
        name
        level
      }
    }
  }
  devHud {
    __typename
    sustainationBaseLatency
    sustainationHarvestNodes
    sustainationEfficiency
    oscilloscopeBaseAmplitude
    telemetryTable {
      __typename
      coreName
      telemetryDetails
    }
  }
  cameraSequence {
    __typename
    totalFrames
    act1Title
    act1Subtitle
    act2Title
    act2Subtitle
    act3Title
    act3Subtitle
  }
  footer {
    __typename
    copyrightText
    socialLinks {
      __typename
      platformName
      url
    }
  }
  sectionOrder
  timeline {
    __typename
    sectionHeading
    items {
      __typename
      id
      title
      date
      active
      detail
    }
  }
  aboutProfile {
    __typename
    location
    networkLabel
    networkUrl
    languages
    story
  }
  filmstrip {
    __typename
    heading
    photos {
      __typename
      url
      title
      backstory
      gear
      settings
    }
  }
  achievements {
    __typename
    heading
    benchmarks {
      __typename
      title
      date
      description
    }
  }
}
    `;
export const PortfolioDocument = gql`
    query portfolio($relativePath: String!) {
  portfolio(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PortfolioParts
  }
}
    ${PortfolioPartsFragmentDoc}`;
export const PortfolioConnectionDocument = gql`
    query portfolioConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PortfolioFilter) {
  portfolioConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PortfolioParts
      }
    }
  }
}
    ${PortfolioPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    portfolio(variables, options) {
      return requester(PortfolioDocument, variables, options);
    },
    portfolioConnection(variables, options) {
      return requester(PortfolioConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/bb0d1782-9ec3-4e47-9aa9-2bed7187df28/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
