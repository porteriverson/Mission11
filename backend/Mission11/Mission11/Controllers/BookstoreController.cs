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
    public IActionResult Get( 
        int pageSize = 10, 
        int pageNum = 1, 
        string sortField = "Title", 
        string sortDirection = "asc", 
        string bookCat = null)
    {
        var query = _context.Books.AsQueryable();

        // filter first
        if (!string.IsNullOrEmpty(bookCat))
        {
            var categories = bookCat.Split(',');
            query = query.Where(b => categories.Contains(b.Category));
        }
        
        // then sort
        query = sortDirection.ToLower() == "asc" 
            ? query.OrderBy(b => b.Title) 
            : query.OrderByDescending(b => b.Title);
        
        var numberOfBooks = query.Count();
        
        var bookList = query.Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var returnObject = new
        {
            books = bookList,
            numBooks = numberOfBooks
        };
        return Ok(returnObject);
    }
    
    [HttpGet("Categories")]
    public IActionResult GetCategories()
    {
        var categories = _context.Books
            .Select(x => x.Category)
            .Distinct()
            .ToList();
        return Ok(categories);
    }
}