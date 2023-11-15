using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Data;
using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Data.Repositories;
using Saweblia_Backend.Models;
using Saweblia_Backend.Services;
using Saweblia_Backend.Services.Interfaces;
using System.Configuration;
using System.Net.Http;
using System.Text;

namespace Saweblia_Backend.Controllers;
    [ApiController]
    [Route("[controller]")]
    public class FactureController : ControllerBase
    {
        private readonly IFactureService _factureService;
        private readonly IMapper _mapper;

    public FactureController(IFactureService factureService, IMapper mapper)
    {
        _factureService = factureService;
        _mapper = mapper;
    }

    //Save a single Bill in the database with all attributes;
        [HttpPost("save")]
        [AllowAnonymous]
    public async Task<IActionResult> SaveFacture([FromBody] FactureDTO model)
    {
        try
        {
            await _factureService.SaveFactureAsync(model);
            return Ok(new { success = true, message = "Facture saved successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }

    // Obtenez toutes les factures
    [HttpGet("all")]
    public async Task<IActionResult> GetAllFactures()
    {
        try
        {
            var factures = await _factureService.GetAllFacturesAsync();
            if (factures == null || !factures.Any())
            {
                return NotFound(new { success = false, message = "No factures found" });
            }

            var factureDTOs = _mapper.Map<IEnumerable<Facture>, IEnumerable<FactureDTO>>(factures);
            return Ok(factureDTOs);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }


    //Get A single Bill By its ID;
    [HttpGet("{ti}")]
    public IActionResult GetFactureById(string ti)
    {
        try
        {
            var facture = _factureService.GetFactureById(ti);
            if (facture == null)
            {
                return NotFound(new { success = false, message = "Facture not found" });
            }

            var factureDTO = _mapper.Map<Facture, FactureDTO>(facture);
            return Ok(factureDTO);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }


    //Get A single Bill(s) By Phone number;
    [HttpGet("bytel")]
    public async Task<IActionResult> GetFacturesByPhone([FromQuery] string tel)
    {
        try
        {
            var factures = await _factureService.GetFacturesByPhoneAsync(tel);
            if (factures == null)
            {
                return NotFound(new { success = false, message = "No factures found for the given phone number" });
            }

            var factureDTOs = _mapper.Map<IEnumerable<Facture>, IEnumerable<FactureDTO>>(factures);
            return Ok(factureDTOs);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }

    //update the Bill by the Satat 'Annuler'(0/1);
    [HttpPut("edit/{id}")]
    public IActionResult UpdateFactureStatus(string id, [FromBody] int newValue)
    {
        try
        {
            _factureService.UpdateFactureStatus(id, newValue);
            return Ok(new { success = true, message = "Facture status updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }

}
