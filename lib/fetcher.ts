export default function fetcher(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include", // makes sure cookie are sent up for the json web token etc
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    // throw error if res status is greater than 399 and less than 200
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }
    return res.json();
  }); // since when next js app is deployed api is on same route as frontend so we can have its location using window
}
