using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using QuotleBrowser;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();

public record Movie(string Id, string Title)
{
    private readonly List<Character> _characters = new();
    public IEnumerable<Character> Characters => _characters;
}
public record Line(string Id, string Text, Movie Movie, Character Character);
public record Character(string Id, string Name, Movie Movie, IEnumerable<Line> Lines);
public record Conversation(Movie Movie, IEnumerable<Line> Lines);