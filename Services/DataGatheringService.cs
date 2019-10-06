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

            string connectionString = generateConnectionString(selected_operator);

            string cmd = String.Format("select accurance_date,sum(MM_CMServiceRequest) "+
                                       " as request, sum(RANAP_RABAssignment_Response) "+
                                       " as response from (SELECT CONVERT(date, getdate()) "+
                                       " as accurance_date, MM_CMServiceRequest, CASE " +
                                       " WHEN RANAP_RABAssignment_Response is not NULL THEN " +
                                       " RANAP_RABAssignment_Response " +
                                       " WHEN RANAP_RABAssignment_Response is NULL then 0 " +
                                       " END as RANAP_RABAssignment_Response" +
                                       " FROM [{0}].[dbo].[{1}]  where MM_CMServiceRequest "+
                                       " is not null and MM_CMServiceRequest > 0) as result " +
                                       " group by accurance_date"
                , selected_operator.Database_Name, selected_technology.Table_Name);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    SqlCommand sqlCommand = new SqlCommand(cmd,connection);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                result.Add(
                                    new CSSR_Result_ViewModel()
                                    {
                                        operatorId = selected_operator.Id,

                                        technologyId = selected_technology.Id,

                                        MM_CMServiceRequest = 
                                            reader.GetInt32(reader.GetOrdinal("request")),

                                        RANAP_RABAssignment_Response = 
                                            reader.GetInt32(reader.GetOrdinal("response")),

                                        accurance_date = 
                                            reader.GetDateTime(reader.GetOrdinal("accurance_date"))
                                    }
                                );
                            }
                        }
                    }
                }
            }

            return result;
        }

        public List<Gauge_Result_ViewModel> getSDCCH_DR(Operator selected_operator, Technology selected_technology)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            string connectionString = generateConnectionString(selected_operator);

            string cmd = String.Format("select accurance_date,sum(MM_CMServiceRequest) " +
                                       " as request, sum(MM_CMServiceReject) " +
                                       " as response from (SELECT CONVERT(date, getdate()) " +
                                       " as accurance_date, MM_CMServiceRequest, CASE " +
                                       " WHEN MM_CMServiceReject is not NULL THEN " +
                                       " MM_CMServiceReject " +
                                       " WHEN MM_CMServiceReject is NULL then 0 " +
                                       " END as MM_CMServiceReject" +
                                       " FROM [{0}].[dbo].[{1}]  where MM_CMServiceRequest " +
                                       " is not null and MM_CMServiceRequest > 0) as result " +
                                       " group by accurance_date"
                , selected_operator.Database_Name, selected_technology.Table_Name);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    SqlCommand sqlCommand = new SqlCommand(cmd, connection);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                result.Add(
                                    new Gauge_Result_ViewModel()
                                    {
                                        operatorId = selected_operator.Id,

                                        technologyId = selected_technology.Id,

                                        data = ( (double) reader.GetInt32(reader.GetOrdinal("response")) 
                                               / (double) reader.GetInt32(reader.GetOrdinal("request"))),

                                        weight =
                                            reader.GetInt32(reader.GetOrdinal("request")),

                                        accurance_date =
                                            reader.GetDateTime(reader.GetOrdinal("accurance_date"))
                                    }
                                );
                            }
                        }
                    }
                }
            }

            return result;
        }

        public List<Gauge_Result_ViewModel> getCS_IRAT_HOSR(Operator selected_operator, Technology selected_technology)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            string connectionString = generateConnectionString(selected_operator);

            string cmd = String.Format("select accurance_date,sum(MM_TMSIReallocationCommand) " +
                                       " as request, sum(MM_TMSIReallocationComplete) " +
                                       " as response from (SELECT CONVERT(date, getdate()) " +
                                       " as accurance_date, MM_TMSIReallocationCommand, CASE " +
                                       " WHEN MM_TMSIReallocationComplete is not NULL THEN " +
                                       " MM_TMSIReallocationComplete " +
                                       " WHEN MM_TMSIReallocationComplete is NULL then 0 " +
                                       " END as MM_TMSIReallocationComplete" +
                                       " FROM [{0}].[dbo].[{1}]  where MM_TMSIReallocationCommand " +
                                       " is not null and MM_TMSIReallocationCommand > 0) as result " +
                                       " group by accurance_date"
                , selected_operator.Database_Name, selected_technology.Table_Name);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    SqlCommand sqlCommand = new SqlCommand(cmd, connection);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                result.Add(
                                    new Gauge_Result_ViewModel()
                                    {
                                        operatorId = selected_operator.Id,

                                        technologyId = selected_technology.Id,

                                        data = ((double)reader.GetInt32(reader.GetOrdinal("response"))
                                               / (double)reader.GetInt32(reader.GetOrdinal("request"))),

                                        weight =
                                            reader.GetInt32(reader.GetOrdinal("request")),

                                        accurance_date =
                                            reader.GetDateTime(reader.GetOrdinal("accurance_date"))
                                    }
                                );
                            }
                        }
                    }
                }
            }

            return result;
        }

        public List<TCH_ASR_Result_ViewModel> getTCH_ASR(Operator selected_operator
            , Technology selected_technology)
        {
            List<TCH_ASR_Result_ViewModel> result = new List<TCH_ASR_Result_ViewModel>();

            string connectionString = generateConnectionString(selected_operator);

            string cmd = String.Format("select accurance_date,sum(RANAP_RABAssignment_Request ) " +
                                       " as request, sum(RANAP_RABAssignment_Response) " +
                                       " as response from (SELECT CONVERT(date, getdate()) " +
                                       " as accurance_date, RANAP_RABAssignment_Request , CASE " +
                                       " WHEN RANAP_RABAssignment_Response is not NULL THEN " +
                                       " RANAP_RABAssignment_Response " +
                                       " WHEN RANAP_RABAssignment_Response is NULL then 0 " +
                                       " END as RANAP_RABAssignment_Response" +
                                       " FROM [{0}].[dbo].[{1}]  where RANAP_RABAssignment_Request  " +
                                       " is not null and RANAP_RABAssignment_Request > 0) as result " +
                                       " group by accurance_date"
                , selected_operator.Database_Name, selected_technology.Table_Name);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    SqlCommand sqlCommand = new SqlCommand(cmd, connection);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                result.Add(
                                    new TCH_ASR_Result_ViewModel()
                                    {
                                        operatorId = selected_operator.Id,

                                        technologyId = selected_technology.Id,

                                        RANAP_RABAssignment_Request = 
                                            reader.GetInt32(reader.GetOrdinal("request")),

                                        RANAP_RABAssignment_Response =
                                            reader.GetInt32(reader.GetOrdinal("response")),

                                        accurance_date = reader.GetDateTime
                                            (reader.GetOrdinal("accurance_date"))
                                    }
                                );
                            }
                        }
                    }
                }
            }

            return result;
        }
        
        public List<CSSR_Result_ViewModel> getCSSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<CSSR_Result_ViewModel> result = new List<CSSR_Result_ViewModel>();

            string connectionString = generateConnectionString(selected_operator);

            string cmd = String.Format("select accurance_date,sum(MM_CMServiceRequest) " +
                                       " as request, sum(RANAP_RABAssignment_Response) " +
                                       " as response from (SELECT CONVERT(date, DateTime) " +
                                       " as accurance_date, MM_CMServiceRequest, CASE " +
                                       " WHEN RANAP_RABAssignment_Response is not NULL THEN " +
                                       " RANAP_RABAssignment_Response " +
                                       " WHEN RANAP_RABAssignment_Response is NULL then 0 " +
                                       " END as RANAP_RABAssignment_Response" +
                                       " FROM [{0}].[dbo].[{1}]  where MM_CMServiceRequest " +
                                       " is not null and MM_CMServiceRequest > 0" +
                                       " and DateTime >= '{2}' and DateTime <= '{3}' ) as result " +
                                       " group by accurance_date"
                , selected_operator.Database_Name, selected_technology.Table_Name
                , startDateTime, endDateTime);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    SqlCommand sqlCommand = new SqlCommand(cmd, connection);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                result.Add(
                                    new CSSR_Result_ViewModel()
                                    {
                                        operatorId = selected_operator.Id,

                                        technologyId = selected_technology.Id,

                                        MM_CMServiceRequest =
                                            reader.GetInt32(reader.GetOrdinal("request")),

                                        RANAP_RABAssignment_Response =
                                            reader.GetInt32(reader.GetOrdinal("response")),

                                        accurance_date =
                                            reader.GetDateTime(reader.GetOrdinal("accurance_date"))
                                    }
                                );
                            }
                        }
                    }
                }
            }

            return result;
        }

        public List<Gauge_Result_ViewModel> getSDCCH_DR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            string connectionString = generateConnectionString(selected_operator);

            string cmd = String.Format("select accurance_date,sum(MM_CMServiceRequest) " +
                                       " as request, sum(MM_CMServiceReject) " +
                                       " as response from (SELECT CONVERT(date, DateTime) " +
                                       " as accurance_date, MM_CMServiceRequest, CASE " +
                                       " WHEN MM_CMServiceReject is not NULL THEN " +
                                       " MM_CMServiceReject " +
                                       " WHEN MM_CMServiceReject is NULL then 0 " +
                                       " END as MM_CMServiceReject" +
                                       " FROM [{0}].[dbo].[{1}]  where MM_CMServiceRequest " +
                                       " is not null and MM_CMServiceRequest > 0" +
                                       " and DateTime >= '{2}' and DateTime <= '{3}' ) as result " +
                                       " group by accurance_date"
                , selected_operator.Database_Name, selected_technology.Table_Name
                , startDateTime, endDateTime);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    SqlCommand sqlCommand = new SqlCommand(cmd, connection);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                result.Add(
                                    new Gauge_Result_ViewModel()
                                    {
                                        operatorId = selected_operator.Id,

                                        technologyId = selected_technology.Id,

                                        data = ((double)reader.GetInt32(reader.GetOrdinal("response"))
                                               / (double)reader.GetInt32(reader.GetOrdinal("request"))),

                                        weight =
                                            reader.GetInt32(reader.GetOrdinal("request")),

                                        accurance_date =
                                            reader.GetDateTime(reader.GetOrdinal("accurance_date"))
                                    }
                                );
                            }
                        }
                    }
                }
            }

            return result;
        }

        public List<Gauge_Result_ViewModel> getCS_IRAT_HOSR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<Gauge_Result_ViewModel> result = new List<Gauge_Result_ViewModel>();

            string connectionString = generateConnectionString(selected_operator);

            string cmd = String.Format("select accurance_date,sum(MM_TMSIReallocationCommand) " +
                                       " as request, sum(MM_TMSIReallocationComplete) " +
                                       " as response from (SELECT CONVERT(date, DateTime) " +
                                       " as accurance_date, MM_TMSIReallocationCommand, CASE " +
                                       " WHEN MM_TMSIReallocationComplete is not NULL THEN " +
                                       " MM_TMSIReallocationComplete " +
                                       " WHEN MM_TMSIReallocationComplete is NULL then 0 " +
                                       " END as MM_TMSIReallocationComplete" +
                                       " FROM [{0}].[dbo].[{1}]  where MM_TMSIReallocationCommand " +
                                       " is not null and MM_TMSIReallocationCommand > 0" +
                                       " and DateTime >= '{2}' and DateTime <= '{3}' ) as result " +
                                       " group by accurance_date"
                , selected_operator.Database_Name, selected_technology.Table_Name
                , startDateTime, endDateTime);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    SqlCommand sqlCommand = new SqlCommand(cmd, connection);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                result.Add(
                                    new Gauge_Result_ViewModel()
                                    {
                                        operatorId = selected_operator.Id,

                                        technologyId = selected_technology.Id,

                                        data = ((double)reader.GetInt32(reader.GetOrdinal("response"))
                                               / (double)reader.GetInt32(reader.GetOrdinal("request"))),

                                        weight =
                                            reader.GetInt32(reader.GetOrdinal("request")),

                                        accurance_date =
                                            reader.GetDateTime(reader.GetOrdinal("accurance_date"))
                                    }
                                );
                            }
                        }
                    }
                }
            }

            return result;
        }

        public List<TCH_ASR_Result_ViewModel> getTCH_ASR(Operator selected_operator
            , Technology selected_technology, DateTime startDateTime, DateTime endDateTime)
        {
            List<TCH_ASR_Result_ViewModel> result = new List<TCH_ASR_Result_ViewModel>();

            string connectionString = generateConnectionString(selected_operator);

            string cmd = String.Format("select accurance_date,sum(RANAP_RABAssignment_Request ) " +
                                       " as request, sum(RANAP_RABAssignment_Response) " +
                                       " as response from (SELECT CONVERT(date, DateTime) " +
                                       " as accurance_date, RANAP_RABAssignment_Request , CASE " +
                                       " WHEN RANAP_RABAssignment_Response is not NULL THEN " +
                                       " RANAP_RABAssignment_Response " +
                                       " WHEN RANAP_RABAssignment_Response is NULL then 0 " +
                                       " END as RANAP_RABAssignment_Response" +
                                       " FROM [{0}].[dbo].[{1}]  where RANAP_RABAssignment_Request  " +
                                       " is not null and RANAP_RABAssignment_Request > 0"+
                                       " and DateTime >= '{2}' and DateTime <= '{3}' ) as result " +
                                       " group by accurance_date"
                , selected_operator.Database_Name, selected_technology.Table_Name
                , startDateTime, endDateTime);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    SqlCommand sqlCommand = new SqlCommand(cmd, connection);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                result.Add(
                                    new TCH_ASR_Result_ViewModel()
                                    {
                                        operatorId = selected_operator.Id,

                                        technologyId = selected_technology.Id,

                                        RANAP_RABAssignment_Request =
                                            reader.GetInt32(reader.GetOrdinal("request")),

                                        RANAP_RABAssignment_Response =
                                            reader.GetInt32(reader.GetOrdinal("response")),

                                        accurance_date = reader.GetDateTime
                                            (reader.GetOrdinal("accurance_date"))
                                    }
                                );
                            }
                        }
                    }
                }
            }

            return result;
        }
    }
}
