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

  doc = {
    DocName: name,
    extSysDocId: CurrentDocument.id,
    ExtSysDocVersion: CurrentDocument.version,
    docType: "act",
    docDate: regDate,
    docNum: regNumber,
    File: "",
    parties: [
      {
        taskType: "ToSign",
        taskState: "Done",
        legalEntityCode: EdocsApi.getAttributeValue("OrgCode").value,
        contactPersonEmail: EdocsApi.getAttributeValue("OrgContractManagerEmail").value,
        signatures: [
          {
            signer: EdocsApi.getAttributeValue("OrgSignerName").value,
          },
        ],
      },
      {
        taskType: "ToSign",
        taskState: "NotAssigned",
        sendByService: EdocsApi.getAttributeValue("Vchasno").value == "true" ? "vchasno" : "esign",
        legalEntityCode: EdocsApi.getAttributeValue("ContractorCode").value,
        contactPersonEmail: EdocsApi.getAttributeValue("CtrpContractManagerEmail").value,
        expectedSignatures: [],
      },
    ],
    sendingSettings: {
      attachFiles: "fixed",
      attachSignatures: "signatureAndStamp",
    },
  };
  EdocsApi.setAttributeValue({ code: "LSDJSON", value: JSON.stringify(doc) });
}
