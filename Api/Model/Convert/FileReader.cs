using System.Text.Json;
namespace Api
{
    public static class JsonFileReader
    {
        public static T Read<T>(string filePath)
        {

            string text = File.ReadAllText(filePath);
            if (text is null)
            {
                throw new Exception("Deserialization failed");
            }
            //var jsonText = JsonConvert.DeserializeObject<T>(text, settings);
            return JsonSerializer.Deserialize<T>(text);

        }
    }
}