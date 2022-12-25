using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            localhost.MathService myMathService = new localhost.MathService();

            Console.Write("2 * 2 = {0}", myMathService.Multiply(2, 2));

            Console.ReadKey();


        }
    }
}
