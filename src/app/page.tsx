'use client'

import { FilterArea } from "@/components/FilterArea";
import { FooterArea } from "@/components/FooterArea";
import { HeaderPage } from "@/components/HeaderPage";
import { TitleSec } from "@/components/TitleSec";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-neutral-500 to-gray-800">
      <HeaderPage/>
      <TitleSec/>
      <FilterArea/>
      <FooterArea/>
    </div>
  );
}

// https://parallelum.com.br/fipe/api/v1

//https://deividfortuna.github.io/fipe/
