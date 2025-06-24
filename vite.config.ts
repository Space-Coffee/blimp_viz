import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteStaticCopy from 'vite-plugin-static-copy'

const cesiumBuildPath = 'node_modules/cesium/Build/Cesium/'

export default defineConfig({
	plugins: [sveltekit()]
});
