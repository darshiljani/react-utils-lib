import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

	const env = loadEnv(mode, process.cwd(), '')
	return {
		plugins: [react(), tsconfigPaths()],
		server: {
			hmr: { port: 51730 },
			host: '0.0.0.0',
			port: 5173,
			// open: true,
			strictPort: true,
		},
		define: {
			// 'process.env.API_URL': JSON.stringify(env.API_URL),
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	}
})
