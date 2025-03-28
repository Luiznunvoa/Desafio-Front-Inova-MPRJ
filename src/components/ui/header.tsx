import { logo } from "assets/index";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex flex-row items-center p-10 bg-center bg-no-repeat bg-cover shadow-md bg-banner shadow-gray-500 border-b-4 border-b-primary">
      <img
        src={logo}
        className="h-20 transition-transform cursor-pointer hover:scale-105"
        onClick={() => navigate("/")}
      />
    </header>
  );
}
