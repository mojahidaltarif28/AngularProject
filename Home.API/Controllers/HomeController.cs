using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
namespace Home.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet("HouseDetails")]
        public IActionResult GetDetails()
        {
            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            try
            {
                using(SqlConnection connection=new SqlConnection(connectionString))
                {
                    connection.Open();
                    string sql = "select * from Housing";
                    var housingDetails = new List<HousingDetail>();
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader dataReader = command.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                var housingDetail = new HousingDetail
                                {
                                    Id = Convert.ToInt32(dataReader["id"]),
                                    Name = dataReader["name"].ToString(),
                                    City = dataReader["city"].ToString(),
                                    State = dataReader["state"].ToString(),
                                    Photo = dataReader["photo"].ToString(),
                                    AvailableUnits = Convert.ToInt32(dataReader["availableUnits"]),
                                    Wifi = Convert.ToBoolean(dataReader["wifi"]),
                                    Laundry = Convert.ToBoolean(dataReader["laundry"])
                                };
                                housingDetails.Add(housingDetail);
                            }
                            return Ok(housingDetails);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return StatusCode(500,$"Error:{e.Message}");
            }
    }
        public class HousingDetail
        {
            public int Id { get; set; }                
            public string? Name{ get; set; }        
            public string? City{ get; set; }          
            public string? State { get; set; }          
            public string? Photo{ get; set; }        
            public int AvailableUnits { get; set; }   
            public bool Wifi { get; set; }            
            public bool Laundry { get; set; }         
        }

    }
}