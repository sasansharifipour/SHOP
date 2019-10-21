using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularUI.Models;
using Common;
using DomainClasses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace AngularUI.Controllers
{
    [Route("api/[controller]")]
    
    public class ApiDataProviderController : Controller
    {
        private readonly IDataProviderService _dataProviderService;

        public ApiDataProviderController(IDataProviderService dataProviderService)
        {
            _dataProviderService = dataProviderService;
            _dataProviderService.CheckArgumentIsNull(nameof(_dataProviderService));
        }

        [AllowAnonymous]
        [HttpPost("getCSSR")]
        public List<CSSR_Result_ViewModel> GetCSSR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getCSSR(model.operators,model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getCSSR_Current_Month")]
        public List<CSSR_Result_ViewModel> GetCSSR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getCSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getCSSR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetCSSR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<CSSR_Result_ViewModel> data = _dataProviderService.getCSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            List<line_chart_data_view_model> result = data.GroupBy(s => s.accurance_date)
                .Select(s => new line_chart_data_view_model()
                {
                    accurance_date = s.Key,
                    data = s.Average(g => g.RANAP_RABAssignment_Response / g.MM_CMServiceRequest)
                }).ToList();

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getCSSR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetCSSR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            DateTime temp = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = temp;

            List<CSSR_Result_ViewModel> data = _dataProviderService.getCSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            List<line_chart_data_view_model> result = data.GroupBy(s => s.accurance_date)
                .Select(s => new line_chart_data_view_model()
                {
                    accurance_date = s.Key,
                    data = s.Average(g => g.RANAP_RABAssignment_Response / g.MM_CMServiceRequest)
                }).ToList();

            return result;
        }
        //--------------------------------------------------------------------------------------------------------------
        [AllowAnonymous]
        [HttpPost("getTCH_ASR")]
        public List<TCH_ASR_Result_ViewModel> GetTCH_ASR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getTCH_ASR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getTCH_ASR_Current_Month")]
        public List<TCH_ASR_Result_ViewModel> GetTCH_ASR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getTCH_ASR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getTCH_ASR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetTCH_ASR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<TCH_ASR_Result_ViewModel> data = _dataProviderService.getTCH_ASR
            (model.operators, model.technologies, model.fromDate, model.toDate);

            List<line_chart_data_view_model> result = data.GroupBy(s => s.accurance_date)
                .Select(s => new line_chart_data_view_model()
            {
                accurance_date = s.Key,
                data = s.Average(g => g.RANAP_RABAssignment_Response / g.RANAP_RABAssignment_Request)
            }).ToList();

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getTCH_ASR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetTCH_ASR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            DateTime temp = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = temp;

            List<TCH_ASR_Result_ViewModel> data = _dataProviderService.getTCH_ASR
                (model.operators, model.technologies, model.fromDate, model.toDate);

            List<line_chart_data_view_model> result = data.GroupBy(s => s.accurance_date)
                .Select(s => new line_chart_data_view_model()
                {
                    accurance_date = s.Key,
                    data = s.Average(g => g.RANAP_RABAssignment_Response / g.RANAP_RABAssignment_Request)
                }).ToList();

            return result;
        }
        //--------------------------------------------------------------------------------------------------------------
        [AllowAnonymous]
        [HttpPost("getSDCCH_DR")]
        public List<Gauge_Result_ViewModel> GetSDCCH_DR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getSDCCH_DR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getSDCCH_DR_Current_Month")]
        public List<Gauge_Result_ViewModel> GetSDCCH_DR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getSDCCH_DR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getSDCCH_DR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetSDCCH_DR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getSDCCH_DR(model.operators, model.technologies,
                model.fromDate, model.toDate);
            
            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }
            
            return result;
        }

        [AllowAnonymous]
        [HttpPost("getSDCCH_DR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetSDCCH_DR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getSDCCH_DR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        //--------------------------------------------------------------------------------------------------------------
        [AllowAnonymous]
        [HttpPost("getCS_IRAT_HOSR")]
        public List<Gauge_Result_ViewModel> GetCS_IRAT_HOSR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getCS_IRAT_HOSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getCS_IRAT_HOSR_Current_Month")]
        public List<Gauge_Result_ViewModel> GetCS_IRAT_HOSR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getCS_IRAT_HOSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getCS_IRAT_HOSR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetCS_IRAT_HOSR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getCS_IRAT_HOSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getCS_IRAT_HOSR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetCS_IRAT_HOSR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getCS_IRAT_HOSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        //--------------------------------------------------------------------------------------------------------------
        [AllowAnonymous]
        [HttpPost("getRRC_CCSR")]
        public List<Gauge_Result_ViewModel> GetRRC_CCSR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getRRC_CCSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getRRC_CCSR_Current_Month")]
        public List<Gauge_Result_ViewModel> GetRRC_CCSR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getRRC_CCSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getRRC_CCSR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetRRC_CCSR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getRRC_CCSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getRRC_CCSR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetRRC_CCSR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getRRC_CCSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }
        //-------------------------------------------------------------------------------------------------------------------------

        [AllowAnonymous]
        [HttpPost("getRRC_CSSR")]
        public List<Gauge_Result_ViewModel> GetRRC_CSSR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getRRC_CSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getRRC_CSSR_Current_Month")]
        public List<Gauge_Result_ViewModel> GetRRC_CSSR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getRRC_CSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getRRC_CSSR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetRRC_CSSR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getRRC_CSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getRRC_CSSR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetRRC_CSSR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getRRC_CSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }
        //-------------------------------------------------------------------------------------------------------------------------

        [AllowAnonymous]
        [HttpPost("getSuccess_Active_Set_update")]
        public List<Gauge_Result_ViewModel> GetSuccess_Active_Set_update([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getSuccess_Active_Set_update(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getSuccess_Active_Set_update_Current_Month")]
        public List<Gauge_Result_ViewModel> GetSuccess_Active_Set_update_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getSuccess_Active_Set_update(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getSuccess_Active_Set_update_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetSuccess_Active_Set_update_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getSuccess_Active_Set_update(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getSuccess_Active_Set_update_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetSuccess_Active_Set_update_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getSuccess_Active_Set_update(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }
        //-------------------------------------------------------------------------------------------------------------------------
        
        [AllowAnonymous]
        [HttpPost("getSuccess_Attach_Request")]
        public List<Gauge_Result_ViewModel> GetSuccess_Attach_Request([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getSuccess_Attach_Request(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getSuccess_Attach_Request_Current_Month")]
        public List<Gauge_Result_ViewModel> GetSuccess_Attach_Request_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getSuccess_Attach_Request(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getSuccess_Attach_Request_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetSuccess_Attach_Request_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getSuccess_Attach_Request(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getSuccess_Attach_Request_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetSuccess_Attach_Request_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getSuccess_Attach_Request(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }
        //-------------------------------------------------------------------------------------------------------------------------

        [AllowAnonymous]
        [HttpPost("getARSR")]
        public List<Gauge_Result_ViewModel> GetARSR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getARSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getARSR_Current_Month")]
        public List<Gauge_Result_ViewModel> GetARSR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getARSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getARSR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetARSR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getARSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getARSR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetARSR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getARSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }
        //-------------------------------------------------------------------------------------------------------------------------

        [AllowAnonymous]
        [HttpPost("getRSRR")]
        public List<Gauge_Result_ViewModel> GetRSRR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getRSRR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getRSRR_Current_Month")]
        public List<Gauge_Result_ViewModel> GetRSRR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getRSRR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getRSRR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetRSRR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getRSRR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getRSRR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetRSRR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getRSRR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }
        //-------------------------------------------------------------------------------------------------------------------------

        [AllowAnonymous]
        [HttpPost("getTotal_successful_Call")]
        public List<Gauge_Result_ViewModel> GetTotal_successful_Call([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getTotal_successful_Call(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getTotal_successful_Call_Current_Month")]
        public List<Gauge_Result_ViewModel> GetTotal_successful_Call_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getTotal_successful_Call(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getTotal_successful_Call_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetTotal_successful_Call_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getTotal_successful_Call(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getTotal_successful_Call_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetTotal_successful_Call_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getTotal_successful_Call(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }
        //-------------------------------------------------------------------------------------------------------------------------

        [AllowAnonymous]
        [HttpPost("getSMSSR")]
        public List<Gauge_Result_ViewModel> GetSMSSR([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getSMSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getSMSSR_Current_Month")]
        public List<Gauge_Result_ViewModel> GetSMSSR_Current_Month([FromBody]DateFilterModel model)
        {
            return _dataProviderService.getSMSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);
        }

        [AllowAnonymous]
        [HttpPost("getSMSSR_For_Line_Current_Month")]
        public List<line_chart_data_view_model> GetSMSSR_For_Line_Current_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            List<Gauge_Result_ViewModel> data = _dataProviderService.getSMSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("getSMSSR_For_Line_Last_Month")]
        public List<line_chart_data_view_model> GetSMSSR_For_Line_Last_Month([FromBody]DateFilterModel model)
        {
            List<line_chart_data_view_model> result = new List<line_chart_data_view_model>();

            DateTime startDateTime = model.fromDate;
            model.fromDate = model.fromDate.AddMonths(-1);
            model.toDate = startDateTime;

            List<Gauge_Result_ViewModel> data = _dataProviderService.getSMSSR(model.operators, model.technologies,
                model.fromDate, model.toDate);

            var groups = data.GroupBy(s => s.accurance_date);

            foreach (var group in groups)
            {
                line_chart_data_view_model temp = new line_chart_data_view_model();

                temp.accurance_date = group.Key;

                temp.data = group.Sum(r => r.data * r.weight) / group.Sum(r => r.weight);

                result.Add(temp);
            }

            return result;
        }
        //-------------------------------------------------------------------------------------------------------------------------

    }
}