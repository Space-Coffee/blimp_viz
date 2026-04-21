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
					src: path.posix.join(cesiumBuildPath, 'Assets'),
					dest: 'build'
				},
				{
					src: path.posix.join(cesiumBuildPath, 'ThirdParty'),
					dest: 'build'
				},
				{
					src: path.posix.join(cesiumBuildPath, 'Widgets'),
					dest: 'build'
				},
				{
					src: path.posix.join(cesiumBuildPath, 'Workers'),
					dest: 'build'
				},
			]
		})
	]
});
