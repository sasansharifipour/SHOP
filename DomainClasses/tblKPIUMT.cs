using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DomainClasses
{
    [Table("tblKPIUMTS")]
    public partial class tblKPIUMT
    {
        public long ID { get; set; }

        public DateTime DateTime { get; set; }

        public int? CC_Alerting { get; set; }

        public int? CC_CallConfirmed { get; set; }

        public int? CC_CallProceeding { get; set; }

        public int? CC_Connect { get; set; }

        public int? CC_ConnectAck { get; set; }

        public int? CC_EmergencySetup { get; set; }

        public int? CC_Setup { get; set; }

        public int? CC_Disconnect { get; set; }

        public int? CC_Release { get; set; }

        public int? CC_ReleaseComplete { get; set; }

        public int? MM_IdentityResponse { get; set; }

        public int? MM_TMSIReallocationCommand { get; set; }

        public int? MM_CMServiceRequest { get; set; }

        public int? MM_LocationUpdatingAccept { get; set; }

        public int? MM_IMSIDetachIndication { get; set; }

        public int? MM_LocationUpdatingReject { get; set; }

        public int? MM_LocationUpdatingRequest { get; set; }

        public int? MM_AuthenticationReject { get; set; }

        public int? MM_AuthenticationRequest { get; set; }

        public int? MM_AuthenticationResponse { get; set; }

        public int? MM_IdentityRequest { get; set; }

        public int? MM_TMSIReallocationComplete { get; set; }

        public int? MM_CMServiceAccept { get; set; }

        public int? MM_CMServiceReject { get; set; }

        public int? RR_PageResponse { get; set; }

        public int? RANAP_CommonID { get; set; }

        public int? RANAP_DirectTransfer { get; set; }

        public int? RANAP_ErrorIndication { get; set; }

        public int? RANAP_InitialUEMessage { get; set; }

        public int? RANAP_IuRelease { get; set; }

        public int? RANAP_RABAssignment { get; set; }

        public int? CHK { get; set; }

        [StringLength(512)]
        public string USERCHK { get; set; }

        public DateTime? INSERTDATETIME { get; set; }

        public int? RANAP_RABAssignment_Response { get; set; }

        public int? RANAP_RABAssignment_Request { get; set; }
    }
}
