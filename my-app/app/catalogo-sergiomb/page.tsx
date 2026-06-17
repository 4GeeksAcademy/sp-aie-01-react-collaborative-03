"use client"

import CategoryViewer from "@/components/CategoryViewer";
import TagsDisplay from "@/components/TagsDisplay";
import { useState } from "react";

export default function CatalogoPage() {

  const [currentTag, setCurrentTag] = useState("Cute");

  return (
    <div>
      <h1>Catalogo Sergio MB</h1>
      <TagsDisplay setTag={setCurrentTag} />
      <CategoryViewer tag={currentTag}/>
    </div>
  );
}
