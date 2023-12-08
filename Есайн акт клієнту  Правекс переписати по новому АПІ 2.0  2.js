//Акт клієнту


//-------------------------------
// еСайн
//-------------------------------
function setDataForESign() {
    var regDate = EdocsApi.getAttributeValue('RegDate').value;
    var regNumber = EdocsApi.getAttributeValue('RegNumber').value;
var sendByService = EdocsApi.getAttributeValue('Vchasno').value == 'true' ? "vchasno" : "esign";
   // var correspondents = GetCorrespondents();
var caseType = EdocsApi.getAttributeValue("TypeDoc").value;
    var caseKind = EdocsApi.getAttributeValue("ContractType").text;
    var name = "";
    if (caseKind) {
      name += caseKind;
    } else {
      name += caseType;
    }

    var name =  (regNumber ? regNumber : CurrentDocument.id) + (!regDate ? '' : (' від ' + moment(regDate).format('DD.MM.YYYY')));

    var doc = {
        SystemCode: "mhp",
        DocumentName: name,
        DocumentGlobalId: CurrentDocument.id,
        DocumentType: "act",
        Initiator: {
            OrganizationGlobalId: EdocsApi.getAttributeValue('OrgCode').value,
            CountryOfRegistration: "ua",
            PartyName: EdocsApi.getAttributeValue('OrgShortName').value,
            ContactPerson: {
                PersonGlobalId: EdocsApi.getAttributeValue('OrgContractManagerEmail').value,
                FirstName: EdocsApi.getAttributeValue('OrgContractManager').text
            },
            Task: {
                Type: "Sign",
                State: "Completed",

                ExpectedSignatures: [
                    {
                        SignerTitle: EdocsApi.getAttributeValue('OrgSignerName').value,
                        Position: EdocsApi.getAttributeValue('OrgSignerPosition').value
                    }]
            }
        },
        Parties: [
            {
                OrganizationGlobalId: EdocsApi.getAttributeValue('ContractorCode').value,
                CountryOfRegistration: "ua",
                PartyName: EdocsApi.getAttributeValue('ContractorShortName').value,
                ContactPerson: {
                    PersonGlobalId: EdocsApi.getAttributeValue('CtrpContractManagerEmail').value,
                    FirstName: EdocsApi.getAttributeValue('ContractorRPSurname').value
                },
                Task: {
                    Type: "Sign",
                    State: "New",
                    sendByService: sendByService,
                    TaskDescription: null,
                    //ExpectedSignatures: [
                     //   {
                           //SignerTitle: EdocsApi.getAttributeValue('CtrpSignerName').value,
                          //  Position: EdocsApi.getAttributeValue('CtrpSignerPosition').value
                 //       }]
                }
            }
        ]
    }

    EdocsApi.setAttributeValue({ code: 'LSDJSON', value: JSON.stringify(doc) });
}