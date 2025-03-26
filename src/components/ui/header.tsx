import { logo } from "assets/index";

export function Header() {
  return (
    <header className="flex flex-row items-center p-10 bg-center bg-no-repeat bg-cover shadow-md bg-banner shadow-gray-500">
      <img
        src={logo}
        className="h-20 transition-transform cursor-pointer hover:scale-105"
      />
    </header>
  );
}
