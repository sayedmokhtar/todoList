import { useContext } from "react";
import { userContext } from "./contexts/UserContext";
export default function Header() {
  const userData = useContext(userContext);
  return (
    <div className="w-full h-auto bg-black shadow-lg rounded-lg flex justify-center">
      <h1 className="text-white  py-7 text-xl font-bold  font-title">
        Tarmeez Academy wellcome {userData.name}
      </h1>
    </div>
  );
}
