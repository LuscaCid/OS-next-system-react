import RegistrationSection from "../components/User/UsersRegister/RegistrationSection";
import { UsersSection } from "../components/User/UsersHistoryComponents/UserSection";

export default function User () {
  return (
    <div className="flex-row w-full flex h-full">
      <UsersSection />
      <RegistrationSection/>
    </div>
  )
}