import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

const cesiumBuildPath = 'node_modules/cesium/Build/Cesium/'

export default defineConfig({
	plugins: [
		sveltekit(),
		viteStaticCopy({
			targets: [
				{
					src: path.join(cesiumBuildPath, 'Assets'),
					dest: 'build'
				},
				{
					src: path.join(cesiumBuildPath, 'ThirdParty'),
					dest: 'build'
				},
				{
					src: path.join(cesiumBuildPath, 'Widgets'),
					dest: 'build'
				},
				{
					src: path.join(cesiumBuildPath, 'Workers'),
					dest: 'build'
				},
			]
		})
	]
});
