export const HeaderPage = () => {
    return (
        <header className="w-full min-h-12 dark:shadow-md shadow-zinc-950 bg-zinc-300/70 dark:bg-zinc-900/60 flex justify-between px-3 py-1 items-center">
            <div>
                <h1 className="text-xl font-bold md:text-xl lg:text-2xl">MICarros</h1>
            </div>
            <div className="hidden md:flex">
                <ul className="flex flex-row gap-3">
                    <li className="cursor-pointer px-2 py-0.5 rounded-lg active:text-slate-600 dark:active:text-slate-300 hover:underline underline-offset-8">
                        Comprar
                    </li>
                    <li className="cursor-pointer px-2 py-0.5 rounded-lg active:text-slate-600 dark:active:text-slate-300 hover:underline underline-offset-8">
                        Vender
                    </li>
                    <li className="cursor-pointer px-2 py-0.5 rounded-lg active:text-slate-600 dark:active:text-slate-300 hover:underline underline-offset-8">
                        Serviços
                    </li>
                    <li className="cursor-pointer px-2 py-0.5 rounded-lg active:text-slate-600 dark:active:text-slate-300 hover:underline underline-offset-8">
                        Financiamento
                    </li>
                </ul>
            </div>
        </header>
    )
}