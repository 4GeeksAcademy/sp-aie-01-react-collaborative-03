"use client"

import Image from "next/image";
import { useEffect, useState } from "react"

export default function CategoryViewer({ tag }: { tag: string }) {

    const [cats, setCats] = useState([]);

    async function loadData() {
        const res = await fetch(`https://cataas.com/api/cats?tags=${tag}`);
        if (!res.ok) return;
        const data = await res.json();
        setCats(data);
    }

    useEffect(() => {
        loadData();
    }, [tag])

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-8">
            {cats.map((e, index) => (
                <CatImageViewer key={index} id={e.id} />
            ))}
        </div>
    )
}

function CatImageViewer({ id }: { id: string }) {
    return (
        <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
            <div className="p-2 text-xs text-gray-500 truncate">
                {id}
            </div>

            <Image
                src={`https://cataas.com/cat/${id}?width=250&height=250`}
                alt={`Cat ${id}`}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                height={250}
                width={250}
                unoptimized
            />
        </div>
    )
}