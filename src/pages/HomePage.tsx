
import { HistorySection } from "../components/Home/HistoryComponents/HistorySection"
import "../globals.css"
import { CreateJobSection } from "../components/Home/CreateJobComponents/CreateJobSection"

export default function Home(){//history side and create an job side
  return (
    <div className="h-full md:grid grid-cols-2 flex flex-col w-full relative">
        <HistorySection />
        <CreateJobSection />
    </div>
  ) 
}