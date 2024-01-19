// vite.config.js
import { defineConfig } from "file:///Users/ivatsaneva/Documents/Courses/Telerik/final-project-lazy-loading/lazy-loading-vrscans-library/node_modules/vite/dist/node/index.js";
import react from "file:///Users/ivatsaneva/Documents/Courses/Telerik/final-project-lazy-loading/lazy-loading-vrscans-library/node_modules/@vitejs/plugin-react/dist/index.mjs";
import eslint from "file:///Users/ivatsaneva/Documents/Courses/Telerik/final-project-lazy-loading/lazy-loading-vrscans-library/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    eslint(),
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              pure: true,
              transpileTemplateLiterals: false
            }
          ]
          // [
          // 	'@babel/plugin-transform-react-jsx',
          // 	{
          // 		runtime: 'automatic',
          // 	},
          // ],
        ],
        babelrc: true,
        configFile: true
      }
    })
  ],
  server: {
    port: "3000"
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8"
    },
    setupFiles: "./src/test/setup.js",
    include: ["**/*(*.)?{test,spec}.{js,jsx}"],
    exclude: ["node_modules", "dist", ".git"],
    css: true
    // parsing CSS is slow but we need it
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaXZhdHNhbmV2YS9Eb2N1bWVudHMvQ291cnNlcy9UZWxlcmlrL2ZpbmFsLXByb2plY3QtbGF6eS1sb2FkaW5nL2xhenktbG9hZGluZy12cnNjYW5zLWxpYnJhcnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9pdmF0c2FuZXZhL0RvY3VtZW50cy9Db3Vyc2VzL1RlbGVyaWsvZmluYWwtcHJvamVjdC1sYXp5LWxvYWRpbmcvbGF6eS1sb2FkaW5nLXZyc2NhbnMtbGlicmFyeS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaXZhdHNhbmV2YS9Eb2N1bWVudHMvQ291cnNlcy9UZWxlcmlrL2ZpbmFsLXByb2plY3QtbGF6eS1sb2FkaW5nL2xhenktbG9hZGluZy12cnNjYW5zLWxpYnJhcnkvdml0ZS5jb25maWcuanNcIjsvLyB2aXRlLmNvbmZpZy5qc1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdGVzbGludCgpLFxuXHRcdHJlYWN0KHtcblx0XHRcdGJhYmVsOiB7XG5cdFx0XHRcdHBsdWdpbnM6IFtcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHQnYmFiZWwtcGx1Z2luLXN0eWxlZC1jb21wb25lbnRzJyxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0cHVyZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0dHJhbnNwaWxlVGVtcGxhdGVMaXRlcmFsczogZmFsc2UsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0Ly8gW1xuXHRcdFx0XHRcdC8vIFx0J0BiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeCcsXG5cdFx0XHRcdFx0Ly8gXHR7XG5cdFx0XHRcdFx0Ly8gXHRcdHJ1bnRpbWU6ICdhdXRvbWF0aWMnLFxuXHRcdFx0XHRcdC8vIFx0fSxcblx0XHRcdFx0XHQvLyBdLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRiYWJlbHJjOiB0cnVlLFxuXHRcdFx0XHRjb25maWdGaWxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9KSxcblx0XSxcblx0c2VydmVyOiB7XG5cdFx0cG9ydDogJzMwMDAnLFxuXHR9LFxuXHR0ZXN0OiB7XG5cdFx0Z2xvYmFsczogdHJ1ZSxcblx0XHRlbnZpcm9ubWVudDogJ2pzZG9tJyxcblx0XHRjb3ZlcmFnZToge1xuXHRcdFx0cHJvdmlkZXI6ICd2OCcsXG5cdFx0fSxcblx0XHRzZXR1cEZpbGVzOiAnLi9zcmMvdGVzdC9zZXR1cC5qcycsXG5cdFx0aW5jbHVkZTogWycqKi8qKCouKT97dGVzdCxzcGVjfS57anMsanN4fSddLFxuXHRcdGV4Y2x1ZGU6IFsnbm9kZV9tb2R1bGVzJywgJ2Rpc3QnLCAnLmdpdCddLFxuXHRcdGNzczogdHJ1ZSxcblx0XHQvLyBwYXJzaW5nIENTUyBpcyBzbG93IGJ1dCB3ZSBuZWVkIGl0XG5cdH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBR25CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNSO0FBQUEsWUFDQztBQUFBLFlBQ0E7QUFBQSxjQUNDLE1BQU07QUFBQSxjQUNOLDJCQUEyQjtBQUFBLFlBQzVCO0FBQUEsVUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0Q7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULFlBQVk7QUFBQSxNQUNiO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1A7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNMLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxNQUNULFVBQVU7QUFBQSxJQUNYO0FBQUEsSUFDQSxZQUFZO0FBQUEsSUFDWixTQUFTLENBQUMsK0JBQStCO0FBQUEsSUFDekMsU0FBUyxDQUFDLGdCQUFnQixRQUFRLE1BQU07QUFBQSxJQUN4QyxLQUFLO0FBQUE7QUFBQSxFQUVOO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
