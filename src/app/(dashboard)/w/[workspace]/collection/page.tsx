"use client";
import AllCollections from "@/components/collection/AllCollections";
import CollectionViewOptions from "@/components/CollectionViewOptions";
import React from "react";

const Page = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center pt-28">
      <div className="w-full max-w-5xl">
        <CollectionViewOptions title="All Collections">
          <AllCollections />
        </CollectionViewOptions>
      </div>
    </section>
  );
};

export default Page;
