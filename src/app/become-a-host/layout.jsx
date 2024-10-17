import AddLisitngNav from "../_components/AddListingLayout/AddLisitngNav"

function Layout({ children }) {

  return (
    <>
    <div className="h-screen flex flex-col">
      <AddLisitngNav  />
      {children}
    </div>
      
    </>
  )
}
export default Layout