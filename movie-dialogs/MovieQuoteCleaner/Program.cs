HashSet<int> validLengths = new HashSet<int> { 9, 16, 25, 36 };
var countByLength = validLengths.ToDictionary(k => k, v => 0);

Dictionary<string, string> movies = (await File.ReadAllLinesAsync("Data/movie_titles_metadata.txt"))
    .Select(l => l.Split(" +++$+++ "))
    .ToDictionary(k => k[0], v => v[1]);

Dictionary<string, List<string>> allLinesByMovie = new();

await foreach (var line in File.ReadLinesAsync("Data/movie_lines.txt"))
{
    const string separator = " +++$+++ ";
    var split = line.Split(separator);
    var quote = split[4];

    if (validLengths.Contains(quote.Length))
    {
        countByLength[quote.Length]++;
        string movie = movies[split[2]];
        if (!allLinesByMovie.TryGetValue(movie, out var lines))
        {
            lines = new List<string>();
            allLinesByMovie[movie] = lines;
        }
        lines.Add(quote);
    }
}

List<string> results = new();
foreach (var movieLines in allLinesByMovie)
{
    if (!validLengths.All(l => movieLines.Value.Any(v => v.Length == l)))
    {
        continue;
    }

    results.Add("--------");
    results.Add(movieLines.Key);
    results.AddRange(movieLines.Value.OrderBy(x => x.Length));
}
await WriteToFile("Data/movie_lines_parsed.txt", results);

foreach (var count in countByLength)
{
    Console.WriteLine($"Cleaned {count.Value} lines of {count.Key} length.");
}

static async Task WriteToFile(string fileName, IEnumerable<string> lines)
{
    File.Delete(fileName);
    await File.AppendAllLinesAsync(fileName, lines);
}