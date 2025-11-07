import { Metadata } from "next"
import LoginComponent from "./LoginComponent"

export const metadata: Metadata ={
    title: "Login",
}

export default function page() {
  return (
    <div>
        <LoginComponent/>
    </div>
  )
}