using System.ComponentModel.DataAnnotations;

namespace WOWA.BLL.Dtos;

public class DtoBase
{
	[Required] public int Id { get; set; }

	public bool IsNew()
	{
		return Id <= 0;
	}
}