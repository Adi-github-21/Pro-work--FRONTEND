// Packages
import { useState, useEffect, useRef } from "react";
import { algoliasearch } from "algoliasearch";
import { Link } from "react-router-dom";
import { InstantSearch, Hits, Configure, Highlight } from "react-instantsearch";

// Styles
import "instantsearch.css/themes/reset.css";

// Assets
import LeftArrow from "../../Assets/left-arrow.png";
import SearchIcon_Y from "../../Assets/nav_search_Y.png";
import SearchIcon_G from "../../Assets/nav_search_G.png";


// Algolia client setup
const searchClient = algoliasearch( "M00NBJKN1X", "ecba71ba62071df81043b6c541b269f4" );

const AlgoSearch = ({isScrolled}) => {
  const [query, setQuery] = useState("");
  const [showHits, setShowHits] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search");

  const searchRef = useRef(null);
  const hitsRef = useRef(null);

  const handleSearchBoxChange = (event) => {
    setQuery(event.target.value);
    setShowHits(event.target.value.length > 0);
    if (window.innerWidth < 640 && typeof closeHamMenu === "function") { closeHamMenu() }
  };

  const handleClickOutside = (event) => {
    if ( searchRef.current && !searchRef.current.contains(event.target) && hitsRef.current && !hitsRef.current.contains(event.target) ) {
      setShowHits(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const placeholders = [ "Search for electricians, plumbers...", "What service are you looking for?", "What is your location?", "Try Searching area..." ];
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleResultClick = () => setShowHits(false);

  const CloseSmallSearch = () => {
    const SmallSearch = document.getElementById("SmallSearch");
    SmallSearch.classList.remove("displayFlex");
    SmallSearch.classList.add("displayNone");
  };

  const scrollTop0 = () => window.scrollTo({ top: 0, behavior: "smooth" });


  const HitItem = ({ hit }) => {
    return (      
      <div className="bg-[#33806b] cursor-pointer group flex justify-between rounded-lg shadow-md transition hover:shadow-lg my-4" >
        <p className="p-4 flex flex-wrap"> 
          <span className="w-full text-lg text-white"> Service: <Highlight attribute="ShopCategory" hit={hit} /> </span>
          <span className="w-full text-sm text-white"> Shop Name: <Highlight attribute="ShopName" hit={hit} /> </span>
          {/* <span className="w-full"> Area: <Highlight attribute="Area" hit={hit} /> </span> */}
          <Link to={`/services/${hit.ShopCategory.toLowerCase()}/${hit.objectID}`} onClick={() => { handleResultClick(); CloseSmallSearch(); scrollTop0() }} className="w-auto text-center px-4 py-2 mt-2 text-xs text-[#33806b] bg-white font-semibold border-2 border-[#33806b] rounded-lg hover:bg-[#f9f9f9] transition">View Profile</Link>
        </p>
        <div className="bg-gray-300 flex items-center justify-center rounded-r-lg">
          <img src={hit.ShopPhoto1} alt="" className="w-40 h-20 sm:w-44 sm:h-24 transition" />
        </div>
      </div>
    )
  }

  return (
    <div id="SmallSearch" className="displayNone md:flex w-full md:w-[40%] h-screen md:h-auto fixed md:relative flex-col top-0 left-0 bg-[#fff] md:bg-transparent p-4 z-50" >
      <InstantSearch searchClient={searchClient} indexName="Production_Worker">

        {/* Mobile Search */}
        <div className="flex md:hidden flex-col w-full max-w-[720px] relative">
          {/* Mobile Search Input */}
          <div ref={searchRef} className="flex md:hidden justify-between items-center w-full h-14 bg-white shadow-md border-2 rounded-full px-4" >
            <img src={LeftArrow} className="h-5 cursor-pointer" alt="close" onClick={CloseSmallSearch}/>
            <input type="text" value={query} onChange={handleSearchBoxChange} className="w-full ml-4 text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none" placeholder={placeholder}/>
          </div>

          {/* Mobile Search Results */}
          {showHits && (
            <div ref={hitsRef} className="md:hidden bg-white shadow-lg mt-3 max-h-[80vh] overflow-y-auto"  id="NoScroll">
              <Hits hitComponent={HitItem} />
            </div>
          )}
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-col w-full max-w-[620px] relative">
          {/* Desktop Search Input */}
          <div ref={searchRef} className={`flex justify-between items-center bg-white shadow-md border-2 ${isScrolled ? 'border-[#33806B]' : 'border-[#f2da1d]'} rounded-full pl-4 pr-2 py-0.5 w-full`}>
            <input id="searchInput" type="text" value={query} onChange={handleSearchBoxChange} className="w-full text-gray-800 placeholder-gray-500 bg-transparen focus:outline-none" placeholder={placeholder}/>
            <label htmlFor="searchInput">
              <img src={isScrolled? SearchIcon_Y : SearchIcon_G } className="h-10 cursor-pointer hover:scale-110 transition-transform" alt="search"/>
            </label>
          </div>

          {/* Desktop Search Results */}
          {showHits && (
            <div ref={hitsRef} className="absolute top-full mt-2 w-full px-2 bg-white border-2 border-[#42DCB3] rounded-xl shadow-lg max-h-[80vh] overflow-y-auto z-50" id="NoScroll">
              <Hits hitComponent={HitItem} />
            </div>
          )}
        </div>

        <Configure hitsPerPage={250} query={query} />
      </InstantSearch>
    </div>
  );
};

export default AlgoSearch;