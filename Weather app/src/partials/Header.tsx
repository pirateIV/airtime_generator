import Logo from "@/assets/icons/logo.svg";
import SearchBar from "@/components/search/SearchBar";
import TempSwitcher from "@/components/TempSwitcher";

const Header = () => {
  return ( 
    <header className="py-8 sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between gap-x-10">
        <img src={Logo} alt="Weather app logo" />

        <SearchBar />
        <TempSwitcher />
      </div>
    </header>
  );
};

export default Header;
