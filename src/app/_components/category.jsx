"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { fetchCategories } from "../_actions/category/getCategories";
import parse from "html-react-parser";
import Loading from "./UnauthenticatedComponent.jsx/Loading";
import { useLocale } from "next-intl";

library.add(fas);
function CategoryIcon({ svgString, className }) {
  const SVG = svgString.replace(
    /<svg/,
    `<svg className="${className}"`
  );
  return <>{parse(SVG)}</>;
}

const Category = ({ icon, displayName, activated, onClick, technicalName, _id }) => (
  <div
    className={`cursor-pointer border-b-2 flex flex-col items-center p-2 transition-all duration-300 ${activated
      ? "category-activated border-black"
      : "border-transparent hover:border-gray-300"
      }`}
    onClick={onClick}
  >
    <CategoryIcon svgString={icon} className={`w-8 h-8 mb-1 ${activated ? "fill-black" : "fill-gray-500"}`} />
    <span
      className={`text-center font-airbnb text-[0.8rem] whitespace-nowrap tracking-[0.25px] ${activated ? "font-semibold" : ""
        }`}
      title={displayName}
    >
      {displayName}
    </span>
  </div>
);

const CategoryList = () => {
  const locale = useLocale()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);
  const router = useRouter()

  const handleCategoryClick = (technicalName,_id) => {
    if (technicalName == "ALL") {
      router.push('/')
      setActiveCategory(technicalName);
      return
    }
    router.push(`/?category=${_id}`)
    setActiveCategory(technicalName);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: direction * container.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      const container = scrollContainerRef.current;
      if (container) {
        container.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
          container.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, [loading]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetchCategories()
      if (res.status == 200) {
        setCategories(res.data)
        setLoading(false)
      }
      else
        setError(true)
    }
    getCategories()
  }, [])

  if (loading)
    return (<div role="status" className="py-6 flex justify-center items-center">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff385c]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading Categories...</span>
    </div>)
  if (error)
    return (<div className="text-center w-full pb-6">Error loading Categories</div>)
  return (
    <div className="relative mx-10">
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto flex gap-7 py-2 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((category) => (
          <Category
            key={category.technicalName}
            icon={category.icon}
            displayName={locale == "ar" ? category.displayName.ar : category.displayName.en}
            activated={activeCategory === category.technicalName}
            technicalName={category.technicalName}
            onClick={() => handleCategoryClick(category.technicalName,category._id)}
          />
        ))}
      </div>
      {showLeftArrow && (
        <button
          className={`absolute ${locale == 'en'?'-left-6 top-1/2':'-right-6 top-1/2'} -translate-y-1/2 w-10 h-10 bg-white p-2 border rounded-full shadow-md transition-opacity duration-300`}
          onClick={() =>{
            if(locale == 'en')
              scroll(-1)
            else
              scroll(1)
          }}
        >
          {locale == 'en'?
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />:
          <FontAwesomeIcon icon={["fas", "chevron-right"]} />
            }
        </button>
      )}
      {showRightArrow && (
        <button
          className={`absolute ${locale == 'en' ? '-right-6 top-1/2' : '-left-6 top-1/2'} -translate-y-1/2 w-10 h-10 bg-white p-2 border rounded-full shadow-md transition-opacity duration-300`}
          onClick={() => {
            if (locale == 'en')
              scroll(1)
            else
              scroll(-1)
          }}
        >
          {locale == 'en' ?
            <FontAwesomeIcon icon={["fas", "chevron-right"]} />:
            <FontAwesomeIcon icon={["fas", "chevron-left"]} /> 
          }
        </button>
      )}
    </div>
  );
};

export default CategoryList;
