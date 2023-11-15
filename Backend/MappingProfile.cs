using AutoMapper;
using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Models;

namespace Saweblia_Backend
{
    public class MappingProfile : Profile
    {
        public MappingProfile()

        {
            // Mappage de Categorie vers CategorieDTO
            CreateMap<Categorie, CategorieDTO>()
                .PreserveReferences(); 

            CreateMap<PrestationDTO, Prestation>().ReverseMap();

            CreateMap<TypeTravail, TypeTravailDTO>();
            
           // CreateMap<Categorie, MiniCategorieDto>();
         
            CreateMap<Categorie, CategorieDTO>()
                     .ForMember(dest => dest.FirstQuestion, opt => opt.MapFrom(src => src.FirstQuestion));
            CreateMap<CategorieDTO, Categorie>()
                     .ForMember(dest => dest.FirstQuestion, opt => opt.MapFrom(src => src.FirstQuestion));

         CreateMap<QteQuestion, QteQuestionDTO>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "Quantite"));
            CreateMap<QteQuestion, QuestionDTO>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "Quantite"))
                .ConstructUsing((x, context) => context.Mapper.Map<QteQuestionDTO>(x));

            CreateMap<OnechoiceQuestion, OnechoiceQuestionDTO>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "Onechoice"));
            CreateMap<OnechoiceQuestion, QuestionDTO>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "Onechoice"))
                .ConstructUsing((x, context) => context.Mapper.Map<OnechoiceQuestionDTO>(x));

            CreateMap<QteAnswer, AnswerDTO>()
                .Include<QteAnswer, QteAnswerDTO>();
            CreateMap<QteAnswer, QteAnswerDTO>();

            CreateMap<Answer, AnswerDTO>()
                .Include<QteAnswer, QteAnswerDTO>()
                .Include<OnechoiceAnswer, OnechoiceAnswerDTO>();

            CreateMap<QteAnswer, QteAnswerDTO>();
            CreateMap<OnechoiceAnswer, OnechoiceAnswerDTO>()
                .ForMember(dest => dest.NextQuestion, opt => opt.MapFrom(src => src.NextQuestion));

            CreateMap<Prestation, PrestationDTO>();
            CreateMap<Facture, FactureDTO>();
            CreateMap<Commercial, CommercialDTO>();
            CreateMap<Setting, SettingDTO>();
            CreateMap<Admin, AdminDTO>();

            CreateMap<CommercialDTO, Commercial>();
        }
    }
}
