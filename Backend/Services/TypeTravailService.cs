using AutoMapper;
using Saweblia_Backend.Data.DTOs;

using Saweblia_Backend.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Saweblia_Backend.Data.Repositories;

namespace Saweblia_Backend.Services
{
    public class TypeTravailService : ITypeTravailService
    {
        private readonly TypeTravailRepository _typeTravailRepository;
        private readonly IMapper _mapper;

        public TypeTravailService(TypeTravailRepository repository, IMapper mapper)
        {
            _typeTravailRepository = repository;
            _mapper = mapper;
        }

/*        public async Task<List<TypeTravailDTO>> GetAll()
        {
            var typesTravail = await _typeTravailRepository.GetAll();
            var typesTravailDTO = _mapper.Map<List<TypeTravailDTO>>(typesTravail);
            return typesTravailDTO;
        }*/

        public async Task<TypeTravailDTO?> GetById(int id) 
        {
            var typeTravail = await _typeTravailRepository.GetById(id);
            var data = _mapper.Map<TypeTravailDTO>(typeTravail);
            return data;
        }
    }
}