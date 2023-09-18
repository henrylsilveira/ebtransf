import Link from "next/link"

export function Logo() {
    return (
        <div className="flex flex-1">
            <div className="flex bg-gray-950 mt-2 mx-auto text-5xl border-b rounded-md border-green-800">
                <Link href="/" className="flex flex-1">
                    <p className="font-bold bg-green-800 text-green-400 px-2 py-1 rounded-bl-md rounded-tl-md">EB#</p>
                    <p className="font-light text-green-300 px-2 py-1">calc</p>
                </Link>
            </div>
        </div>
    )
}