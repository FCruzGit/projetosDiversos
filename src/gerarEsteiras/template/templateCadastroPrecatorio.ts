import {configEsteira, parametroBaixa, parametrosValidacao} from '../utils/parametros';

export function templateBaixaPrecatorio(config: configEsteira) {

    const fundo = config.fundo;
    const parametrosBPM = parametroBaixa
    const validarBPM = parametrosValidacao

    const idFormatada = fundo.identificacao.toString().replace(/\D/g, '').padStart(14, '0')

    const varsCNAB = `$\{S('{"fundo": {"identificacao": ${idFormatada}, "nome": "${fundo.tipo} ${fundo.nome.toUpperCase()}"}}')}`

    return `
    <?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_1jm8m56" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.9.0">
  <bpmn:process id="cadun.fuel.cadastro-cedentes" name="[ FIDC FUEL ] Cadastro de Cedente" isExecutable="true" camunda:versionTag="1.0.1" camunda:isStartableInTasklist="false">
    <bpmn:startEvent id="cadun.cadastrar-cedentes-start">
      <bpmn:outgoing>caminho_01</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-recuperarFicha" name="Recuperar Ficha de Cadastro de Cedentes" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-recuperarFicha">
      <bpmn:incoming>caminho_02</bpmn:incoming>
      <bpmn:outgoing>caminho_03</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:subProcess id="cadun.processar-cadastro-cedente" name="Processar Cadastro de Cendente">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:inputParameter name="cadastro">
            <camunda:script scriptFormat="javascript">S(cadastros).elements()[loopCounter]</camunda:script>
          </camunda:inputParameter>
          <camunda:inputParameter name="reputacao">
            <camunda:script scriptFormat="javascript">S('{}')</camunda:script>
          </camunda:inputParameter>
          <camunda:inputParameter name="documentos">
            <camunda:script scriptFormat="javascript">S('[]')</camunda:script>
          </camunda:inputParameter>
        </camunda:inputOutput>
      </bpmn:extensionElements>
      <bpmn:incoming>caminho_04</bpmn:incoming>
      <bpmn:outgoing>caminho_05</bpmn:outgoing>
      <bpmn:multiInstanceLoopCharacteristics camunda:collection="${S(cadastros).elements()}" />
      <bpmn:startEvent id="cadun.processar-cadastro-cendente-start">
        <bpmn:outgoing>caminhoAnalise_01</bpmn:outgoing>
      </bpmn:startEvent>
      <bpmn:subProcess id="cadun.analisar-reputacao" name="Analisar Reputação (KN1)">
        <bpmn:incoming>caminhoAnalise_03</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_04</bpmn:outgoing>
        <bpmn:startEvent id="cadun.analisar-reputacao-start">
          <bpmn:outgoing>analiseReputacao_01</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:endEvent id="cadun.analisar-reputacao-end">
          <bpmn:incoming>analiseReputacao_03</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-solicitarDossie" name="Solicitar Dossie de Reputação" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-solicitarDossie">
          <bpmn:incoming>analiseReputacao_01</bpmn:incoming>
          <bpmn:outgoing>analiseReputacao_02</bpmn:outgoing>
        </bpmn:serviceTask>
        <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-consultarDossie" name="Recuperar Dossie de Reputação" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-consultarDossie">
          <bpmn:incoming>analiseReputacao_02</bpmn:incoming>
          <bpmn:outgoing>analiseReputacao_03</bpmn:outgoing>
        </bpmn:serviceTask>
        <bpmn:sequenceFlow id="analiseReputacao_01" sourceRef="cadun.analisar-reputacao-start" targetRef="cadun-cadastro-cedente-tarefa-solicitarDossie" />
        <bpmn:sequenceFlow id="analiseReputacao_02" sourceRef="cadun-cadastro-cedente-tarefa-solicitarDossie" targetRef="cadun-cadastro-cedente-tarefa-consultarDossie" />
        <bpmn:sequenceFlow id="analiseReputacao_03" sourceRef="cadun-cadastro-cedente-tarefa-consultarDossie" targetRef="cadun.analisar-reputacao-end" />
      </bpmn:subProcess>
      <bpmn:sequenceFlow id="caminhoAnalise_01" sourceRef="cadun.processar-cadastro-cendente-start" targetRef="Gateway_1obvtsn" />
      <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-registrarCadastro" name="Registrar Cadastro Cedente" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-registrarCadastro">
        <bpmn:incoming>Flow_11mkmbz</bpmn:incoming>
        <bpmn:incoming>caminhoAnalise_07</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_08</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:endEvent id="cadun.processar-cadastro-cendente-end">
        <bpmn:incoming>caminhoAnalise_12</bpmn:incoming>
        <bpmn:incoming>caminhoDuplicado_01</bpmn:incoming>
      </bpmn:endEvent>
      <bpmn:sequenceFlow id="caminhoAnalise_03" sourceRef="cadun.fork.reputacao" targetRef="cadun.analisar-reputacao" />
      <bpmn:parallelGateway id="cadun.fork.reputacao">
        <bpmn:incoming>caminhoAnalise_02</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_03</bpmn:outgoing>
        <bpmn:outgoing>Flow_0pdynz8</bpmn:outgoing>
      </bpmn:parallelGateway>
      <bpmn:sequenceFlow id="Flow_0pdynz8" sourceRef="cadun.fork.reputacao" targetRef="cadun-cadastro-pessoa-tarefa-recuperarDocumentacao" />
      <bpmn:parallelGateway id="cadun.join.reputacao">
        <bpmn:incoming>Flow_17sjy1o</bpmn:incoming>
        <bpmn:incoming>caminhoAnalise_04</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_05</bpmn:outgoing>
      </bpmn:parallelGateway>
      <bpmn:sequenceFlow id="Flow_17sjy1o" sourceRef="cadun-cadastro-pessoa-tarefa-recuperarDocumentacao" targetRef="cadun.join.reputacao" />
      <bpmn:serviceTask id="cadun-cadastro-pessoa-tarefa-recuperarDocumentacao" name="Recuperar Documentação de Cadastro" camunda:type="external" camunda:topic="cadun-cadastro-pessoa-tarefa-recuperarDocumentacao">
        <bpmn:incoming>Flow_0pdynz8</bpmn:incoming>
        <bpmn:outgoing>Flow_17sjy1o</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-notificarCadastroArquivo" name="Notificar Cadastro de Cedentes (Arquivo)" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-notificarCadastroArquivo">
        <bpmn:incoming>caminhoReprovadoAnalise_01</bpmn:incoming>
        <bpmn:incoming>Flow_111hkt2</bpmn:incoming>
        <bpmn:incoming>caminhoAnalise_09</bpmn:incoming>
        <bpmn:incoming>caminhoBaixoRisco_01</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_10</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:sequenceFlow id="caminhoAnalise_10" sourceRef="cadun-cadastro-cedente-tarefa-notificarCadastroArquivo" targetRef="cadun-cadastro-cedente-tarefa-notificarCadastroEmail" />
      <bpmn:exclusiveGateway id="Gateway_1obvtsn" default="caminhoReprovadoAnalise_01">
        <bpmn:incoming>caminhoAnalise_01</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_02</bpmn:outgoing>
        <bpmn:outgoing>caminhoReprovadoAnalise_01</bpmn:outgoing>
        <bpmn:outgoing>caminhoAprovadoAnalise_01</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:sequenceFlow id="caminhoAnalise_02" name="Análise" sourceRef="Gateway_1obvtsn" targetRef="cadun.fork.reputacao">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${S(cadastro).prop("resultado").prop("codigo").stringValue() == "ANALISE"}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="caminhoAnalise_04" sourceRef="cadun.analisar-reputacao" targetRef="cadun.join.reputacao" />
      <bpmn:sequenceFlow id="caminhoReprovadoAnalise_01" name="Reprovado ou Duplicado" sourceRef="Gateway_1obvtsn" targetRef="cadun-cadastro-cedente-tarefa-notificarCadastroArquivo" />
      <bpmn:sequenceFlow id="caminhoAnalise_08" sourceRef="cadun-cadastro-cedente-tarefa-registrarCadastro" targetRef="Gateway_1p5uiji" />
      <bpmn:sequenceFlow id="caminhoAprovadoAnalise_01" name="Aprovado" sourceRef="Gateway_1obvtsn" targetRef="cadun-cadastro-pessoa-tarefa-recuperarDocumentacaoAprovado">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${S(cadastro).prop("resultado").prop("codigo").stringValue() == "APROVADO"}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:serviceTask id="cadun-cadastro-pessoa-tarefa-recuperarDocumentacaoAprovado" name="Atualizar&#10;Documentação&#10;de Cadastro" camunda:type="external" camunda:topic="cadun-cadastro-pessoa-tarefa-recuperarDocumentacao">
        <bpmn:incoming>caminhoAprovadoAnalise_01</bpmn:incoming>
        <bpmn:outgoing>Flow_111hkt2</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:sequenceFlow id="Flow_111hkt2" sourceRef="cadun-cadastro-pessoa-tarefa-recuperarDocumentacaoAprovado" targetRef="cadun-cadastro-cedente-tarefa-notificarCadastroArquivo" />
      <bpmn:sequenceFlow id="caminhoAnalise_07" sourceRef="cadun.cadastro.aprovar-dossie" targetRef="cadun-cadastro-cedente-tarefa-registrarCadastro" />
      <bpmn:sequenceFlow id="caminhoAnalise_05" sourceRef="cadun.join.reputacao" targetRef="Gateway_0w1vveb" />
      <bpmn:userTask id="cadun.cadastro.aprovar-dossie" name="Aprovar Cadastro de Cedente" camunda:candidateGroups="camunda-compliance">
        <bpmn:incoming>caminhoAnalise_06</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_07</bpmn:outgoing>
      </bpmn:userTask>
      <bpmn:userTask id="cadun.cadastro.dossie-pendente" name="Cadastro de Cedente Pendente" camunda:candidateGroups="camunda-compliance">
        <bpmn:incoming>Flow_023i7ya</bpmn:incoming>
        <bpmn:outgoing>Flow_11mkmbz</bpmn:outgoing>
      </bpmn:userTask>
      <bpmn:sequenceFlow id="Flow_11mkmbz" sourceRef="cadun.cadastro.dossie-pendente" targetRef="cadun-cadastro-cedente-tarefa-registrarCadastro" />
      <bpmn:exclusiveGateway id="Gateway_1p5uiji" default="caminhoAnalise_09">
        <bpmn:incoming>caminhoAnalise_08</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_09</bpmn:outgoing>
        <bpmn:outgoing>Flow_023i7ya</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:sequenceFlow id="caminhoAnalise_09" sourceRef="Gateway_1p5uiji" targetRef="cadun-cadastro-cedente-tarefa-notificarCadastroArquivo" />
      <bpmn:sequenceFlow id="Flow_023i7ya" name="Pendente" sourceRef="Gateway_1p5uiji" targetRef="cadun.cadastro.dossie-pendente">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${S(cadastro).prop("resultado").prop("codigo").stringValue() == "PENDENTE"}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-notificarCadastroWebhook" name="Notificar Cadatro de Cedentes (Webhook)" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-notificarCadastroWebhook">
        <bpmn:incoming>caminhoAnalise_11</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_12</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:sequenceFlow id="caminhoAnalise_12" sourceRef="cadun-cadastro-cedente-tarefa-notificarCadastroWebhook" targetRef="cadun.processar-cadastro-cendente-end" />
      <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-notificarCadastroEmail" name="Notificar Cadastro de Cedentes (Email)" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-notificarCadastroEmail">
        <bpmn:incoming>caminhoAnalise_10</bpmn:incoming>
        <bpmn:outgoing>analise_10</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:sequenceFlow id="analise_10" sourceRef="cadun-cadastro-cedente-tarefa-notificarCadastroEmail" targetRef="Gateway_0dkpgw6" />
      <bpmn:exclusiveGateway id="Gateway_0dkpgw6" default="caminhoAnalise_11">
        <bpmn:incoming>analise_10</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_11</bpmn:outgoing>
        <bpmn:outgoing>caminhoDuplicado_01</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:sequenceFlow id="caminhoAnalise_11" sourceRef="Gateway_0dkpgw6" targetRef="cadun-cadastro-cedente-tarefa-notificarCadastroWebhook" />
      <bpmn:sequenceFlow id="caminhoDuplicado_01" name="Duplicado" sourceRef="Gateway_0dkpgw6" targetRef="cadun.processar-cadastro-cendente-end">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${S(resultado).prop("codigo").stringValue() == "DUPLICADA"}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:exclusiveGateway id="Gateway_0w1vveb">
        <bpmn:incoming>caminhoAnalise_05</bpmn:incoming>
        <bpmn:outgoing>caminhoAnalise_06</bpmn:outgoing>
        <bpmn:outgoing>caminhoBaixoRisco_01</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:sequenceFlow id="caminhoAnalise_06" sourceRef="Gateway_0w1vveb" targetRef="cadun.cadastro.aprovar-dossie" />
      <bpmn:sequenceFlow id="caminhoBaixoRisco_01" name="Aprovado &#10;Baixo risco" sourceRef="Gateway_0w1vveb" targetRef="cadun-cadastro-cedente-tarefa-notificarCadastroArquivo">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${S(cadastro).prop("resultado").prop("codigo").stringValue() == "APROVADO"}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
    </bpmn:subProcess>
    <bpmn:endEvent id="cadun.cadastrar-cedentes-end">
      <bpmn:incoming>caminhoInconsistente_03</bpmn:incoming>
      <bpmn:incoming>caminho_05</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-notificarInconsistencia" name="&#10;Notificar Inconsistência &#10;(Arquivo)&#10;" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-notificarInconsistencia">
      <bpmn:incoming>caminhoInconsistente_01</bpmn:incoming>
      <bpmn:outgoing>caminhoInconsistente_02</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="caminhoInconsistente_02" sourceRef="cadun-cadastro-cedente-tarefa-notificarInconsistencia" targetRef="cadun-cadastro-cedente-tarefa-notificarInconsistenciaEmail" />
    <bpmn:sequenceFlow id="caminho_03" sourceRef="cadun-cadastro-cedente-tarefa-recuperarFicha" targetRef="Gateway_1rwe9m7" />
    <bpmn:sequenceFlow id="caminhoInconsistente_03" sourceRef="cadun-cadastro-cedente-tarefa-notificarInconsistenciaEmail" targetRef="cadun.cadastrar-cedentes-end" />
    <bpmn:serviceTask id="cadun-cadastro-cedente-tarefa-notificarInconsistenciaEmail" name="Notificar Inconsistência &#10;(Email)" camunda:type="external" camunda:topic="cadun-cadastro-cedente-tarefa-notificarInconsistenciaEmail">
      <bpmn:incoming>caminhoInconsistente_02</bpmn:incoming>
      <bpmn:outgoing>caminhoInconsistente_03</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_1rwe9m7" default="caminho_04">
      <bpmn:incoming>caminho_03</bpmn:incoming>
      <bpmn:outgoing>caminho_04</bpmn:outgoing>
      <bpmn:outgoing>caminhoInconsistente_01</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="caminho_04" sourceRef="Gateway_1rwe9m7" targetRef="cadun.processar-cadastro-cedente" />
    <bpmn:sequenceFlow id="caminhoInconsistente_01" name="Arquivo Inconsistente" sourceRef="Gateway_1rwe9m7" targetRef="cadun-cadastro-cedente-tarefa-notificarInconsistencia">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${S(resultado).prop("codigo").stringValue() != "VALIDO"}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:task id="cadun-cadastro-cedente-script-config" name="Configuração">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:outputParameter name="acronimo">radix</camunda:outputParameter>
          <camunda:outputParameter name="identificacaoFundo">37511729000132</camunda:outputParameter>
          <camunda:outputParameter name="schema">https://schemas.brltrust.com.br/json/cadun/v1.2/pessoa.schema.json#/definitions/pessoa</camunda:outputParameter>
          <camunda:outputParameter name="papel">CEDENTE</camunda:outputParameter>
          <camunda:outputParameter name="emails">brlflow@mg.brltrust.com.br, gabriel.storalli@radixportfolio.com.br</camunda:outputParameter>
          <camunda:outputParameter name="saida">fuel/cadastro/outbox</camunda:outputParameter>
          <camunda:outputParameter name="schemaRetorno">https://schemas.brltrust.com.br/json/fidc/v1.2/precatorio/cedente-retorno.schema.json</camunda:outputParameter>
          <camunda:outputParameter name="webhook">webhook/radix</camunda:outputParameter>
        </camunda:inputOutput>
      </bpmn:extensionElements>
      <bpmn:incoming>caminho_01</bpmn:incoming>
      <bpmn:outgoing>caminho_02</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="caminho_02" sourceRef="cadun-cadastro-cedente-script-config" targetRef="cadun-cadastro-cedente-tarefa-recuperarFicha" />
    <bpmn:sequenceFlow id="caminho_05" sourceRef="cadun.processar-cadastro-cedente" targetRef="cadun.cadastrar-cedentes-end" />
    <bpmn:sequenceFlow id="caminho_01" sourceRef="cadun.cadastrar-cedentes-start" targetRef="cadun-cadastro-cedente-script-config" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="cadun.fuel.cadastro-cedentes">
      <bpmndi:BPMNEdge id="Flow_18qhh11_di" bpmnElement="caminho_01">
        <di:waypoint x="158" y="269" />
        <di:waypoint x="190" y="269" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_155p9mp_di" bpmnElement="caminho_05">
        <di:waypoint x="2353" y="269" />
        <di:waypoint x="2392" y="269" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1648cb7_di" bpmnElement="caminho_02">
        <di:waypoint x="290" y="269" />
        <di:waypoint x="330" y="269" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0hewnaf_di" bpmnElement="caminhoInconsistente_01">
        <di:waypoint x="490" y="294" />
        <di:waypoint x="490" y="620" />
        <di:waypoint x="1300" y="620" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="496" y="586" width="65" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ds3mu4_di" bpmnElement="caminho_04">
        <di:waypoint x="515" y="269" />
        <di:waypoint x="552" y="269" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1lgpest_di" bpmnElement="caminhoInconsistente_03">
        <di:waypoint x="1620" y="620" />
        <di:waypoint x="2410" y="620" />
        <di:waypoint x="2410" y="287" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0owyjq0_di" bpmnElement="caminho_03">
        <di:waypoint x="430" y="269" />
        <di:waypoint x="465" y="269" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0dspgqv_di" bpmnElement="caminhoInconsistente_02">
        <di:waypoint x="1400" y="620" />
        <di:waypoint x="1520" y="620" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="cadun.cadastrar-cedentes-start">
        <dc:Bounds x="122" y="251" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_176k9ea_di" bpmnElement="cadun-cadastro-cedente-script-config">
        <dc:Bounds x="190" y="229" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_17xo4ij_di" bpmnElement="cadun-cadastro-cedente-tarefa-recuperarFicha">
        <dc:Bounds x="330" y="229" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1rwe9m7_di" bpmnElement="Gateway_1rwe9m7" isMarkerVisible="true">
        <dc:Bounds x="465" y="244" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0xgjyng_di" bpmnElement="cadun.cadastrar-cedentes-end">
        <dc:Bounds x="2392" y="251" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_03jso64_di" bpmnElement="cadun-cadastro-cedente-tarefa-notificarInconsistencia">
        <dc:Bounds x="1300" y="580" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0dnojuk_di" bpmnElement="cadun-cadastro-cedente-tarefa-notificarInconsistenciaEmail">
        <dc:Bounds x="1520" y="580" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0l5dn7k_di" bpmnElement="cadun.processar-cadastro-cedente" isExpanded="true">
        <dc:Bounds x="552" y="107" width="1801" height="443" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1olkr02_di" bpmnElement="caminhoBaixoRisco_01">
        <di:waypoint x="1360" y="241" />
        <di:waypoint x="1360" y="190" />
        <di:waypoint x="1820" y="190" />
        <di:waypoint x="1820" y="226" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1366" y="195" width="54" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0d43nzm_di" bpmnElement="caminhoAnalise_06">
        <di:waypoint x="1385" y="266" />
        <di:waypoint x="1421" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_068ivu3_di" bpmnElement="caminhoDuplicado_01">
        <di:waypoint x="2090" y="291" />
        <di:waypoint x="2090" y="340" />
        <di:waypoint x="2300" y="340" />
        <di:waypoint x="2300" y="284" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2095" y="322" width="49" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ny6u02_di" bpmnElement="caminhoAnalise_11">
        <di:waypoint x="2115" y="266" />
        <di:waypoint x="2150" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0kedl3w_di" bpmnElement="analise_10">
        <di:waypoint x="2030" y="266" />
        <di:waypoint x="2065" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_00ywywb_di" bpmnElement="caminhoAnalise_12">
        <di:waypoint x="2250" y="266" />
        <di:waypoint x="2282" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_023i7ya_di" bpmnElement="Flow_023i7ya">
        <di:waypoint x="1726" y="291" />
        <di:waypoint x="1726" y="330" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1732" y="301" width="48" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0790jjr_di" bpmnElement="caminhoAnalise_09">
        <di:waypoint x="1751" y="266" />
        <di:waypoint x="1791" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_11mkmbz_di" bpmnElement="Flow_11mkmbz">
        <di:waypoint x="1676" y="370" />
        <di:waypoint x="1611" y="370" />
        <di:waypoint x="1611" y="306" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0jvung0_di" bpmnElement="caminhoAnalise_05">
        <di:waypoint x="1306" y="266" />
        <di:waypoint x="1335" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0kg5b6k_di" bpmnElement="caminhoAnalise_07">
        <di:waypoint x="1521" y="266" />
        <di:waypoint x="1561" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_111hkt2_di" bpmnElement="Flow_111hkt2">
        <di:waypoint x="1331" y="470" />
        <di:waypoint x="1841" y="470" />
        <di:waypoint x="1841" y="306" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1vazbc8_di" bpmnElement="caminhoAprovadoAnalise_01">
        <di:waypoint x="670" y="291" />
        <di:waypoint x="670" y="470" />
        <di:waypoint x="1231" y="470" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="679" y="448" width="47" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1groskd_di" bpmnElement="caminhoAnalise_08">
        <di:waypoint x="1661" y="266" />
        <di:waypoint x="1701" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10y1b97_di" bpmnElement="caminhoReprovadoAnalise_01">
        <di:waypoint x="670" y="241" />
        <di:waypoint x="670" y="170" />
        <di:waypoint x="1860" y="170" />
        <di:waypoint x="1860" y="226" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="677" y="177" width="70" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0693r7r_di" bpmnElement="caminhoAnalise_04">
        <di:waypoint x="1233" y="266" />
        <di:waypoint x="1256" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_05na1vg_di" bpmnElement="caminhoAnalise_02">
        <di:waypoint x="695" y="266" />
        <di:waypoint x="758" y="266" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="702" y="247" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_07kizaf_di" bpmnElement="caminhoAnalise_10">
        <di:waypoint x="1891" y="266" />
        <di:waypoint x="1930" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_17sjy1o_di" bpmnElement="Flow_17sjy1o">
        <di:waypoint x="1083" y="391" />
        <di:waypoint x="1281" y="391" />
        <di:waypoint x="1281" y="291" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0pdynz8_di" bpmnElement="Flow_0pdynz8">
        <di:waypoint x="783" y="291" />
        <di:waypoint x="783" y="391" />
        <di:waypoint x="983" y="391" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0siyw0h_di" bpmnElement="caminhoAnalise_03">
        <di:waypoint x="808" y="266" />
        <di:waypoint x="833" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1kbp1al_di" bpmnElement="caminhoAnalise_01">
        <di:waypoint x="618" y="266" />
        <di:waypoint x="645" y="266" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1ouqzc9_di" bpmnElement="cadun.processar-cadastro-cendente-start">
        <dc:Bounds x="582" y="248" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1obvtsn_di" bpmnElement="Gateway_1obvtsn" isMarkerVisible="true">
        <dc:Bounds x="645" y="241" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1jfpj5d_di" bpmnElement="cadun-cadastro-cedente-tarefa-registrarCadastro">
        <dc:Bounds x="1561" y="226" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0gzigkr_di" bpmnElement="cadun.fork.reputacao">
        <dc:Bounds x="758" y="241" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1d4x13m_di" bpmnElement="cadun.join.reputacao">
        <dc:Bounds x="1256" y="241" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1sla7l1_di" bpmnElement="cadun-cadastro-pessoa-tarefa-recuperarDocumentacao">
        <dc:Bounds x="983" y="351" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_04uurdz_di" bpmnElement="cadun-cadastro-cedente-tarefa-notificarCadastroArquivo">
        <dc:Bounds x="1791" y="226" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1ryyyls_di" bpmnElement="cadun.cadastro.aprovar-dossie">
        <dc:Bounds x="1421" y="226" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0viyocq_di" bpmnElement="cadun.cadastro.dossie-pendente">
        <dc:Bounds x="1676" y="330" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1p5uiji_di" bpmnElement="Gateway_1p5uiji" isMarkerVisible="true">
        <dc:Bounds x="1701" y="241" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0w1vveb_di" bpmnElement="Gateway_0w1vveb" isMarkerVisible="true">
        <dc:Bounds x="1335" y="241" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0v5jas9_di" bpmnElement="cadun.processar-cadastro-cendente-end">
        <dc:Bounds x="2282" y="248" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1mg4j83_di" bpmnElement="cadun-cadastro-pessoa-tarefa-recuperarDocumentacaoAprovado">
        <dc:Bounds x="1231" y="430" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0z132zs_di" bpmnElement="cadun-cadastro-cedente-tarefa-notificarCadastroWebhook">
        <dc:Bounds x="2150" y="226" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0dkpgw6_di" bpmnElement="Gateway_0dkpgw6" isMarkerVisible="true">
        <dc:Bounds x="2065" y="241" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0v99ix6_di" bpmnElement="cadun-cadastro-cedente-tarefa-notificarCadastroEmail">
        <dc:Bounds x="1930" y="226" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1d6n20r_di" bpmnElement="cadun.analisar-reputacao" isExpanded="true">
        <dc:Bounds x="833" y="193" width="400" height="145" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1jlr017_di" bpmnElement="analiseReputacao_03">
        <di:waypoint x="1148" y="270" />
        <di:waypoint x="1175" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0evifr9_di" bpmnElement="analiseReputacao_02">
        <di:waypoint x="1016" y="270" />
        <di:waypoint x="1048" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0jcbo0p_di" bpmnElement="analiseReputacao_01">
        <di:waypoint x="889" y="270" />
        <di:waypoint x="916" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_05m6e7u_di" bpmnElement="cadun.analisar-reputacao-start">
        <dc:Bounds x="853" y="252" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_09pwwao_di" bpmnElement="cadun.analisar-reputacao-end">
        <dc:Bounds x="1175" y="252" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0phpaje_di" bpmnElement="cadun-cadastro-cedente-tarefa-solicitarDossie">
        <dc:Bounds x="916" y="230" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1gjhsy1_di" bpmnElement="cadun-cadastro-cedente-tarefa-consultarDossie">
        <dc:Bounds x="1048" y="230" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>

`;
}
