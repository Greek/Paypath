export const getAPI = async ({ queryKey }: any) => {
  const res = await fetch(`/api/${queryKey[0]}`, {
    body: JSON.stringify(queryKey[1]),
  });
  return await res.json();
};
