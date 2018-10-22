import React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layout'

const UserTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiUsers.username}</h1>
    <ul>
      {data.strapiUsers.articles.map(article => (
        <li key={article.id}>
          <h2>
            <Link to={`/${article.id}`}>{article.title}</Link>
          </h2>
          <p>{article.content}</p>
        </li>
      ))}
    </ul>
  </Layout>
)

export default UserTemplate

export const query = graphql`  
  query UserTemplate($id: String!) {
    strapiUsers(id: { eq: $id }) {
      id
      username
      articles {
        id
        title
        content
      }
    }
  }
`