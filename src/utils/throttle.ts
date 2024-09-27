import { throttle } from "lodash";

type AnyFunction = (...args: any[]) => any;

const createThrottledFunction = <T extends AnyFunction>(
  func: T,
  wait: number,
) => {
  return throttle(func, wait);
};

export default createThrottledFunction;
