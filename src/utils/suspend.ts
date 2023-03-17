export default function suspend(fetcher: () => Promise<unknown>) {
  const promise = fetcher();

  return {
    promise: wrapPromise(promise),
  };
}

function wrapPromise(promise: Promise<unknown>) {
  type Status = 'pending' | 'error' | 'success';

  let status: Status = 'pending';
  let result: unknown | Error;

  const suspender = promise.then(
    (res: unknown) => {
      status = 'success';
      result = res;
    },
    (err: Error) => {
      status = 'error';
      result = err;
    },
  );

  const statusMap = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw result;
    },
    success: () => result,
  };

  function resolved() {
    return statusMap[status]();
  }

  return { resolved };
}
