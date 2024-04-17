import {configEsteira, parametroBaixa, parametrosValidacao} from '../utils/parametros';

export function templateBaixaPrecatorio(config: configEsteira) {

    const fundo = config.fundo;
    const parametrosBPM = parametroBaixa
    const validarBPM = parametrosValidacao

    const idFormatada = fundo.identificacao.toString().replace(/\D/g, '').padStart(14, '0')

    const nomeBPM = `${fundo.tipo} ${(fundo.nome.replace(/[^a-zA-Z]/g, ' ')).toUpperCase()}`;

    const varsCNAB = `$\{S('{"fundo": {"identificacao": ${idFormatada}, "nome": "${fundo.tipo} ${fundo.nome.toUpperCase()}"}}')}`

    return `
    <?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_15ak26e" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.9.0" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.15.0">
      <bpmn:process id="fidc.${fundo.var.acronimo}.liquidacao-recebiveis" name="[ ${nomeBPM} ] Liquidação de Recebíveis" isExecutable="true" camunda:versionTag="1.0.1">
        <bpmn:startEvent id="startEvent">
          <bpmn:outgoing>caminho_01</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:endEvent id="endEvent">
          <bpmn:incoming>caminho_08</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:serviceTask id="fidc-precatorio-cessao-tarefa-recuperarFicha" name="Recuperar Ficha de Cessão" camunda:type="external" camunda:topic="fidc-precatorio-cessao-tarefa-recuperarFicha" camunda:taskPriority="5">
          <bpmn:incoming>caminho_02</bpmn:incoming>
          <bpmn:outgoing>caminho_03</bpmn:outgoing>
        </bpmn:serviceTask>
        <bpmn:serviceTask id="fidc-liquidacao-commons-tarefa-realizarImportacaoFromtis" name="Realizar Importação no Fromtis" camunda:type="external" camunda:topic="fidc-liquidacao-commons-tarefa-realizarImportacaoFromtis" camunda:taskPriority="5">
          <bpmn:incoming>caminho_04</bpmn:incoming>
          <bpmn:outgoing>caminho_05</bpmn:outgoing>
        </bpmn:serviceTask>
        <bpmn:exclusiveGateway id="decisao_01" default="caminho_04">
          <bpmn:incoming>caminho_03</bpmn:incoming>
          <bpmn:outgoing>caminho_04</bpmn:outgoing>
          <bpmn:outgoing>caminhoReprovada_01</bpmn:outgoing>
        </bpmn:exclusiveGateway>
        <bpmn:serviceTask id="fidc-liquidacao-commons-tarefa-aguardarTramiteFromtis" name="Aguardar Tramite do Fromtis" camunda:type="external" camunda:topic="fidc-liquidacao-commons-tarefa-aguardarTramiteFromtis" camunda:taskPriority="0">
          <bpmn:incoming>caminho_05</bpmn:incoming>
          <bpmn:outgoing>caminho_06</bpmn:outgoing>
        </bpmn:serviceTask>
        <bpmn:serviceTask id="fidc-liquidacao-commons-tarefa-notificarClienteArquivo" name="Notificar Cliente (Arquivo)" camunda:type="external" camunda:topic="fidc-liquidacao-commons-tarefa-notificarClienteArquivo" camunda:taskPriority="3">
          <bpmn:incoming>caminhoReprovada_01</bpmn:incoming>
          <bpmn:incoming>caminho_06</bpmn:incoming>
          <bpmn:outgoing>caminho_07</bpmn:outgoing>
        </bpmn:serviceTask>
        <bpmn:serviceTask id="fidc-liquidacao-commons-tarefa-notificarClienteEmail" name="Notificar Cliente (Email)" camunda:type="external" camunda:topic="fidc-liquidacao-commons-tarefa-notificarClienteEmail" camunda:taskPriority="3">
          <bpmn:incoming>caminho_07</bpmn:incoming>
          <bpmn:outgoing>caminho_08</bpmn:outgoing>
        </bpmn:serviceTask>
        <bpmn:task id="fidc.${fundo.var.acronimo}.configuracao" name="Configuração">
          <bpmn:extensionElements>
            <camunda:inputOutput>
              <camunda:outputParameter name="acronimo">${fundo.var.acronimo}</camunda:outputParameter>
              <camunda:outputParameter name="identificacaoFundo">${idFormatada}</camunda:outputParameter>
              <camunda:outputParameter name="emails">${fundo.var.email.tarefaPadrao}</camunda:outputParameter>
              <camunda:outputParameter name="original">${parametrosBPM.varOriginal}</camunda:outputParameter>
              <camunda:outputParameter name="saida">${fundo.var.sftpOutput}</camunda:outputParameter>
              <camunda:outputParameter name="schema">${parametrosBPM.schemas.entrada.precatorio}</camunda:outputParameter>
              <camunda:outputParameter name="schemaRetorno">${parametrosBPM.schemas.saida.precatorio}</camunda:outputParameter>
              <camunda:outputParameter name="vars">${varsCNAB}</camunda:outputParameter>
            </camunda:inputOutput>
          </bpmn:extensionElements>
          <bpmn:incoming>caminho_01</bpmn:incoming>
          <bpmn:outgoing>caminho_02</bpmn:outgoing>
        </bpmn:task>
        <bpmn:sequenceFlow id="caminho_01" sourceRef="startEvent" targetRef="fidc.${fundo.var.acronimo}.configuracao" />
        <bpmn:sequenceFlow id="caminho_08" sourceRef="fidc-liquidacao-commons-tarefa-notificarClienteEmail" targetRef="endEvent" />
        <bpmn:sequenceFlow id="caminho_03" sourceRef="fidc-precatorio-cessao-tarefa-recuperarFicha" targetRef="decisao_01" />
        <bpmn:sequenceFlow id="caminho_04" sourceRef="decisao_01" targetRef="fidc-liquidacao-commons-tarefa-realizarImportacaoFromtis" />
        <bpmn:sequenceFlow id="caminho_05" sourceRef="fidc-liquidacao-commons-tarefa-realizarImportacaoFromtis" targetRef="fidc-liquidacao-commons-tarefa-aguardarTramiteFromtis" />
        <bpmn:sequenceFlow id="caminhoReprovada_01" name="Reprovada" sourceRef="decisao_01" targetRef="fidc-liquidacao-commons-tarefa-notificarClienteArquivo">
          <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${validarBPM.status.naoCapturada}</bpmn:conditionExpression>
        </bpmn:sequenceFlow>
        <bpmn:sequenceFlow id="caminho_06" sourceRef="fidc-liquidacao-commons-tarefa-aguardarTramiteFromtis" targetRef="fidc-liquidacao-commons-tarefa-notificarClienteArquivo" />
        <bpmn:sequenceFlow id="caminho_07" sourceRef="fidc-liquidacao-commons-tarefa-notificarClienteArquivo" targetRef="fidc-liquidacao-commons-tarefa-notificarClienteEmail" />
        <bpmn:sequenceFlow id="caminho_02" sourceRef="fidc.${fundo.var.acronimo}.configuracao" targetRef="fidc-precatorio-cessao-tarefa-recuperarFicha" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="fidc.${fundo.var.acronimo}.liquidacao-recebiveis">
          <bpmndi:BPMNEdge id="Flow_11cdset_di" bpmnElement="caminho_02">
            <di:waypoint x="340" y="120" />
            <di:waypoint x="370" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0hrteyz_di" bpmnElement="caminho_07">
            <di:waypoint x="942" y="120" />
            <di:waypoint x="970" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_15e0he4_di" bpmnElement="caminho_06">
            <di:waypoint x="820" y="120" />
            <di:waypoint x="842" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_185f2uz_di" bpmnElement="caminhoReprovada_01">
            <di:waypoint x="530" y="145" />
            <di:waypoint x="530" y="210" />
            <di:waypoint x="892" y="210" />
            <di:waypoint x="892" y="160" />
            <bpmndi:BPMNLabel>
              <dc:Bounds x="537" y="191" width="54" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_07yqvtb_di" bpmnElement="caminho_05">
            <di:waypoint x="690" y="120" />
            <di:waypoint x="720" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1kfdxoz_di" bpmnElement="caminho_04">
            <di:waypoint x="555" y="120" />
            <di:waypoint x="590" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0ge0tan_di" bpmnElement="caminho_03">
            <di:waypoint x="470" y="120" />
            <di:waypoint x="505" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1rod2tl_di" bpmnElement="caminho_08">
            <di:waypoint x="1070" y="120" />
            <di:waypoint x="1102" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0nfgusl_di" bpmnElement="caminho_01">
            <di:waypoint x="208" y="120" />
            <di:waypoint x="240" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="Event_1qbce3f_di" bpmnElement="startEvent">
            <dc:Bounds x="172" y="102" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_1eof1ob_di" bpmnElement="endEvent">
            <dc:Bounds x="1102" y="102" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0rcecd4_di" bpmnElement="fidc-precatorio-cessao-tarefa-recuperarFicha">
            <dc:Bounds x="370" y="80" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_053tvch_di" bpmnElement="fidc-liquidacao-commons-tarefa-realizarImportacaoFromtis">
            <dc:Bounds x="590" y="80" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Gateway_0k3926x_di" bpmnElement="decisao_01" isMarkerVisible="true">
            <dc:Bounds x="505" y="95" width="50" height="50" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0eq8oep_di" bpmnElement="fidc-liquidacao-commons-tarefa-aguardarTramiteFromtis">
            <dc:Bounds x="720" y="80" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_1rfz7va_di" bpmnElement="fidc-liquidacao-commons-tarefa-notificarClienteArquivo">
            <dc:Bounds x="842" y="80" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_181qan6_di" bpmnElement="fidc-liquidacao-commons-tarefa-notificarClienteEmail">
            <dc:Bounds x="970" y="80" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_02s7gq2_di" bpmnElement="fidc.${fundo.var.acronimo}.configuracao">
            <dc:Bounds x="240" y="80" width="100" height="80" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>    

`;
}
