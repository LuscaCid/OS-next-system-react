
import { HistorySection } from "../components/Home/HistoryComponents/HistorySection"
import "../globals.css"
import { CreateJobSection } from "../components/Home/CreateJobComponents/CreateJobSection"

export default function Home(){//history side and create an job side
  return (
    <div className=" flex-row w-full  flex h-full">
        <HistorySection />
        <CreateJobSection />
    </div>
  ) 
}