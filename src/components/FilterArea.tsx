import React, { useState, useEffect, ChangeEvent } from "react";
import { ReqResponse } from "./ReqResponse";
import { SugVeic } from "./SugVeic";

// Tipos para a API
type Marca = {
    codigo: string;
    nome: string;
};

type Modelo = {
    codigo: string;
    nome: string;
};

type Ano = {
    codigo: string;
    nome: string;
};

export const FilterArea: React.FC = () => {
    const [tipoVeiculo, setTipoVeiculo] = useState<"carros" | "motos" | "caminhoes">("carros");
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [anos, setAnos] = useState<Ano[]>([]);

    const [marcaSelecionada, setMarcaSelecionada] = useState<Marca | null>(null);
    const [modeloSelecionado, setModeloSelecionado] = useState<Modelo | null>(null);
    const [anoSelecionado, setAnoSelecionado] = useState<Ano | null>(null);

    const [marcaInput, setMarcaInput] = useState<string>("");
    const [modeloInput, setModeloInput] = useState<string>("");

    const [sugestoesMarcas, setSugestoesMarcas] = useState<Marca[]>([]);
    const [sugestoesModelos, setSugestoesModelos] = useState<Modelo[]>([]);

    const [urlConsulta, setUrlConsulta] = useState<string | null>(null);

    const [divOculta, setDivOculta] = useState(false);

    const [anoInput, setAnoInput] = useState<string>(""); // Texto digitado no input
    const [sugestoesAnos, setSugestoesAnos] = useState<Ano[]>([]); // Sugestões dinâmicas de anos


    const handleConsultarValor = () => {
        if (marcaSelecionada && modeloSelecionado && anoSelecionado) {
            setUrlConsulta(
                `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marcaSelecionada.codigo}/modelos/${modeloSelecionado.codigo}/anos/${anoSelecionado.codigo}`
            );
            setDivOculta(true); // Oculta a primeira div
        }
    };

    // Requisição para buscar marcas
    const fetchMarcas = async () => {
        try {
            const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`);
            const data: Marca[] = await response.json();
            setMarcas(data);
        } catch (error) {
            console.error("Erro ao buscar marcas:", error);
        }
    };

    // Requisição para buscar modelos de uma marca
    const fetchModelos = async (codigoMarca: string) => {
        try {
            const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${codigoMarca}/modelos`);
            const data = await response.json();
            setModelos(data.modelos);
        } catch (error) {
            console.error("Erro ao buscar modelos:", error);
        }
    };

    // Requisição para buscar anos de um modelo
    const fetchAnos = async (codigoMarca: string, codigoModelo: string) => {
        try {
            const response = await fetch(
                `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`
            );
            const data: Ano[] = await response.json();
            setAnos(data);
        } catch (error) {
            console.error("Erro ao buscar anos:", error);
        }
    };

    // Atualiza as marcas ao mudar o tipo de veículo
    useEffect(() => {
        fetchMarcas();
    }, [tipoVeiculo]);

    // Filtrar sugestões de marcas conforme o texto digitado
    const handleMarcaChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMarcaInput(value);
        setSugestoesMarcas(marcas.filter((m) => m.nome.toLowerCase().includes(value.toLowerCase())));
    };

    // Filtrar sugestões de modelos conforme o texto digitado
    const handleModeloChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setModeloInput(value);
        setSugestoesModelos(modelos.filter((m) => m.nome.toLowerCase().includes(value.toLowerCase())));
    };

    // Quando um ano é selecionado
    const handleAnoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAnoInput(value);
        setSugestoesAnos(anos.filter((ano) => ano.nome.toLowerCase().includes(value.toLowerCase())));
    };

    // Quando uma marca é selecionada
    const handleMarcaSelect = (marca: Marca) => {
        setMarcaSelecionada(marca);
        setMarcaInput(marca.nome);
        setSugestoesMarcas([]);
        fetchModelos(marca.codigo);
    };

    // Quando um modelo é selecionado
    const handleModeloSelect = (modelo: Modelo) => {
        setModeloSelecionado(modelo);
        setModeloInput(modelo.nome);
        setSugestoesModelos([]);
        if (marcaSelecionada) {
            fetchAnos(marcaSelecionada.codigo, modelo.codigo);
        }
    };
    
    const handleAnoSelect = (ano: Ano) => {
        setAnoInput(ano.nome);
        setSugestoesAnos([]);
        setAnoSelecionado(ano); // Atualize o estado do ano selecionado
    };

    const handleAreaAPI = () => {
        setDivOculta(false)
        setAnoInput("")
        setMarcaInput('')
        setModeloInput('')
        setUrlConsulta('')
    }
    

    return (
        <section className="w-full min-h-48 flex justify-center items-center flex-col">
            <div className={`w-11/12 md:w-9/12 rounded-xl bg-zinc-700 flex flex-col gap-4 items-center py-3 px-5 ${
                    divOculta ? "hidden" : "flex"
                }`}>
                <h3 className="text-lg font-light">Selecione o Tipo de Veículo</h3>
                <div className="rounded-2xl bg-slate-50 py-1 px-1 flex">
                    {["carros", "motos", "caminhoes"].map((tipo) => (
                        <button
                            key={tipo}
                            className={`py-1 px-5 rounded-xl ${
                                tipoVeiculo === tipo ? "bg-black text-white" : "text-black hover:underline"
                            }`}
                            onClick={() => setTipoVeiculo(tipo as "carros" | "motos" | "caminhoes")}
                        >
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-6 w-full">
                    <div className="relative">
                        <input
                            type="text"
                            className="rounded-xl px-2 py-1 text-black w-full placeholder:text-zinc-500"
                            placeholder="Marca.."
                            value={marcaInput}
                            onChange={handleMarcaChange}
                            onFocus={() => setSugestoesMarcas(marcas)}
                            onBlur={() => setTimeout(() => setSugestoesMarcas([]), 150)}
                        />
                        {sugestoesMarcas.length > 0 && (
                            <ul className="absolute bg-white border rounded-lg shadow-lg w-full max-h-40 overflow-y-auto z-10 text-gray-700">
                                {sugestoesMarcas.map((sugestao) => (
                                    <li
                                        key={sugestao.codigo}
                                        className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleMarcaSelect(sugestao)}
                                    >
                                        {sugestao.nome}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            className="rounded-xl px-2 py-1 text-black w-full disabled:bg-white disabled:placeholder:text-gray-400"
                            placeholder="Modelo.."
                            value={modeloInput}
                            onChange={handleModeloChange}
                            onFocus={() => setSugestoesModelos(modelos)}
                            onBlur={() => setTimeout(() => setSugestoesModelos([]), 150)}
                            disabled={!marcaSelecionada}
                        />
                        {sugestoesModelos.length > 0 && (
                            <ul className="absolute bg-white border rounded-lg shadow-lg w-full max-h-40 overflow-y-auto z-10 text-gray-700">
                                {sugestoesModelos.map((sugestao) => (
                                    <li
                                        key={sugestao.codigo}
                                        className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleModeloSelect(sugestao)}
                                    >
                                        {sugestao.nome}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            className="rounded-xl px-2 py-1 text-black w-full disabled:bg-white disabled:text-gray-400"
                            placeholder="Ano.."
                            value={anoInput}
                            onChange={handleAnoChange}
                            onFocus={() => setSugestoesAnos(anos)}
                            onBlur={() => setTimeout(() => setSugestoesAnos([]), 200)} 
                            disabled={!modeloSelecionado}
                        />
                        {sugestoesAnos.length > 0 && (
                            <ul className="absolute bg-white border rounded-lg shadow-lg w-full max-h-40 overflow-y-auto z-10 text-gray-700">
                                {sugestoesAnos.map((sugestao) => (
                                    <li
                                        key={sugestao.codigo}
                                        className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                                        onMouseDown={() => handleAnoSelect(sugestao)} 
                                    >
                                        {sugestao.nome}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button className="sm:col-span-3 px-4 py-1 bg-neutral-500 rounded-2xl w-full text-white active:bg-neutral-700" onClick={handleConsultarValor}>
                        Consultar valor
                    </button>
                </div>
            </div>
            {urlConsulta && (
                <div className="w-11/12 md:w-9/12 rounded-xl border bg-zinc-700 flex flex-col items-center py-4 px-3 gap-5">
                    <ReqResponse urlFinal={urlConsulta} />
                    <button className="hover:text-slate-500" onClick={handleAreaAPI}>Voltar</button>
                </div>
            )}
        </section>
    );
};
