
// using AutoFixture;
// using Api.Models;
// namespace Api.Data
// {
//     public static class Seeder
//     {
//         //   Error: Possible null reference argument for parameter 'source' in 'bool Queryable.Any<Stopplaces>(IQueryable<Stopplaces> source)
//         public static void Seed(this DataContext dataContext)
//         {
//             if (dataContext.Stopplaces?.Any() != true)
//             {
//                 Fixture fixture = new();
//                 fixture.Customize<Stopplaces>(stopplace => stopplace.Without(p => p.Id));

//                 List<Stopplaces> stopplaces = fixture.CreateMany<Stopplaces>(10).ToList();
//                 dataContext.Stopplaces.AddRange(stopplaces);
//                 dataContext.SaveChanges();
//             }
//         }

//     }
// }
