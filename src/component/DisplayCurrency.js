import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const DisplayCurrency = () => {
  const [data, setData] = useState([]);

  let RandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);
  let Sell = (rates, random) => parseInt(rates) - (random / 100) * rates;
  let Buy = (rates, random) => parseInt(rates) + (random / 100) * rates;

  const randomNum = RandomNumber(2, 5);

  const getData = () => {
    axios
      .get(API)
      .then((response) => {
        setData(response.data.rates);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const currency = Object.entries(data);

  useEffect(() => {
    getData();
  }, []);

  return (
    <section class="container mx-auto p-6 font-mono">
      <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div class="w-full">
          <table class="w-full">
            <thead>
              <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th class="px-4 py-3"></th>
                <th class="px-4 py-3">We Buy</th>
                <th class="px-4 py-3">Exchange Rate</th>
                <th class="px-4 py-3">We Sell</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              {currency.length !== 0 ? (
                currency.map((value) => (
                  <tr class="text-gray-700">
                    <td class="px-4 py-3 text-ms font-semibold border">
                      {value[0]}
                    </td>
                    <td class="px-4 py-3 text-ms font-semibold border">
                      {value[1]}
                    </td>
                    <td class="px-4 py-3 text-ms font-semibold border">
                      {Buy(value[1], randomNum)}
                    </td>
                    <td class="px-4 py-3 text-ms font-semibold border">
                      {Sell(value[1], randomNum)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr class="text-gray-700">
                  <td
                    class="px-4 py-3 text-ms font-semibold border text-center"
                    colspan="4"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DisplayCurrency;
