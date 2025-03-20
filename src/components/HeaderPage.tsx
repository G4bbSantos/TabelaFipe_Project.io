export const HeaderPage = () => {
    return (
        <header className="w-full min-h-16 flex justify-between px-3 py-1 items-center">
            <div>
                <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">MICarros</h1>
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