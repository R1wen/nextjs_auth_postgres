import { Metadata } from "next"
import DashboardComponent from "./DashboardComponent"

export const metadata: Metadata ={
    title: "Dashboard",
}

export default function page() {
  return (
    <div>
        <DashboardComponent/>
    </div>
  )
}