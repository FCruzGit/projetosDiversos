import path from 'path';
import fs from 'fs';
import {configEsteira} from '../utils/parametros';

export async function gerarArquivoBPM(xml: string, configuracoesEsteira: configEsteira) {

        function validarTipoOperacao() {
                const tipoOperacao: any = configuracoesEsteira.operacao.tipo;
                const operacoes: any = {

                        CADASTRO: 'Cadastrar Cedentes',
                        LIQUIDAÇÃO: 'Liquidação de Recebíveis',
                        CESSÃO: 'Cessão de Direitos Creditórios'
                };

                return operacoes[tipoOperacao] || 'Tipo de operação não reconhecido';
        }

        const nomeArquivoFinal = `[ ${configuracoesEsteira.fundo.tipo} ${configuracoesEsteira.fundo.nome.toUpperCase()} ] ${validarTipoOperacao()}`

        fs.writeFileSync(path.join(__dirname, configuracoesEsteira.diretorioSaida, `${nomeArquivoFinal}.bpmn`), xml);

        console.log("Arquivo BPM gerado com sucesso!\n");
}
