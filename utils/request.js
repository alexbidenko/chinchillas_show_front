import axios from 'axios';

const $request = axios.create({

});

$request.interceptors.request.use((config) => {
  const runtimeConfig = useRuntimeConfig();
  // TODO: типизировать нормально
  config.baseURL = runtimeConfig.public.baseApi;
});

for (const method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  $request['$' + method] = function () { return this[method].apply(this, arguments).then((res) => res && res.data) }
}

export { $request };
