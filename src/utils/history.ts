// 单独封装 默认导出
import { createBrowserHistory } from 'history'
const history = createBrowserHistory() as any;

// 扩展history对象以包含缺少的方法
history.createURL = (path: string) => new URL(path, window.location.href).href;
history.encodeLocation = (location: any) => encodeURIComponent(JSON.stringify(location));

export default history