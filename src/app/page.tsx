'use client'

import { FilterArea } from "@/components/FilterArea";
import { HeaderPage } from "@/components/HeaderPage";
import { SugVeic } from "@/components/SugVeic";
import { TitleSec } from "@/components/TitleSec";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-neutral-300 dark:bg-neutral-800">
      <HeaderPage/>
      <TitleSec/>
      <FilterArea/>
    </div>
  );
}

// https://parallelum.com.br/fipe/api/v1

//https://deividfortuna.github.io/fipe/
