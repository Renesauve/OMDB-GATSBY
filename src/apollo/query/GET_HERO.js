import { gql } from "@apollo/client"

const GET_HERO = gql`
  query Hero {
    allWpPage {
      nodes {
        acfModules {
          modules {
            ... on WpPage_Acfmodules_Modules_Hero {
              fieldGroupName
              headline
              subheadline
              image {
                localFile {
                  childrenImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default GET_HERO
