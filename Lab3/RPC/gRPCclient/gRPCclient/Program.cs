using System.Threading.Tasks;
using Grpc.Net.Client;
using gRPCclient;

using var channel = GrpcChannel.ForAddress("https://localhost:7285");
var client = new Greeter.GreeterClient(channel);
var reply = await client.SayHelloAsync(new HelloRequest { Name= "GreeterClient"});
var reply2 = await client.SayHelloAsync(new HelloRequest { Name = "GreeterClient" });
Console.WriteLine("Greeting: " + reply.Message + reply2.Message);
Console.WriteLine("Press any key to exit");
Console.ReadKey();
