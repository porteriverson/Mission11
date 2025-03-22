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
    public IActionResult Get( int pageSize = 10, int pageNum = 1, string sortField = "Title", string sortDirection = "asc")
    {
        var bookList = new List<Book>();
        if (sortDirection == "asc")
        {
            bookList =  _context.Books.OrderBy(x => x.Title).ToList();
        }
        else
        {
            bookList = _context.Books.OrderByDescending(x => x.Title).ToList();
        }
        
        bookList =  bookList
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