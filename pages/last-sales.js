import React, { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-c43d2-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = transformDataFromFirebase(data);

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course-c43d2-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("data => ", data);
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key],
  //             volumn: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!sales && !data) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

function transformDataFromFirebase(firebaseData) {
    let transformedData = Object.keys(firebaseData).map((key) => {
      return {
        id: key,
        username: firebaseData[key].username,
        volume: firebaseData[key].volume,
      };
    });

    return transformedData;
  }

// It will auto-render when has new item from that firebase realtime
export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-c43d2-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );
  const data = await response.json();

//   const transformedSales = [];
//   for (const key in data) {
//     transformedSales.push({
//       id: key,
//       username: data[key],
//       volumn: data[key].volume,
//     });
//   }

//Fix 
const transformedSales = transformDataFromFirebase(data);

  return {
    props: {
      sales: transformedSales,
    }
  };
}

export default LastSalesPage;
