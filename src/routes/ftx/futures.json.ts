export async function get() {
  let resp = await fetch('https://ftx.com/api/futures');
  const json = await resp.json();
  // return await resp.json();
  return { body: json }
}