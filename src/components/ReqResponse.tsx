import { useEffect, useState } from "react";

// Definição da interface ResFipe
type ResFipe = {
    Marca: string;
    Modelo: string;
    AnoModelo: number;
    Combustivel: string;
    CodigoFipe: string;
    MesReferencia: string;
    SiglaCombustivel: string;
    Valor: string
};

// Props do componente
type ReqResponseProps = {
    urlFinal: string;
};

export const ReqResponse: React.FC<ReqResponseProps> = ({ urlFinal }) => {
    const [respFipe, setRespFipe] = useState<ResFipe | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchResponseFipe = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(urlFinal);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da API.");
            }
            const data: ResFipe = await response.json();
            setRespFipe(data);
        } catch (error) {
            console.error("Erro ao buscar valores:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (urlFinal) {
            fetchResponseFipe();
        }
    }, [urlFinal]);

    return (
        <section className="p-4 rounded text-zinc-900">
            <h3 className="text-lg font-bold mb-2">Informações da Tabela Fipe</h3>
            {isLoading ? (
                <p>Carregando...</p>
            ) : respFipe ? (
                <div>
                    <p><strong>Mês de Referência:</strong> {respFipe.MesReferencia}</p>
                    <p><strong>Código Fipe:</strong> {respFipe.CodigoFipe}</p>
                    <p><strong>Marca:</strong> {respFipe.Marca}</p>
                    <p><strong>Modelo:</strong> {respFipe.Modelo}</p>
                    <p><strong>Ano Modelo:</strong> {respFipe.AnoModelo}</p>
                    <p><strong>Combustível:</strong> {respFipe.Combustivel}</p>
                    <p><strong>Sigla Combustível:</strong> {respFipe.SiglaCombustivel}</p>
                    <p><strong>Valor:</strong> {respFipe.Valor}</p>
                </div>
            ) : (
                <p>Não foi possível carregar os dados.</p>
            )}
        </section>
    );
};
