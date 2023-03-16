export default async function delayFailRandomly(
  fetcher: () => Promise<unknown>,
) {
  const delay = 1000 + Math.random() * 2000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const shouldError = Math.random() < 0.3;
  if (shouldError) throw new Error('네트워크 에러');

  return fetcher();
}
