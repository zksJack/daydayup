app.ts 添加

```tsx
import errorHandler  from "@/utils/errorHandle";
import type { RequestOptionsInit } from 'umi-request';


// 请求拦截
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  // const authHeader = { Authorization: 'Bearer xxxxxx' };// 配置统一token使用
  return {
    url: `${url}`,
    options: { ...options, interceptors: true,  },// headers: authHeader 配置统一token使用
  };
};
// 响应后拦截
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const demoResponseInterceptors = (response: Response, options: RequestOptionsInit) => {
  // console.log(response);
  return response;
};
// 配置request
export const request: RequestConfig = {
  prefix: process.env.NODE_ENV === "production" ? '' :'',  // 监测开发环境
  credentials: 'include',
  errorHandler,
  // 自定义端口规范
  // errorConfig: {
  //   adaptor: res => {
  //     return {
  //       success: res.code === config.successCode,
  //       data:res.data,
  //       errorCode:res.code,
  //       errorMessage: res.msg,
  //     };
  //   },
  // },
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [demoResponseInterceptors],
  middlewares: [],
};

```

utils/errorHandle

```tsx
import { notification } from 'antd';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

interface error {
  name: string;
  data: any;
  type: string;
  response: {
    status: number;
    statusText: string;
    url: string;
  };
}

/**
 * 异常处理程序
 */
// eslint-disable-next-line consistent-return
const errorHandler = (error: error) => {
  if (error.name === 'BizError') {
    notification.error({
      message: `请求错误 ${error.data.code}`,
      description: error.data.msg,
    });
    return error.data.code;
  }
  const { response } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext,
  });
};
export default errorHandler;

```

