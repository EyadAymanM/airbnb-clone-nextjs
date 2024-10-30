import { fetchData } from "@/app/_actions/Listing/fetchData";
import BackButton from "@/app/_components/BackButton";
import CardEditorList from "@/app/_components/CardEditorList";

async function Layout({ children, params }) {
  const { id } = params;

  let listing = [];
  try {
    listing = await fetchData(`listing/${id}`);
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }

  return (
    <div className="flex flex-col md:flex-row  ">
      {/* LEFT - Sidebar */}
      <div className="w-full md:w-1/3 bg-white p-4 md:p-6 border-r border-gray-200">
        <div className="flex items-center gap-2 p-2 md:p-4">
          <BackButton />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Listing Editor</h1>
        </div>
        <div className="max-h-[calc(100vh-15rem)] overflow-y-auto">
          <CardEditorList listing={listing} />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="w-full md:w-2/3 flex flex-col p-4 md:p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;