const path = require('path')

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  //Query for node to use in creating pages
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result
    }),
  )
})


//Implement the Gatsby API "createPages". This is called once the
//data layer is bootstrapped to let plugins create pages from data

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const getArtcles = makeRequest(graphql, `
    {
      allStrapiArticles {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    //Create pages for each article.
    result.data.allStrapiArticles.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getAuthors = makeRequest(graphql, `{
    allStrapiUsers {
      edges {
        node {
          id
        }
      }
    }  
  }`).then(result => {
    //Create pages for each user.
    result.data.allStrapiUsers.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/user.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  //Query for articles nodes to use in creating pages
  return Promise.all([getArtcles, getAuthors])
}