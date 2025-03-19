using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers;

[ApiController]
[Route("[controller]")]
public class BookstoreController : Controller
{
    private BookDbContext _context;

    public BookstoreController(BookDbContext temp)
    {
        _context = temp;
    }
    [HttpGet("AllBooks")]
    public IActionResult Get( int pageSize, int pageNum)
    {
        var bookList = _context.Books
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        var numberOfBooks = _context.Books.Count();

        var returnObject = new
        {
            books = bookList,
            numBooks = numberOfBooks
        };
        return Ok(returnObject);
    }
}