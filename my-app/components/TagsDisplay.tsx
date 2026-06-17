"use client"

import { useState } from "react";
import TagsCarousel from "./TagsCarousel";

type TagsDisplayProps = {
  setTag: (tag: string) => void;
};

export default function TagsDisplay({setTag}: TagsDisplayProps) {

    const [tags, setTags] = useState([])

    fetch("https://cataas.com/api/tags").then(res => res.json()).then(data => setTags(data));

    return (
        tags.length === 0 ? <p>Cargando tags...</p> : <TagsCarousel tags={tags} setTag={setTag} />
    );
}