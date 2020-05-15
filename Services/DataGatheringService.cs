using DomainClasses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Services
{
    public interface IDataGatheringService
    {
        List<CSSR_Result_ViewModel> getCSSR(Operator selected_operator
            , Technology selected_technology);

        List<TCH_ASR_Result_ViewModel> getTCH_ASR(Operator selected_operator
            , Technology selected_technology);

        List<Gauge_Result_ViewModel> getSDCCH_DR(Operator selected_operator
            , Technology selected_technology);

        List<Gauge_Result_ViewModel> getCS_IRAT_HOSR(Operator selected_operator
            , Technology selected_technology);

        List<CSSR_Result_ViewModel> getCSSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<TCH_ASR_Result_ViewModel> getTCH_ASR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getSDCCH_DR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getCS_IRAT_HOSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getRRC_CCSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getRRC_CSSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getSuccess_Active_Set_update(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getSuccess_Attach_Request(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getARSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getRSRR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getTotal_successful_Call(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);

        List<Gauge_Result_ViewModel> getSMSSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime);
    }

    public class DataGatheringService : IDataGatheringService
    {
        private string generateConnectionString(Operator selected_operator)
        {
            return String.Format("Server={0};Database={1};" +
                                 "User Id={2}; Password={3};",
                selected_operator.IP_Address, selected_operator.Database_Name,
                selected_operator.Username, selected_operator.Password);
        }

        public List<CSSR_Result_ViewModel> getCSSR( Operator selected_operator
            , Technology selected_technology)
        {
            List<CSSR_Result_ViewModel> result = new List<CSSR_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getSDCCH_DR(Operator selected_operator, Technology selected_technology)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            string connectionString = generateConnectionString(selected_operator);

            return result;
        }

        public List<Gauge_Result_ViewModel> getCS_IRAT_HOSR(Operator selected_operator, Technology selected_technology)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<TCH_ASR_Result_ViewModel> getTCH_ASR(Operator selected_operator
            , Technology selected_technology)
        {
            List<TCH_ASR_Result_ViewModel> result = new List<TCH_ASR_Result_ViewModel>();

            return result;
        }
        
        public List<CSSR_Result_ViewModel> getCSSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<CSSR_Result_ViewModel> result = new List<CSSR_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getSDCCH_DR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getCS_IRAT_HOSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<TCH_ASR_Result_ViewModel> getTCH_ASR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<TCH_ASR_Result_ViewModel> result = new List<TCH_ASR_Result_ViewModel>();

            return result;
        }
        
        public List<Gauge_Result_ViewModel> getRRC_CCSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getRRC_CSSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getSuccess_Active_Set_update(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getSuccess_Attach_Request(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getARSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getRSRR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getTotal_successful_Call(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }

        public List<Gauge_Result_ViewModel> getSMSSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            return result;
        }
    }
}
