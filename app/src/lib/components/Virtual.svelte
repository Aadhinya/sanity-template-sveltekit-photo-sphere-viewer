<script lang="ts">
	import { Viewer } from '@photo-sphere-viewer/core';
	import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
	import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';

	import '@photo-sphere-viewer/core/index.css';
	import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
	import '@photo-sphere-viewer/gallery-plugin/index.css';

	import type { VirtualTourItem, VirtualTourPageBlocks } from '$lib/types/sanity';

	let { virtualTourItem, virtualTourPageBlocks }: {
		virtualTourItem: VirtualTourItem[];
		virtualTourPageBlocks: VirtualTourPageBlocks;
	} = $props();

	let wrapper = $state<HTMLDivElement | null>(null);

	$effect(() => {
		if (!wrapper || !virtualTourPageBlocks.start) return;

		const viewer = new Viewer({
			container: wrapper,
			loadingImg: virtualTourPageBlocks.loader ?? undefined,
			defaultYaw: '0deg',
			defaultZoomLvl: 0,
			navbar: 'zoom move gallery caption fullscreen',

			plugins: [
				[
					GalleryPlugin,
					{
						thumbnailSize: { width: 100, height: 100 }
					}
				],
				[
					VirtualTourPlugin,
					{
						renderMode: '3d',
						positionMode: 'manual',
						dataMode: 'client',
						preload: true,
						startNodeId: virtualTourPageBlocks.start.id
					}
				]
			]
		});

		const virtualTour = viewer.getPlugin(VirtualTourPlugin) as VirtualTourPlugin;
		// Sanity returns null for missing fields; PSV expects undefined — compatible at runtime
		virtualTour.setNodes(virtualTourItem as never, virtualTourPageBlocks.start.id);
	});
</script>

<div bind:this={wrapper} class="m-0 w-full h-full"></div>

<style>
	:global(.psv-tooltip-content > img, .psv-tooltip-content > p) {
		display: none;
	}
	:global(.psv-tooltip-content > h3) {
		font-size: 12px;
	}
</style>
