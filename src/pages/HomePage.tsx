
import { HistorySection } from "../components/Home/HistoryComponents/HistorySection"
import "../globals.css"
import { CreateJobSection } from "../components/Home/CreateJobComponents/CreateJobSection"

export default function Home(){//history side and create an job side
  return (
    <div className="  md:flex-row w-full  flex flex-col ">
        <HistorySection />
        <CreateJobSection />
    </div>
  ) 
}