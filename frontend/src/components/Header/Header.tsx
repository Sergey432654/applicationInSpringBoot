export default function Header() {
    return(
        <>
            <header className="flex bg-gray-800 text-white p-4 justify-between" >
                <h1>Header</h1>
                <div className="flex gap-5">
                    <button className="cursor-pointer">Login</button>
                    <button className="cursor-pointer">Login</button>
                    <button className="cursor-pointer">Login</button>
                    <button className="cursor-pointer">Login</button>
                </div>
            </header>
        </>
    )
}