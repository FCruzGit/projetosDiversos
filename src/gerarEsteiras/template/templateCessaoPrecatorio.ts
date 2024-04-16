import {configEsteira, parametroCessao, parametrosValidacao} from '../utils/parametros';
import {configuracaoEsteira} from "../utils/configuracao";

export function templateCessaoPrecatorio(config: configEsteira) {

    const fundo = config.fundo;
    const parametrosBPM = parametroCessao
    const validarBPM = parametrosValidacao

    const idFormatada = fundo.identificacao.toString().replace(/\D/g, '').padStart(14, '0')

    const pendenciaLastro = `$\{S('{"to":"${fundo.var.email.notificarPendenciaLastro}","subject":"[ BRL TRUST ] Operação do ###fundo.acronimo### | ###identificadorCessao### Pendência de Lastro","html":"&lt;p&gt;Prezados,&lt;/p&gt; &lt;p&gt;Informamos que a operação &lt;b&gt;###identificadorCessao###&lt;/b&gt; do fundo &lt;b&gt;###fundo.acronimo###&lt;/b&gt; - &lt;b&gt;###fundo.nome###&lt;/b&gt; está aguardando o envio do lastro.&lt;/p&gt;&lt;p&gt;Atenciosamente&lt;/p&gt;"}')}`

    const PagamentoComplementar = `$\{S('{"to":"${fundo.var.email.notificarPagamentoComplementar}","subject":"[ BRL TRUST ] Operação do ###fundo.acronimo### | ###identificadorCessao### Pendência de Lastro","html":"&lt;p&gt;Prezados,&lt;/p&gt; &lt;p&gt;Informamos que a operação &lt;b&gt;###identificadorCessao###&lt;/b&gt; do fundo &lt;b&gt;###fundo.acronimo###&lt;/b&gt; - &lt;b&gt;###fundo.nome###&lt;/b&gt; foi atualizada e está agora em fase de pagamento complementar.&lt;/p&gt;&lt;p&gt;Atenciosamente&lt;/p&gt;"}')}`

    return `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" id="Definitions_0admcx5" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.9.0">
  <bpmn:process id="fidc.${fundo.var.acronimo}.cessao-direito-creditorio" name="[ ${fundo.tipo} ${(fundo.nome.replace(/[^a-zA-Z]/g, ' ')).toUpperCase()} ] Cessão de Direitos Creditórios" isExecutable="true" camunda:versionTag="1.0.1">
    <bpmn:startEvent id="fidc.cessao.de.direitos.creditorios-start">
      <bpmn:outgoing>caminho_01</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:endEvent id="fidc.cessao.de.direitos.creditorios-end">
      <bpmn:incoming>caminho_26</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:serviceTask id="fidc-precatorio-cessao-tarefa-recuperarFicha" name="Recuperar Ficha de Cessão" camunda:type="external" camunda:topic="fidc-precatorio-cessao-tarefa-recuperarFicha" camunda:taskPriority="5">
      <bpmn:incoming>caminho_02</bpmn:incoming>
      <bpmn:outgoing>caminho_03</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-recuperarDocumentacao" name="Recuperar Documentação de Lastro" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-recuperarDocumentacao">
      <bpmn:incoming>caminho_04</bpmn:incoming>
      <bpmn:outgoing>caminho_05</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:userTask id="fidc.precatorio.apreciar-operacao" name="Apreciar Operação (Jurídico)" camunda:candidateGroups="camunda-juridico">
      <bpmn:incoming>caminho_06</bpmn:incoming>
      <bpmn:outgoing>caminho_07</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-realizarImportacaoFromtis" name="Realizar Importação no Fromtis" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-realizarImportacaoFromtis" camunda:taskPriority="5">
      <bpmn:incoming>caminho_10</bpmn:incoming>
      <bpmn:outgoing>caminho_11</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="decisao_02" default="caminho_09">
      <bpmn:incoming>caminho_08</bpmn:incoming>
      <bpmn:outgoing>caminho_09</bpmn:outgoing>
      <bpmn:outgoing>caminhoReprovada_01</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:exclusiveGateway id="decisao_01" default="caminho_04">
      <bpmn:incoming>caminho_03</bpmn:incoming>
      <bpmn:outgoing>caminho_04</bpmn:outgoing>
      <bpmn:outgoing>caminhoNaoCapturada_01</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-registrarDeliberacao" name="Registrar Apreciação (Jurídico)" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-registrarDeliberacao" camunda:taskPriority="5">
      <bpmn:incoming>caminho_07</bpmn:incoming>
      <bpmn:outgoing>caminho_08</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-aguardarTramiteFromtis" name="Aguardar Tramite no Fromtis" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-aguardarTramiteFromtis">
      <bpmn:incoming>caminho_11</bpmn:incoming>
      <bpmn:outgoing>caminho_12</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-atualizarCessao" name="Atualizar Cessão" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-atualizarCessao" camunda:taskPriority="5">
      <bpmn:incoming>caminhoCancelada_01</bpmn:incoming>
      <bpmn:incoming>caminho_22</bpmn:incoming>
      <bpmn:incoming>caminhoConcluida_01</bpmn:incoming>
      <bpmn:incoming>caminhoCancelada_02</bpmn:incoming>
      <bpmn:incoming>caminhoReprovada_01</bpmn:incoming>
      <bpmn:outgoing>caminho_23</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="decisao_03" default="caminho_13">
      <bpmn:incoming>caminho_12</bpmn:incoming>
      <bpmn:outgoing>caminho_13</bpmn:outgoing>
      <bpmn:outgoing>caminhoCancelada_01</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="fidc-precatorio-cessao-tarefa-notificarClienteEmail" name="Notificar Cliente (Email)" camunda:type="external" camunda:topic="fidc-precatorio-cessao-tarefa-notificarClienteEmail">
      <bpmn:incoming>caminho_24</bpmn:incoming>
      <bpmn:outgoing>caminho_25</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminho_01" sourceRef="fidc.cessao.de.direitos.creditorios-start" targetRef="fidc.${fundo.var.acronimo}.configuracao" />
    <bpmn:sequenceFlow id="caminho_03" sourceRef="fidc-precatorio-cessao-tarefa-recuperarFicha" targetRef="decisao_01" />
    <bpmn:sequenceFlow id="caminho_04" sourceRef="decisao_01" targetRef="fidc-cessao-commons-tarefa-recuperarDocumentacao" />
    <bpmn:sequenceFlow id="caminho_05" sourceRef="fidc-cessao-commons-tarefa-recuperarDocumentacao" targetRef="fidc-precatorio-cessao-tarefa-notificarClienteEmail-lastroRecuperado" />
    <bpmn:sequenceFlow id="caminho_07" sourceRef="fidc.precatorio.apreciar-operacao" targetRef="fidc-cessao-commons-tarefa-registrarDeliberacao" />
    <bpmn:sequenceFlow id="caminho_09" sourceRef="decisao_02" targetRef="fidc-cessao-commons-tarefa-notificarClienteEmail-apreciacao" />
    <bpmn:sequenceFlow id="caminho_11" sourceRef="fidc-cessao-commons-tarefa-realizarImportacaoFromtis" targetRef="fidc-cessao-commons-tarefa-aguardarTramiteFromtis" />
    <bpmn:sequenceFlow id="caminho_08" sourceRef="fidc-cessao-commons-tarefa-registrarDeliberacao" targetRef="decisao_02" />
    <bpmn:sequenceFlow id="caminho_12" sourceRef="fidc-cessao-commons-tarefa-aguardarTramiteFromtis" targetRef="decisao_03" />
    <bpmn:sequenceFlow id="caminhoCancelada_01" name="Cancelada" sourceRef="decisao_03" targetRef="fidc-cessao-commons-tarefa-atualizarCessao">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.canceladaPagamento}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="caminho_13" sourceRef="decisao_03" targetRef="fidc-cessao-commons-tarefa-notificarClienteEmail-fromtis" />
    <bpmn:task id="fidc.${fundo.var.acronimo}.configuracao" name="Configuração">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:outputParameter name="acronimo">${fundo.var.acronimo}</camunda:outputParameter>
          <camunda:outputParameter name="identificacaoFundo">${idFormatada}</camunda:outputParameter>
          <camunda:outputParameter name="emails">${fundo.var.email.notificarSituacao}</camunda:outputParameter>
          <camunda:outputParameter name="saida">${fundo.var.sftpOutput}</camunda:outputParameter>
          <camunda:outputParameter name="schema">${parametrosBPM.schemas.entrada.precatorio}</camunda:outputParameter>
          <camunda:outputParameter name="schemaRetorno">${parametrosBPM.schemas.saida.precatorio}</camunda:outputParameter>
          <camunda:outputParameter name="situacaoFromtis">${parametrosBPM.situacaoFromtis}</camunda:outputParameter>
          <camunda:outputParameter name="taskDefinitionKey">fidc.precatorio.apreciar-operacao</camunda:outputParameter>
          <camunda:outputParameter name="webhook">${fundo.var.webhook}</camunda:outputParameter>
          <camunda:outputParameter name="notificacaoPendenciaLastro">${pendenciaLastro}</camunda:outputParameter>
          <camunda:outputParameter name="notificacaoPagamentoComplementar">${PagamentoComplementar}</camunda:outputParameter>
        </camunda:inputOutput>
      </bpmn:extensionElements>
      <bpmn:incoming>caminho_01</bpmn:incoming>
      <bpmn:outgoing>caminho_02</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="caminho_02" sourceRef="fidc.${fundo.var.acronimo}.configuracao" targetRef="fidc-precatorio-cessao-tarefa-recuperarFicha" />
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-notificarEmail" name="Notificar Pendência de Lastro" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-notificarEmail" camunda:taskPriority="5">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:inputParameter name="email">${parametrosBPM.notificacaoPendenciaLastro}</camunda:inputParameter>
        </camunda:inputOutput>
      </bpmn:extensionElements>
      <bpmn:incoming>caminhoPendenciaLastro_01</bpmn:incoming>
      <bpmn:outgoing>caminhoPendenciaLastro_02</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminhoPendenciaLastro_01" sourceRef="fidc-cessao-commons-timer-recuperarDocumentacao" targetRef="fidc-cessao-commons-tarefa-notificarEmail" />
    <bpmn:userTask id="fidc.precatorio.pagamento-complementar" name="Verificar Pagamento Complementar" camunda:candidateGroups="camunda-fidc-liquidacao">
      <bpmn:incoming>caminho_18</bpmn:incoming>
      <bpmn:outgoing>caminho_19</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-recuperarLastroComplementar" name="Recuperar Documentação de Lastro" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-recuperarLastroComplementar">
      <bpmn:incoming>caminho_15</bpmn:incoming>
      <bpmn:outgoing>caminho_16</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:subProcess id="Activity_03rbjku" name="Pagamento Complementar">
      <bpmn:incoming>caminho_21</bpmn:incoming>
      <bpmn:outgoing>caminho_22</bpmn:outgoing>
      <bpmn:startEvent id="fidc.cessao.pagamento-start.complementar">
        <bpmn:outgoing>caminhoPagamento_06</bpmn:outgoing>
      </bpmn:startEvent>
      <bpmn:exclusiveGateway id="decisaoPagamento_03" default="caminhoPagamento_09">
        <bpmn:incoming>caminhoPagamento_08</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamentoInconsistente_05</bpmn:outgoing>
        <bpmn:outgoing>caminhoPagamento_09</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:exclusiveGateway id="decisaoPagamento_04" default="caminhoPagamentoReprocessar_02">
        <bpmn:incoming>caminhoPagamentoInconsistente_06</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamentoInconsistente_07</bpmn:outgoing>
        <bpmn:outgoing>Flow_1xjrqm4</bpmn:outgoing>
        <bpmn:outgoing>caminhoPagamentoReprocessar_02</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:endEvent id="fidc.cessao.pagamento-end.complementar">
        <bpmn:incoming>caminhoPagamentoInconsistente_08</bpmn:incoming>
        <bpmn:incoming>caminhoPagamento_10</bpmn:incoming>
        <bpmn:incoming>Flow_1xjrqm4</bpmn:incoming>
      </bpmn:endEvent>
      <bpmn:userTask id="fidc.liquidacao.analisar-inconsistencia-pagamento-complementar" name="Analisar Inconsistência no Pagamento Complementar" camunda:candidateGroups="camunda-fidc-liquidacao">
        <bpmn:incoming>caminhoPagamentoInconsistente_05</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamentoInconsistente_06</bpmn:outgoing>
      </bpmn:userTask>
      <bpmn:serviceTask id="fidc-cessao-commons-tarefa-solicitarPagamentoComplementar" name="Solicitar Pagamento Complementar (Pagadoria)" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-solicitarPagamentoComplementar" camunda:taskPriority="5">
        <bpmn:incoming>caminhoPagamentoReprocessar_02</bpmn:incoming>
        <bpmn:incoming>caminhoPagamento_06</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamento_07</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:serviceTask id="fidc-cessao-commons-tarefa-verificarPagamentoComplementar" name="Verificar Pagamento Complementar (Pagadoria)" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-verificarPagamentoComplementar">
        <bpmn:incoming>caminhoPagamento_07</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamento_08</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:serviceTask id="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia-complementar" name="Enviar Comprovante de Transferencia" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia" camunda:taskPriority="5">
        <bpmn:incoming>caminhoPagamento_09</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamento_10</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:serviceTask id="fidc-cessao-commons-tarefa-aprovarGestaoTed-complementar" name="Aprovar Gestão de TED" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-aprovarGestaoTed" camunda:taskPriority="5">
        <bpmn:incoming>caminhoPagamentoInconsistente_07</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamentoInconsistente_08</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:sequenceFlow id="caminhoPagamentoInconsistente_08" sourceRef="fidc-cessao-commons-tarefa-aprovarGestaoTed-complementar" targetRef="fidc.cessao.pagamento-end.complementar" />
      <bpmn:sequenceFlow id="caminhoPagamento_07" sourceRef="fidc-cessao-commons-tarefa-solicitarPagamentoComplementar" targetRef="fidc-cessao-commons-tarefa-verificarPagamentoComplementar" />
      <bpmn:sequenceFlow id="caminhoPagamento_10" sourceRef="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia-complementar" targetRef="fidc.cessao.pagamento-end.complementar" />
      <bpmn:sequenceFlow id="caminhoPagamentoInconsistente_07" name="Concluída" sourceRef="decisaoPagamento_04" targetRef="fidc-cessao-commons-tarefa-aprovarGestaoTed-complementar">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.concuida}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_1xjrqm4" name="Cancelada" sourceRef="decisaoPagamento_04" targetRef="fidc.cessao.pagamento-end.complementar">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.cancelada}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="caminhoPagamentoReprocessar_02" name="Reprocessar" sourceRef="decisaoPagamento_04" targetRef="fidc-cessao-commons-tarefa-solicitarPagamentoComplementar" />
      <bpmn:sequenceFlow id="caminhoPagamentoInconsistente_06" sourceRef="fidc.liquidacao.analisar-inconsistencia-pagamento-complementar" targetRef="decisaoPagamento_04" />
      <bpmn:sequenceFlow id="caminhoPagamentoInconsistente_05" name="Inconsistente" sourceRef="decisaoPagamento_03" targetRef="fidc.liquidacao.analisar-inconsistencia-pagamento-complementar">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.inconsistente}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="caminhoPagamento_09" sourceRef="decisaoPagamento_03" targetRef="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia-complementar" />
      <bpmn:sequenceFlow id="caminhoPagamento_08" sourceRef="fidc-cessao-commons-tarefa-verificarPagamentoComplementar" targetRef="decisaoPagamento_03" />
      <bpmn:sequenceFlow id="caminhoPagamento_06" sourceRef="fidc.cessao.pagamento-start.complementar" targetRef="fidc-cessao-commons-tarefa-solicitarPagamentoComplementar" />
    </bpmn:subProcess>
    <bpmn:sequenceFlow id="caminho_22" sourceRef="Activity_03rbjku" targetRef="fidc-cessao-commons-tarefa-atualizarCessao" />
    <bpmn:exclusiveGateway id="decisao_04" default="caminhoConcluida_01">
      <bpmn:incoming>caminho_16</bpmn:incoming>
      <bpmn:outgoing>caminho_17</bpmn:outgoing>
      <bpmn:outgoing>caminhoConcluida_01</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="caminho_16" sourceRef="fidc-cessao-commons-tarefa-recuperarLastroComplementar" targetRef="decisao_04" />
    <bpmn:sequenceFlow id="caminho_17" sourceRef="decisao_04" targetRef="fidc-cessao-commons-tarefa-notificarEmail-outro">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.pagamento}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="caminhoConcluida_01" name="Concluída" sourceRef="decisao_04" targetRef="fidc-cessao-commons-tarefa-atualizarCessao" />
    <bpmn:exclusiveGateway id="decisao_05" default="caminho_20">
      <bpmn:incoming>caminho_19</bpmn:incoming>
      <bpmn:outgoing>caminho_20</bpmn:outgoing>
      <bpmn:outgoing>caminhoCancelada_02</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="caminho_19" sourceRef="fidc.precatorio.pagamento-complementar" targetRef="decisao_05" />
    <bpmn:sequenceFlow id="caminho_20" sourceRef="decisao_05" targetRef="fidc-cessao-commons-tarefa-notificarClienteEmail-liquidacao" />
    <bpmn:sequenceFlow id="caminhoCancelada_02" name="Cancelada" sourceRef="decisao_05" targetRef="fidc-cessao-commons-tarefa-atualizarCessao">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.cancelada}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-notificarClienteEmail-liquidacao" name="Notificar Cliente (Email)" camunda:type="external" camunda:topic="fidc-precatorio-cessao-tarefa-notificarClienteEmail">
      <bpmn:incoming>caminho_20</bpmn:incoming>
      <bpmn:outgoing>caminho_21</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminho_21" sourceRef="fidc-cessao-commons-tarefa-notificarClienteEmail-liquidacao" targetRef="Activity_03rbjku" />
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-notificarClienteEmail-fromtis" name="Notificar Cliente (Email)" camunda:type="external" camunda:topic="fidc-precatorio-cessao-tarefa-notificarClienteEmail">
      <bpmn:incoming>caminho_13</bpmn:incoming>
      <bpmn:outgoing>caminho_14</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminho_14" sourceRef="fidc-cessao-commons-tarefa-notificarClienteEmail-fromtis" targetRef="fidc-cessao-commons-transferencia" />
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-notificarClienteEmail-apreciacao" name="Notificar Cliente (Email)" camunda:type="external" camunda:topic="fidc-precatorio-cessao-tarefa-notificarClienteEmail">
      <bpmn:incoming>caminho_09</bpmn:incoming>
      <bpmn:outgoing>caminho_10</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminho_10" sourceRef="fidc-cessao-commons-tarefa-notificarClienteEmail-apreciacao" targetRef="fidc-cessao-commons-tarefa-realizarImportacaoFromtis" />
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-notificarClienteWebhook-conclusao" name="Notificar Cliente (Webhook)" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-notificarClienteWebhook">
      <bpmn:incoming>caminho_25</bpmn:incoming>
      <bpmn:outgoing>caminho_26</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:boundaryEvent id="fidc-cessao-commons-timer-recuperarDocumentacao" name="Após &#10;30 minutos" cancelActivity="false" attachedToRef="fidc-cessao-commons-tarefa-recuperarDocumentacao">
      <bpmn:outgoing>caminhoPendenciaLastro_01</bpmn:outgoing>
      <bpmn:timerEventDefinition id="TimerEventDefinition_19wea4f">
        <bpmn:timeDuration xsi:type="bpmn:tFormalExpression">PT30M</bpmn:timeDuration>
      </bpmn:timerEventDefinition>
    </bpmn:boundaryEvent>
    <bpmn:endEvent id="fidc.cessao.notificar.pendencia-end">
      <bpmn:incoming>caminhoPendenciaLastro_02</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="caminhoPendenciaLastro_02" sourceRef="fidc-cessao-commons-tarefa-notificarEmail" targetRef="fidc.cessao.notificar.pendencia-end" />
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-notificarClienteArquivo" name="Notificar Cliente (Arquivo)" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-notificarClienteArquivo">
      <bpmn:incoming>caminhoNaoCapturada_01</bpmn:incoming>
      <bpmn:incoming>caminho_23</bpmn:incoming>
      <bpmn:outgoing>caminho_24</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminho_24" sourceRef="fidc-cessao-commons-tarefa-notificarClienteArquivo" targetRef="fidc-precatorio-cessao-tarefa-notificarClienteEmail" />
    <bpmn:sequenceFlow id="caminhoNaoCapturada_01" name="Não Capturada" sourceRef="decisao_01" targetRef="fidc-cessao-commons-tarefa-notificarClienteArquivo">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.naoCapturada}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="caminhoReprovada_01" name="Reprovada" sourceRef="decisao_02" targetRef="fidc-cessao-commons-tarefa-atualizarCessao">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.reprovada}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:serviceTask id="fidc-precatorio-cessao-tarefa-notificarClienteEmail-lastroRecuperado" name="Notificar Cliente (Email)" camunda:type="external" camunda:topic="fidc-precatorio-cessao-tarefa-notificarClienteEmail">
      <bpmn:incoming>caminho_05</bpmn:incoming>
      <bpmn:outgoing>caminho_06</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminho_06" sourceRef="fidc-precatorio-cessao-tarefa-notificarClienteEmail-lastroRecuperado" targetRef="fidc.precatorio.apreciar-operacao" />
    <bpmn:serviceTask id="fidc-cessao-commons-tarefa-notificarEmail-outro" name="Notificar Email (Complemetar)" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-notificarEmail">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:inputParameter name="email">${parametrosBPM.notificacaoPagamentoComplementar}</camunda:inputParameter>
        </camunda:inputOutput>
      </bpmn:extensionElements>
      <bpmn:incoming>caminho_17</bpmn:incoming>
      <bpmn:outgoing>caminho_18</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminho_18" sourceRef="fidc-cessao-commons-tarefa-notificarEmail-outro" targetRef="fidc.precatorio.pagamento-complementar" />
    <bpmn:sequenceFlow id="caminho_23" sourceRef="fidc-cessao-commons-tarefa-atualizarCessao" targetRef="fidc-cessao-commons-tarefa-notificarClienteArquivo" />
    <bpmn:sequenceFlow id="caminho_26" sourceRef="fidc-cessao-commons-tarefa-notificarClienteWebhook-conclusao" targetRef="fidc.cessao.de.direitos.creditorios-end" />
    <bpmn:sequenceFlow id="caminho_25" sourceRef="fidc-precatorio-cessao-tarefa-notificarClienteEmail" targetRef="fidc-cessao-commons-tarefa-notificarClienteWebhook-conclusao" />
    <bpmn:subProcess id="fidc-cessao-commons-transferencia" name="Pagamento da Cessão">
      <bpmn:incoming>caminho_14</bpmn:incoming>
      <bpmn:outgoing>caminho_15</bpmn:outgoing>
      <bpmn:endEvent id="fidc.cessao.pagamento-end">
        <bpmn:incoming>caminhoPagamentoCancelada_01</bpmn:incoming>
        <bpmn:incoming>caminhoPagamento_05</bpmn:incoming>
        <bpmn:incoming>caminhoPagamentoInconsistente_04</bpmn:incoming>
      </bpmn:endEvent>
      <bpmn:serviceTask id="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia" name="Enviar Comprovante de Transferencia" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia" camunda:taskPriority="5">
        <bpmn:incoming>caminhoPagamento_04</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamento_05</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:serviceTask id="fidc-cessao-commons-tarefa-aprovarGestaoTed" name="Aprovar Gestão de TED" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-aprovarGestaoTed" camunda:taskPriority="5">
        <bpmn:incoming>caminhoPagamentoInconsistente_03</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamentoInconsistente_04</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:exclusiveGateway id="decisaoPagamento_02" default="caminhoPagamentoReprocessar_01">
        <bpmn:incoming>caminhoPagamentoInconsistente_02</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamentoCancelada_01</bpmn:outgoing>
        <bpmn:outgoing>caminhoPagamentoReprocessar_01</bpmn:outgoing>
        <bpmn:outgoing>caminhoPagamentoInconsistente_03</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:startEvent id="fidc.cessao.pagamento-start">
        <bpmn:outgoing>caminhoPagamento_01</bpmn:outgoing>
      </bpmn:startEvent>
      <bpmn:userTask id="fidc.liquidacao.analisar-inconsistencia-pagamento" name="Analisar Inconsistência no Pagamento" camunda:candidateGroups="camunda-fidc-liquidacao">
        <bpmn:incoming>caminhoPagamentoInconsistente_01</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamentoInconsistente_02</bpmn:outgoing>
      </bpmn:userTask>
      <bpmn:serviceTask id="fidc-cessao-commons-tarefa-solicitarPagamentos" name="Solicitar Pagamentos (Pagadoria)" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-solicitarPagamentos" camunda:taskPriority="5">
        <bpmn:incoming>caminhoPagamento_01</bpmn:incoming>
        <bpmn:incoming>caminhoPagamentoReprocessar_01</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamento_02</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:exclusiveGateway id="decisaoPagamento_01" default="caminhoPagamento_04">
        <bpmn:incoming>caminhoPagamento_03</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamentoInconsistente_01</bpmn:outgoing>
        <bpmn:outgoing>caminhoPagamento_04</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:serviceTask id="fidc-cessao-commons-tarefa-verificarPagamentos" name="Verificar Pagamentos (Pagadoria)" camunda:type="external" camunda:topic="fidc-cessao-commons-tarefa-verificarPagamentos">
        <bpmn:incoming>caminhoPagamento_02</bpmn:incoming>
        <bpmn:outgoing>caminhoPagamento_03</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:sequenceFlow id="caminhoPagamento_01" sourceRef="fidc.cessao.pagamento-start" targetRef="fidc-cessao-commons-tarefa-solicitarPagamentos" />
      <bpmn:sequenceFlow id="caminhoPagamento_03" sourceRef="fidc-cessao-commons-tarefa-verificarPagamentos" targetRef="decisaoPagamento_01" />
      <bpmn:sequenceFlow id="caminhoPagamentoInconsistente_01" name="Inconsistente" sourceRef="decisaoPagamento_01" targetRef="fidc.liquidacao.analisar-inconsistencia-pagamento">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.inconsistente}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="caminhoPagamentoCancelada_01" name="Cancelada" sourceRef="decisaoPagamento_02" targetRef="fidc.cessao.pagamento-end">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.cancelada}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="caminhoPagamento_02" sourceRef="fidc-cessao-commons-tarefa-solicitarPagamentos" targetRef="fidc-cessao-commons-tarefa-verificarPagamentos" />
      <bpmn:sequenceFlow id="caminhoPagamentoReprocessar_01" name="Reprocessar" sourceRef="decisaoPagamento_02" targetRef="fidc-cessao-commons-tarefa-solicitarPagamentos" />
      <bpmn:sequenceFlow id="caminhoPagamentoInconsistente_02" sourceRef="fidc.liquidacao.analisar-inconsistencia-pagamento" targetRef="decisaoPagamento_02" />
      <bpmn:sequenceFlow id="caminhoPagamentoInconsistente_03" name="Concluída" sourceRef="decisaoPagamento_02" targetRef="fidc-cessao-commons-tarefa-aprovarGestaoTed">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.concuida}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="caminhoPagamento_04" sourceRef="decisaoPagamento_01" targetRef="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia" />
      <bpmn:sequenceFlow id="caminhoPagamentoInconsistente_04" sourceRef="fidc-cessao-commons-tarefa-aprovarGestaoTed" targetRef="fidc.cessao.pagamento-end" />
      <bpmn:sequenceFlow id="caminhoPagamento_05" sourceRef="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia" targetRef="fidc.cessao.pagamento-end" />
    </bpmn:subProcess>
    <bpmn:sequenceFlow id="caminho_15" sourceRef="fidc-cessao-commons-transferencia" targetRef="fidc-cessao-commons-tarefa-recuperarLastroComplementar" />
  </bpmn:process>
  <bpmn:message id="fidc-precatorio-msg-cessaoAprovada" name="fidc-precatorio-msg-cessaoAprovada" />
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="fidc.${fundo.var.acronimo}.cessao-direito-creditorio">
      <bpmndi:BPMNEdge id="Flow_1f665vg_di" bpmnElement="caminho_25">
        <di:waypoint x="4980" y="205" />
        <di:waypoint x="5010" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0tnkyep_di" bpmnElement="caminho_26">
        <di:waypoint x="5110" y="205" />
        <di:waypoint x="5142" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0czsvxb_di" bpmnElement="caminho_23">
        <di:waypoint x="4722" y="205" />
        <di:waypoint x="4750" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_035o9nh_di" bpmnElement="caminho_18">
        <di:waypoint x="3170" y="220" />
        <di:waypoint x="3200" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1re40r0_di" bpmnElement="caminho_06">
        <di:waypoint x="810" y="220" />
        <di:waypoint x="844" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0cnob87_di" bpmnElement="caminhoReprovada_01">
        <di:waypoint x="1141" y="245" />
        <di:waypoint x="1141" y="380" />
        <di:waypoint x="4700" y="380" />
        <di:waypoint x="4700" y="245" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1150" y="358" width="54" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_03ehhpb_di" bpmnElement="caminhoNaoCapturada_01">
        <di:waypoint x="517" y="245" />
        <di:waypoint x="517" y="390" />
        <di:waypoint x="4800" y="390" />
        <di:waypoint x="4800" y="245" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="522" y="369" width="75" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1h2guli_di" bpmnElement="caminho_24">
        <di:waypoint x="4850" y="205" />
        <di:waypoint x="4880" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zrrqqd_di" bpmnElement="caminhoPendenciaLastro_02">
        <di:waypoint x="810" y="319" />
        <di:waypoint x="852" y="319" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1faxb6t_di" bpmnElement="caminho_10">
        <di:waypoint x="1310" y="220" />
        <di:waypoint x="1340" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_00w524i_di" bpmnElement="caminho_14">
        <di:waypoint x="1790" y="220" />
        <di:waypoint x="1822" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1w0gmyi_di" bpmnElement="caminho_21">
        <di:waypoint x="3530" y="220" />
        <di:waypoint x="3590" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ctb9i6_di" bpmnElement="caminhoCancelada_02">
        <di:waypoint x="3360" y="245" />
        <di:waypoint x="3360" y="350" />
        <di:waypoint x="4640" y="350" />
        <di:waypoint x="4640" y="245" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3369" y="332" width="53" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ulbflf_di" bpmnElement="caminho_20">
        <di:waypoint x="3385" y="220" />
        <di:waypoint x="3430" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1tjrndu_di" bpmnElement="caminho_19">
        <di:waypoint x="3300" y="220" />
        <di:waypoint x="3335" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0aprr5o_di" bpmnElement="caminhoConcluida_01">
        <di:waypoint x="3010" y="245" />
        <di:waypoint x="3010" y="360" />
        <di:waypoint x="4660" y="360" />
        <di:waypoint x="4660" y="245" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3019" y="340" width="50" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1vypv3z_di" bpmnElement="caminho_17">
        <di:waypoint x="3035" y="220" />
        <di:waypoint x="3070" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0c1rjtr_di" bpmnElement="caminho_16">
        <di:waypoint x="2950" y="220" />
        <di:waypoint x="2985" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0g0j430_di" bpmnElement="caminho_15">
        <di:waypoint x="2820" y="220" />
        <di:waypoint x="2850" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_01f14yx_di" bpmnElement="caminho_22">
        <di:waypoint x="4588" y="205" />
        <di:waypoint x="4622" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0c2s6ci_di" bpmnElement="caminhoPendenciaLastro_01">
        <di:waypoint x="628" y="278" />
        <di:waypoint x="628" y="319" />
        <di:waypoint x="710" y="319" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1kui8mm_di" bpmnElement="caminho_02">
        <di:waypoint x="320" y="220" />
        <di:waypoint x="356" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0n77cwo_di" bpmnElement="caminho_13">
        <di:waypoint x="1659" y="220" />
        <di:waypoint x="1690" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0m3wirc_di" bpmnElement="caminhoCancelada_01">
        <di:waypoint x="1634" y="245" />
        <di:waypoint x="1634" y="370" />
        <di:waypoint x="4680" y="370" />
        <di:waypoint x="4680" y="245" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1643" y="347" width="53" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12lcaee_di" bpmnElement="caminho_12">
        <di:waypoint x="1570" y="220" />
        <di:waypoint x="1609" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10ywhd0_di" bpmnElement="caminho_08">
        <di:waypoint x="1080" y="220" />
        <di:waypoint x="1116" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_07kavgj_di" bpmnElement="caminho_11">
        <di:waypoint x="1440" y="220" />
        <di:waypoint x="1470" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1qgw6op_di" bpmnElement="caminho_09">
        <di:waypoint x="1166" y="220" />
        <di:waypoint x="1210" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0hnyq9u_di" bpmnElement="caminho_07">
        <di:waypoint x="944" y="220" />
        <di:waypoint x="980" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1jyvm4o_di" bpmnElement="caminho_05">
        <di:waypoint x="678" y="220" />
        <di:waypoint x="710" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1iqnng7_di" bpmnElement="caminho_04" bioc:stroke="">
        <di:waypoint x="542" y="220" />
        <di:waypoint x="578" y="220" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="394" y="212" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1cmrk4c_di" bpmnElement="caminho_03">
        <di:waypoint x="456" y="220" />
        <di:waypoint x="492" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0uy1cn2_di" bpmnElement="caminho_01">
        <di:waypoint x="178" y="220" />
        <di:waypoint x="220" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1ndkix2_di" bpmnElement="fidc.cessao.de.direitos.creditorios-start">
        <dc:Bounds x="142" y="202" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0d0tfg5_di" bpmnElement="fidc.${fundo.var.acronimo}.configuracao">
        <dc:Bounds x="220" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ia86b5_di" bpmnElement="fidc-precatorio-cessao-tarefa-recuperarFicha">
        <dc:Bounds x="356" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0ibdq93_di" bpmnElement="decisao_01" isMarkerVisible="true">
        <dc:Bounds x="492" y="195" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0x58q3z_di" bpmnElement="fidc-cessao-commons-tarefa-recuperarDocumentacao">
        <dc:Bounds x="578" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_01u5e4m_di" bpmnElement="fidc-cessao-commons-tarefa-notificarEmail">
        <dc:Bounds x="710" y="279" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1uoqbnt_di" bpmnElement="fidc-precatorio-cessao-tarefa-notificarClienteEmail-lastroRecuperado">
        <dc:Bounds x="710" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1vbx5l4_di" bpmnElement="fidc.precatorio.apreciar-operacao">
        <dc:Bounds x="844" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0xi5u5b_di" bpmnElement="fidc.cessao.notificar.pendencia-end">
        <dc:Bounds x="852" y="301" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0qisg0e_di" bpmnElement="fidc-cessao-commons-tarefa-registrarDeliberacao">
        <dc:Bounds x="980" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0fy0mny_di" bpmnElement="fidc.cessao.de.direitos.creditorios-end">
        <dc:Bounds x="5142" y="187" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1teqcys_di" bpmnElement="fidc-cessao-commons-tarefa-realizarImportacaoFromtis">
        <dc:Bounds x="1340" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1iphd5m_di" bpmnElement="decisao_02" isMarkerVisible="true">
        <dc:Bounds x="1116" y="195" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1uw8meq_di" bpmnElement="fidc-cessao-commons-tarefa-aguardarTramiteFromtis">
        <dc:Bounds x="1470" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0cenomt_di" bpmnElement="fidc-cessao-commons-tarefa-atualizarCessao">
        <dc:Bounds x="4622" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1lnb9po_di" bpmnElement="decisao_03" isMarkerVisible="true">
        <dc:Bounds x="1609" y="195" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1l1hy7i_di" bpmnElement="fidc-precatorio-cessao-tarefa-notificarClienteEmail">
        <dc:Bounds x="4880" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_11nhhy9_di" bpmnElement="fidc.precatorio.pagamento-complementar">
        <dc:Bounds x="3200" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1cw1ch8_di" bpmnElement="fidc-cessao-commons-tarefa-recuperarLastroComplementar">
        <dc:Bounds x="2850" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0r5w4au_di" bpmnElement="decisao_04" isMarkerVisible="true">
        <dc:Bounds x="2985" y="195" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_19ect92_di" bpmnElement="decisao_05" isMarkerVisible="true">
        <dc:Bounds x="3335" y="195" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0xyp3au_di" bpmnElement="fidc-cessao-commons-tarefa-notificarClienteEmail-liquidacao">
        <dc:Bounds x="3430" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0msm4cg_di" bpmnElement="fidc-cessao-commons-tarefa-notificarClienteEmail-fromtis">
        <dc:Bounds x="1690" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0vx8ajk_di" bpmnElement="fidc-cessao-commons-tarefa-notificarClienteEmail-apreciacao">
        <dc:Bounds x="1210" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0phvbpf_di" bpmnElement="fidc-cessao-commons-tarefa-notificarClienteWebhook-conclusao">
        <dc:Bounds x="5010" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0zyh5y4_di" bpmnElement="fidc-cessao-commons-tarefa-notificarClienteArquivo">
        <dc:Bounds x="4750" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1jnjtpv_di" bpmnElement="fidc-cessao-commons-tarefa-notificarEmail-outro">
        <dc:Bounds x="3070" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0in8cr4_di" bpmnElement="fidc-cessao-commons-transferencia" isExpanded="true">
        <dc:Bounds x="1822" y="110" width="998" height="249" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0w4wkj5_di" bpmnElement="caminhoPagamentoInconsistente_04">
        <di:waypoint x="2567" y="220" />
        <di:waypoint x="2622" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0bimsfu_di" bpmnElement="caminhoPagamento_02">
        <di:waypoint x="2030" y="220" />
        <di:waypoint x="2067" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0n1s9g8_di" bpmnElement="caminhoPagamento_05">
        <di:waypoint x="2700" y="220" />
        <di:waypoint x="2658" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_07o4o8l_di" bpmnElement="caminhoPagamentoInconsistente_03">
        <di:waypoint x="2392" y="220" />
        <di:waypoint x="2467" y="220" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2401" y="202" width="50" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_163te5h_di" bpmnElement="caminhoPagamentoCancelada_01">
        <di:waypoint x="2367" y="245" />
        <di:waypoint x="2367" y="300" />
        <di:waypoint x="2640" y="300" />
        <di:waypoint x="2640" y="238" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2375" y="281" width="53" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0fpjb3f_di" bpmnElement="caminhoPagamentoReprocessar_01">
        <di:waypoint x="2367" y="195" />
        <di:waypoint x="2367" y="160" />
        <di:waypoint x="1980" y="160" />
        <di:waypoint x="1980" y="180" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2295" y="163" width="64" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0xcsfz3_di" bpmnElement="caminhoPagamentoInconsistente_02">
        <di:waypoint x="2302" y="220" />
        <di:waypoint x="2342" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0wp69ss_di" bpmnElement="caminhoPagamentoInconsistente_01">
        <di:waypoint x="2252" y="289" />
        <di:waypoint x="2252" y="260" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2260" y="274" width="65" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_108rrz8_di" bpmnElement="caminhoPagamento_04">
        <di:waypoint x="2277" y="314" />
        <di:waypoint x="2750" y="314" />
        <di:waypoint x="2750" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_07orpwr_di" bpmnElement="caminhoPagamento_03">
        <di:waypoint x="2117" y="260" />
        <di:waypoint x="2117" y="314" />
        <di:waypoint x="2227" y="314" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1k0f89i_di" bpmnElement="caminhoPagamento_01">
        <di:waypoint x="1878" y="220" />
        <di:waypoint x="1930" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_08qsc1s_di" bpmnElement="fidc.cessao.pagamento-start">
        <dc:Bounds x="1842" y="202" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0ybm4k5_di" bpmnElement="decisaoPagamento_01" isMarkerVisible="true">
        <dc:Bounds x="2227" y="289" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0s61yc6_di" bpmnElement="decisaoPagamento_02" isMarkerVisible="true">
        <dc:Bounds x="2342" y="195" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1xfutzj_di" bpmnElement="fidc.cessao.pagamento-end">
        <dc:Bounds x="2622" y="202" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0moe9r5_di" bpmnElement="fidc.liquidacao.analisar-inconsistencia-pagamento">
        <dc:Bounds x="2202" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0597sw9_di" bpmnElement="fidc-cessao-commons-tarefa-solicitarPagamentos">
        <dc:Bounds x="1930" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1mqicqj_di" bpmnElement="fidc-cessao-commons-tarefa-verificarPagamentos">
        <dc:Bounds x="2067" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_183wfba_di" bpmnElement="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia">
        <dc:Bounds x="2700" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1ifs3qv_di" bpmnElement="fidc-cessao-commons-tarefa-aprovarGestaoTed">
        <dc:Bounds x="2467" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_03rbjku_di" bpmnElement="Activity_03rbjku" isExpanded="true">
        <dc:Bounds x="3590" y="95" width="998" height="249" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1wmiur8_di" bpmnElement="caminhoPagamento_06">
        <di:waypoint x="3646" y="205" />
        <di:waypoint x="3698" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1do1ogq_di" bpmnElement="caminhoPagamento_08">
        <di:waypoint x="3885" y="245" />
        <di:waypoint x="3885" y="299" />
        <di:waypoint x="3995" y="299" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1opn461_di" bpmnElement="caminhoPagamento_09">
        <di:waypoint x="4045" y="299" />
        <di:waypoint x="4518" y="299" />
        <di:waypoint x="4518" y="245" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ktc3z7_di" bpmnElement="caminhoPagamentoInconsistente_05">
        <di:waypoint x="4020" y="274" />
        <di:waypoint x="4020" y="245" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="4029" y="259" width="65" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_07m2dv5_di" bpmnElement="caminhoPagamentoInconsistente_06">
        <di:waypoint x="4070" y="205" />
        <di:waypoint x="4110" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0w4wrb5_di" bpmnElement="caminhoPagamentoReprocessar_02">
        <di:waypoint x="4135" y="180" />
        <di:waypoint x="4135" y="145" />
        <di:waypoint x="3748" y="145" />
        <di:waypoint x="3748" y="165" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="4063" y="148" width="64" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1xjrqm4_di" bpmnElement="Flow_1xjrqm4">
        <di:waypoint x="4135" y="230" />
        <di:waypoint x="4135" y="285" />
        <di:waypoint x="4408" y="285" />
        <di:waypoint x="4408" y="223" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="4143" y="266" width="53" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0j7yy74_di" bpmnElement="caminhoPagamentoInconsistente_07">
        <di:waypoint x="4160" y="205" />
        <di:waypoint x="4235" y="205" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="4169" y="187" width="50" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1dzence_di" bpmnElement="caminhoPagamento_10">
        <di:waypoint x="4468" y="205" />
        <di:waypoint x="4426" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0eq6155_di" bpmnElement="caminhoPagamento_07">
        <di:waypoint x="3798" y="205" />
        <di:waypoint x="3835" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1uxerwn_di" bpmnElement="caminhoPagamentoInconsistente_08">
        <di:waypoint x="4335" y="205" />
        <di:waypoint x="4390" y="205" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1bexwof_di" bpmnElement="fidc.cessao.pagamento-start.complementar">
        <dc:Bounds x="3610" y="187" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0e8tvpq_di" bpmnElement="decisaoPagamento_03" isMarkerVisible="true">
        <dc:Bounds x="3995" y="274" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1ywvyp2_di" bpmnElement="decisaoPagamento_04" isMarkerVisible="true">
        <dc:Bounds x="4110" y="180" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_05lxbgb_di" bpmnElement="fidc.cessao.pagamento-end.complementar">
        <dc:Bounds x="4390" y="187" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_19xfoj0_di" bpmnElement="fidc.liquidacao.analisar-inconsistencia-pagamento-complementar">
        <dc:Bounds x="3970" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0h7cs5k_di" bpmnElement="fidc-cessao-commons-tarefa-solicitarPagamentoComplementar">
        <dc:Bounds x="3698" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0p49k0a_di" bpmnElement="fidc-cessao-commons-tarefa-verificarPagamentoComplementar">
        <dc:Bounds x="3835" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1cxmn4e_di" bpmnElement="fidc-cessao-commons-tarefa-enviarComprovanteTransferencia-complementar">
        <dc:Bounds x="4468" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_167eajf_di" bpmnElement="fidc-cessao-commons-tarefa-aprovarGestaoTed-complementar">
        <dc:Bounds x="4235" y="165" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_029r6ge_di" bpmnElement="fidc-cessao-commons-timer-recuperarDocumentacao">
        <dc:Bounds x="610" y="242" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="636" y="286" width="55" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>

`;
}
