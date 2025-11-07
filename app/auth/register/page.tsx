import { Metadata } from "next"
import RegisterComponent from "./RegisterComponent"

export const metadata: Metadata ={
    title: "Register",
}

export default function page() {
  return (
    <div>
        <RegisterComponent/>
    </div>
  )
}