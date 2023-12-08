function setDataForESign() {
  var regDate = EdocsApi.getAttributeValue("RegDate").value;
  var regNumber = EdocsApi.getAttributeValue("RegNumber").value;
  var caseType = EdocsApi.getAttributeValue("TypeDoc").value;
  var caseKind = EdocsApi.getAttributeValue("ContractType").text;
  var name = "";
  if (caseKind) {
    name += caseKind;
  } else {
    name += caseType;
  }

  var name = (regNumber ? regNumber : CurrentDocument.id) + (!regDate ? "" : " від " + moment(regDate).format("DD.MM.YYYY"));

  var doc = {
    DocumentName: name,
    extSysDocId: CurrentDocument.id,
    ExtSysDocVersion: CurrentDocument.version,
    DocumentType: "act",
    docDate: regDate,
    docNum: regNumber,
    File: "",
    parties: [
      {
        taskType: "ToSign",
        taskState: "Done",
        legalEntityCode: EdocsApi.getAttributeValue("OrgCode").value,
        contactPersonEmail: EdocsApi.getAttributeValue("OrgContractManagerEmail").value,
        signatures: [],
      },
      {
        taskType: "ToSign",
        taskState: "NotAssigned",
        legalEntityCode: EdocsApi.getAttributeValue("ContractorCode").value,
        contactPersonEmail: EdocsApi.getAttributeValue("CtrpContractManagerEmail").value,
        expectedSignatures: [
          {
            SignerTitle: EdocsApi.getAttributeValue("ContractorRPSurname").value,
            //Position: атрибут із посадою підписанта, EdocsApi.getAttributeValue("ContractorAgentPosition").value,
          },
        ],
      },
    ],
    additionalAttributes: [
      {
        code: "docDate",
        type: "dateTime",
        value: regDate,
      },
      {
        code: "docNum",
        type: "string",
        value: regNumber,
      },
    ],
    sendingSettings: {
      attachFiles: "fixed", //, можна також встановлювати 'firstOnly' - Лише файл із першої зафіксованої вкладки(Головний файл), або 'all' - всі файли, 'fixed' - усі зафіксовані
      attachSignatures: "signatureAndStamp", // -'signatureAndStamp'Типи “Підпис” або “Печатка”, можна також встановити 'all' - усі типи цифрових підписів
    },
  };
  if (EdocsApi.getAttributeValue("Vchasno").value == "true") doc.parties[1].Task.sendByService = "vchasno";

  EdocsApi.setAttributeValue({ code: "JSON", value: JSON.stringify(doc) });
}
