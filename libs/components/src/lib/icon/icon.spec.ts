import {
	axe,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import { ICONS_VERSION as ICON_SET_VERSION } from '@vonage/vwc-consts';
import type { Icon } from './icon';
import '.';

const COMPONENT_TAG = 'vwc-icon';

describe('icon', function () {
	let element: Icon;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Icon;
	});

	describe('resolver', function () {
		function fakeFetch(requestTime = 4000) {
			(global.fetch as any) = jest.fn(() => {
				return new Promise((res) => {
					setTimeout(() => res(response), requestTime);
				});
			});
		}

		const svg = 'svg';
		const response = {
			ok: true,
			headers: {
				get: () => {
					return 'image/svg+xml';
				},
			},
			text: () => svg,
		};
		const originalFetch = global.fetch;
		const originalPromise = global.Promise;

		beforeEach(function () {
			global.Promise = require('promise'); // needed in order for promises to work with jest fake timers
			jest.useFakeTimers({ legacyFakeTimers: true });
		});

		afterEach(function () {
			jest.useRealTimers();
			global.fetch = originalFetch;
			global.Promise = originalPromise;
		});

		function setIconNameAndTriggerFirstTimer() {
			element.name = 'none';
			jest.advanceTimersToNextTimer();
		}

		function setIconNameAndAdvanceTime(timeInMs: number) {
			element.name = 'none';
			jest.advanceTimersByTime(timeInMs);
		}

		function setIconNameAndRunAllTimers(iconName: string | undefined) {
			element.name = iconName;
			jest.runAllTimers();
		}

		it('should show nothing when first changing the icon', async function () {
			fakeFetch(4000);
			setIconNameAndTriggerFirstTimer();

			expect(element._svg).toEqual(undefined);
		});

		it('should set the icon as loading after 500ms', async function () {
			fakeFetch(4000);
			setIconNameAndAdvanceTime(500);
			expect(element._svg).toMatchSnapshot();
		});

		it('should remove loading icon after 2500ms', async function () {
			fakeFetch(4000);
			setIconNameAndAdvanceTime(2500);
			expect(element._svg).toEqual(undefined);
		});

		it('should set icon in svg after icon fetch', async function () {
			fakeFetch(100);
			setIconNameAndRunAllTimers('none');
			expect(element._svg).toEqual(svg);
		});

		it('should show empty string when no icon is available', function () {
			fakeFetch(100);
			setIconNameAndRunAllTimers('none');
			setIconNameAndRunAllTimers(undefined);
			expect(element._svg).toEqual('');
		});
	});

	describe('iconLoaded', function () {
		it('should default to false', function () {
			expect(element.iconLoaded).toEqual(false);
		});

		it('should set to true when icon is loaded', async function () {
			element.name = 'home';
			await elementUpdated(element);
			expect(element.iconLoaded).toEqual(true);
		});

		it('should set an image with src when iconLoaded is false', async function () {
			element.name = 'home';
			await elementUpdated(element);
			element.iconLoaded = false;
			await elementUpdated(element);
			const imgElement = getControlElement(element).querySelector('img');
			expect(imgElement?.src).toEqual(
				`https://icon.resources.vonage.com/v${ICON_SET_VERSION}/home.svg`
			);
		});

		it('should set iconLoaded to false when name changes', async function () {
			function fakeFetch() {
				const originalFetch = global.fetch;
				let timeout: any;
				(global.fetch as any) = jest.fn(() => {
					return new Promise((res) => {
						timeout = setTimeout(() => res(false), 1000);
					});
				});
				return () => {
					global.fetch = originalFetch;
					clearTimeout(timeout);
				};
			}

			const restoreFetch = fakeFetch();
			element.iconLoaded = true;

			element.name = 'no-home';
			await elementUpdated(element);

			expect(element.iconLoaded).toEqual(false);
			restoreFetch();
		});
	});

	describe('size', function () {
		it('should not have size class if not set', async function () {
			expect(getControlElement(element).className).not.toContain('size-');
		});

		it.each([0, 2] as const)(
			'should set size class accordingly when size is %s',
			async function (size) {
				element.size = size;
				await elementUpdated(element);
				expect(getControlElement(element).classList).toContain(`size-${size}`);
			}
		);
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} name="home"></${COMPONENT_TAG}>`
			)) as Icon;

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
