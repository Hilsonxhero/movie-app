import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";




// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": resolve(__dirname, "src"),
//     },
//   },
// })


export default ({ mode }) => {
  require('dotenv').config({ path: `./.env` });
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    define: {
      'process.env': process.env
    }
  })
}
