import { defineConfig,loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// import svgLoader from "vite-svg-loader";
import { resolve } from "path";
const pathResolve = (dir) => resolve(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { command, mode } = config
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [
      vue(),
      // viteMockServe({
      //   // 只在开发阶段开启 mock 服务,mock和后端服务器接口能共存，可以通过配置来区分
      //   localEnabled: command === 'serve',
      // }),
      // createSvgIconsPlugin({
      //   iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      //   symbolId: "icon-[dir]-[name]",
      // }),
      // * vite-svg-loader支持，可以直接引入svg图标当作组件使用
      // svgLoader(),
    ],
    resolve: {
      alias: {
        "@": pathResolve("./src"), // @代替./src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ""),
        },
      },
    },
    define:{
      __APP_ENV__:JSON.stringify(env.APP_ENV),
      "process.env":env
    }
  }
});

