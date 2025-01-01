type AsyncFn = (...args: any[]) => Promise<any>;

export const catchAsync = (fn: AsyncFn, customErrorMessage?: string) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`[Error] ${error.message}`);
        if (customErrorMessage) console.log(`${customErrorMessage}`);
        console.log(`${error.stack}`);
      } else {
        throw new Error('Unexpected error occurred');
      }
    }
  };
};
