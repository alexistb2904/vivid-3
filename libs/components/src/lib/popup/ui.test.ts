import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import type { Popup } from './popup';

const components = ['popup'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<style>
		.contentWrapper {
			width: 70px;
			padding: 4px;
		}

		.square {
			height: 150px;
			width: 400px;
		}

		.small {
			height: 20px;
		}

		.wrapper {
			width: 100%;
			height: 300px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: grey;
		}

		.element {
			width: 300px;
			height: 50px;
			position: relative;
			z-index: 11;
			background-color: #0074D9;
			margin-top: 20px;
		}
	</style>
	<div>
		<div class="wrapper">
			<div id="mainTestAnchor" class="square"></div>
			<vwc-popup open arrow placement="right-end" alternate>
				<div class="contentWrapper">
					right-end
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="right">
				<div class="contentWrapper">
					right
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="right-start" dismissible>
				<div class="contentWrapper">
					right-start
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="left-end" alternate>
				<div class="contentWrapper">
					left-end
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="left">
				<div class="contentWrapper">
					left
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="left-start" dismissible>
				<div class="contentWrapper">
					left-start
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="top-end" alternate>
				<div class="contentWrapper">
					top-end
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="top">
				<div class="contentWrapper">
					top
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="top-start" dismissible>
				<div class="contentWrapper">
					top-start
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="bottom-end" alternate>
				<div class="contentWrapper">
					bottom-end
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="bottom">
				<div class="contentWrapper">
					bottom
				</div>
			</vwc-popup>
			<vwc-popup open arrow placement="bottom-start" dismissible>
				<div class="contentWrapper">
					bottom-start
				</div>
			</vwc-popup>
		</div>
		<hr>
		<div class="wrapper" style="flex-direction: column; height: 100px;">
			<div id="anchor-index" class="square small"></div>
			<vwc-popup open placement="bottom-center" strategy="absolute" style="z-index: 12;">
				<div class="contentWrapper">
					z-index checks
				</div>
			</vwc-popup>
			<div class="element">I have z-index: 11</div>
		</div>
		<hr>
		<div class="wrapper" style="white-space: nowrap; height: 100px;">
			<div id="anchor-wrapping" class="square small"></div>
			<vwc-popup open placement="right">
				<div class="contentWrapper">
					Long text that should wrap
				</div>
			</vwc-popup>
		</div>
	</div>
	`;

	page.setViewportSize({ width: 800, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	// RUn script
	await page.evaluate(() => {
		const mainAnchor = document.querySelector('#mainTestAnchor') as HTMLElement;
		document
			.querySelectorAll('#mainTestAnchor ~ vwc-popup')
			.forEach((popup: Popup) => (popup.anchor = mainAnchor));
		const indexAnchor = document.querySelector('#anchor-index') as HTMLElement;
		document
			.querySelectorAll('#anchor-index ~ vwc-popup')
			.forEach((popup: Popup) => (popup.anchor = indexAnchor));
		const wrappingAnchor = document.querySelector(
			'#anchor-wrapping'
		) as HTMLElement;
		document
			.querySelectorAll('#anchor-wrapping ~ vwc-popup')
			.forEach((popup: Popup) => (popup.anchor = wrappingAnchor));
	});

	const testWrapper = await page.$('#wrapper');
	await page.waitForLoadState('networkidle');
	+expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/popup.png'
	);
});
