import AddLisitngNav from "../_components/AddListingLayout/AddLisitngNav"

function Layout({ children }) {

  return (
    <>
      <AddLisitngNav  />
      {children}
    </>
  )
}
export default Layout