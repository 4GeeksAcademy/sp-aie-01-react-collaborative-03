"use client";

import { useRef } from "react";

type Props = {
    tags: string[],
    setTag: (tag: string) => void;
};

export default function TagsCarousel({ tags, setTag }: Props) {
    const scrollRef = useRef<HTMLUListElement>(null);

    const scroll = (direction: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: direction === "left" ? -300 : 300,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => scroll("left")}
                className="shrink-0 rounded-full bg-gray-200 px-3 py-2 hover:bg-gray-300"
            >
                ←
            </button>

            <ul
                ref={scrollRef}
                className="
          flex
          gap-2
          overflow-x-auto
          whitespace-nowrap
          scroll-smooth
          flex-1
          scrollbar-none
        "
            >
                {tags.map((tag) => {
                   

                    return (
                        <button key={tag} onClick={() => setTag(tag)}>
                            <li
                                key={tag}
                                className="
                shrink-0
                bg-gray-300
                text-white
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
              "
                            >
                                {tag}
                            </li>
                        </button>
                    );
                })}
            </ul>

            <button
                onClick={() => scroll("right")}
                className="shrink-0 rounded-full bg-gray-200 px-3 py-2 hover:bg-gray-300"
            >
                →
            </button>
        </div>
    );
}