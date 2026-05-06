import {useState} from "react";

export default function Header() {
    const [count, setCount] = useState<number>(0);
    const handlerFn = () =>{
        setCount(count +1 );
    }
    return(
        <>
            <header className="flex bg-gray-800 text-white p-4 justify-between" >
                <h1>Header</h1>
                <div className="flex gap-5">
                    <button onClick={ handlerFn} className="cursor-pointer">{count}</button>
                    <button className="cursor-pointer">Login</button>
                    <button className="cursor-pointer">Login</button>
                    <button className="cursor-pointer">Login</button>
                </div>
            </header>
        </>
    )
}