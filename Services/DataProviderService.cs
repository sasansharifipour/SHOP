using Common;
using DataLayer.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DomainClasses;

namespace Services
{
    public interface IDataProviderService
    {
        List<CSSR_Result_ViewModel> getCSSR(int[] operators, int[] technologies
            , DateTime? fromDate, DateTime? toDate);

        List<TCH_ASR_Result_ViewModel> getTCH_ASR(int[] operators, int[] technologies
            , DateTime? fromDate, DateTime? toDate);

        List<Gauge_Result_ViewModel> getSDCCH_DR(int[] operators, int[] technologies
            , DateTime? fromDate, DateTime? toDate);

        List<Gauge_Result_ViewModel> getCS_IRAT_HOSR(int[] operators, int[] technologies
            , DateTime? fromDate, DateTime? toDate);

        List<Gauge_Result_ViewModel> getRRC_CCSR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate);

        List<Gauge_Result_ViewModel> getRRC_CSSR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate);

        List<Gauge_Result_ViewModel> getSuccess_Active_Set_update(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate);

        List<Gauge_Result_ViewModel> getSuccess_Attach_Request(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate);

        List<Gauge_Result_ViewModel> getARSR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate);

        List<Gauge_Result_ViewModel> getRSRR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate);

        List<Gauge_Result_ViewModel> getTotal_successful_Call(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate);

        List<Gauge_Result_ViewModel> getSMSSR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate);
    }

    public class DataProviderService : IDataProviderService
    {
        private readonly ITechnologyService _technologyService;
        private readonly IOperatorService _operatorService;
        private readonly IDataGatheringService _dataGatheringService;
        
        public DataProviderService(ITechnologyService technologyService,
            IOperatorService operatorService, IDataGatheringService dataGatheringService)
        {
            _technologyService = technologyService;
            _technologyService.CheckArgumentIsNull(nameof(_technologyService));

            _operatorService = operatorService;
            _operatorService.CheckArgumentIsNull(nameof(_operatorService));

            _dataGatheringService = dataGatheringService;
            _dataGatheringService.CheckArgumentIsNull(nameof(_dataGatheringService));

        }

        public List<CSSR_Result_ViewModel> getCSSR(int[] operators, int[] technologies
            , DateTime? fromDate, DateTime? toDate)
        {
            List<CSSR_Result_ViewModel> data_for_all_operator_technology
                = new List<CSSR_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator = 
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;
                    
                    List<CSSR_Result_ViewModel> data_for_one_operator_technology = 
                        new List<CSSR_Result_ViewModel>();

                    if (fromDate.HasValue && toDate.HasValue)
                        data_for_one_operator_technology = _dataGatheringService.getCSSR(selectedOperator,
                            selectedTechnology, fromDate.Value, toDate.Value);
                    else
                        data_for_one_operator_technology = _dataGatheringService.getCSSR(selectedOperator, 
                            selectedTechnology);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);


                }
            }

            double request = data_for_all_operator_technology
                .Sum(s => s.MM_CMServiceRequest);

            double response = data_for_all_operator_technology
                .Sum(s => s.RANAP_RABAssignment_Response);

            double CSSR = 0;

            if (response != 0)
                CSSR = (double)response / (double)request;

            return data_for_all_operator_technology;
        }
        
        public List<TCH_ASR_Result_ViewModel> getTCH_ASR(int[] operators, int[] technologies
            , DateTime? fromDate, DateTime? toDate)
        {
            List<TCH_ASR_Result_ViewModel> data_for_all_operator_technology
                = new List<TCH_ASR_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<TCH_ASR_Result_ViewModel> data_for_one_operator_technology =
                        new List<TCH_ASR_Result_ViewModel>();

                    if (fromDate.HasValue && toDate.HasValue)
                        data_for_one_operator_technology = _dataGatheringService.getTCH_ASR(selectedOperator,
                            selectedTechnology, fromDate.Value, toDate.Value);
                    else
                        data_for_one_operator_technology = _dataGatheringService.getTCH_ASR(selectedOperator,
                            selectedTechnology);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);


                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getSDCCH_DR(int[] operators, int[] technologies
            , DateTime? fromDate, DateTime? toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;
                    
                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    if (fromDate.HasValue && toDate.HasValue)
                        data_for_one_operator_technology = _dataGatheringService.getSDCCH_DR(selectedOperator,
                            selectedTechnology, fromDate.Value, toDate.Value);
                    else
                        data_for_one_operator_technology = _dataGatheringService.getSDCCH_DR(selectedOperator,
                            selectedTechnology);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);


                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getCS_IRAT_HOSR(int[] operators, int[] technologies
            , DateTime? fromDate, DateTime? toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    if (fromDate.HasValue && toDate.HasValue)
                        data_for_one_operator_technology = _dataGatheringService.getCS_IRAT_HOSR(selectedOperator,
                            selectedTechnology, fromDate.Value, toDate.Value);
                    else
                        data_for_one_operator_technology = _dataGatheringService.getCS_IRAT_HOSR(selectedOperator,
                            selectedTechnology);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getRRC_CCSR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    data_for_one_operator_technology = _dataGatheringService.getRRC_CCSR
                        (selectedOperator, selectedTechnology, fromDate, toDate);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getRRC_CSSR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    data_for_one_operator_technology = _dataGatheringService.getRRC_CSSR
                        (selectedOperator, selectedTechnology, fromDate, toDate);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getSuccess_Active_Set_update(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    data_for_one_operator_technology = _dataGatheringService.getSuccess_Active_Set_update
                        (selectedOperator, selectedTechnology, fromDate, toDate);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getSuccess_Attach_Request(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    data_for_one_operator_technology = _dataGatheringService.getSuccess_Attach_Request
                        (selectedOperator, selectedTechnology, fromDate, toDate);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getARSR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    data_for_one_operator_technology = _dataGatheringService.getARSR
                        (selectedOperator, selectedTechnology, fromDate, toDate);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getRSRR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    data_for_one_operator_technology = _dataGatheringService.getRSRR
                        (selectedOperator, selectedTechnology, fromDate, toDate);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getTotal_successful_Call(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    data_for_one_operator_technology = _dataGatheringService.getTotal_successful_Call
                        (selectedOperator, selectedTechnology, fromDate, toDate);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }

        public List<Gauge_Result_ViewModel> getSMSSR(int[] operators, int[] technologies
            , DateTime fromDate, DateTime toDate)
        {
            List<Gauge_Result_ViewModel> data_for_all_operator_technology
                = new List<Gauge_Result_ViewModel>();

            foreach (var selected_operator_id in operators)
            {
                Operator selectedOperator =
                    _operatorService.FindOperatorAsync(selected_operator_id).Result;

                foreach (var selected_technology_id in technologies)
                {
                    Technology selectedTechnology =
                        _technologyService.FindTechnologyAsync(selected_technology_id).Result;

                    List<Gauge_Result_ViewModel> data_for_one_operator_technology =
                        new List<Gauge_Result_ViewModel>();

                    data_for_one_operator_technology = _dataGatheringService.getSMSSR
                        (selectedOperator, selectedTechnology, fromDate, toDate);

                    data_for_all_operator_technology.AddRange(data_for_one_operator_technology);

                }
            }


            return data_for_all_operator_technology;
        }
    }
}
