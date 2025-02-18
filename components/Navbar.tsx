import Logo from "./Logo"


const Navbar = () => {
  return (
    <header className="bg-background fixed inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
      <div className="container mx-auto h-(--header-height) flex justify-between items-center py-4 w-full">
        <Logo />
        <div className="flex items-center">
          <a href="/preview" className="text-lg">Preview</a>
        </div>
      </div>
    </header>
  )
}
export default Navbar