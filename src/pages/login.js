import React, { useEffect } from "react"

export default function Login() {

  useEffect(() => {

    fetch("https://cms.gurugoes.net/graphql", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `mutation MyLogin {
            loginWithCookies(input: { clientMutationId: "test123", password: "your_password", login: "your_username" }) {
            status
          }
        }`,
        variables: {}
      })
    }).then(resp => resp.json())
      .then(body => console.log(body))
      .catch(e => console.error(e))
  }, [])

  return <p>Login Page</p>

}