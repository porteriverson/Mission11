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

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();
        return Ok(book);
    }

    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateProject(int bookId, [FromBody] Book updatedBook)
    {
        var existingBook = _context.Books.Find(bookId);
        
        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;
        
        _context.Books.Update(existingBook);
        _context.SaveChanges();
        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var book = _context.Books.Find(bookId);
        if (book == null)
        {
            return NotFound(new {message = "Book not found"});
        }
        
        _context.Books.Remove(book);
        _context.SaveChanges();
        
        return NoContent();
    }
}