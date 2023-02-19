import { useRouteError } from "react-router-dom"
import { Alert } from "react-bootstrap"
import React from 'react'

export default function ErrorPage(){
  const error = useRouteError()
  console.log(error)

  const errorMessg = `${error.status}: ${error.statusText}` || error.message

  return (
    <div>
        <Alert variant="danger">
            <Alert.Heading>Oops!</Alert.Heading>
            <p>
                Lo siento, ocurrió un error inesperado.
            </p>
            <hr />
            <p className="mt-2">{errorMessg}</p>
        </Alert>
    </div>
  )
}
