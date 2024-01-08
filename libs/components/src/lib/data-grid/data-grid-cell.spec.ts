import { html } from '@microsoft/fast-element';
import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import '../icon/index.ts';
import '../button/index.ts';
import { designSystem } from '../../shared/design-system';
import {Button} from '../button/button';
import { DataGridCell } from './data-grid-cell';
import { DataGridCellTemplate } from './data-grid-cell.template';
import {DataGridCellSortStates} from './data-grid.options';

const dataGridCell = DataGridCell.compose<FoundationElementDefinition>({
	baseName: 'data-grid-cell',
	template: DataGridCellTemplate as any
});

designSystem.withPrefix('vwc').register(dataGridCell());

const COMPONENT_TAG = 'vwc-data-grid-cell';
const ICON_TAG = 'vwc-icon';
const BUTTON_TAG = 'vwc-button';

describe('vwc-data-grid-cell', () => {
	let element: DataGridCell;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as DataGridCell;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-data-grid', async () => {
			expect(element).toBeInstanceOf(DataGridCell);
			expect(element.cellType).toEqual('default');
			expect(element.getAttribute('cell-type')).toBeNull();
			expect(element.gridColumn).toBeUndefined();
			expect(element.getAttribute('grid-column')).toBeNull();
			expect(element.rowData).toBeNull();
			expect(element.columnDefinition).toBeNull();
		});
	});

	describe('cellType', () => {
		function setCellDataAndConfig() {
			element.rowData = { name: 'x', age: 33 };
			element.columnDefinition = {
				columnDataKey: 'name',
				headerCellTemplate: html`<div id="header"></div>`,
				cellTemplate: html`<div id="cell"></div>`
			};
		}

		it('should reflect cell-type', async () => {
			element.cellType = 'rowheader';
			await elementUpdated(element);
			expect(element.getAttribute('cell-type')).toEqual('rowheader');
		});

		it('should render header template if set to columnheader', async () => {
			setCellDataAndConfig();

			element.cellType = 'columnheader';
			await elementUpdated(element);
			expect(element.querySelector('#header')).toBeTruthy();
			expect(element.querySelector('#cell')).toBeNull();
		});

		it('should render cell template if set to rowheader', async () => {
			setCellDataAndConfig();

			element.cellType = 'rowheader';
			await elementUpdated(element);
			expect(element.querySelector('#cell')).toBeTruthy();
			expect(element.querySelector('#header')).toBeNull();
		});

		it('should render cell template with the default value', async () => {
			setCellDataAndConfig();

			await elementUpdated(element);
			expect(element.querySelector('#cell')).toBeTruthy();
			expect(element.querySelector('#header')).toBeNull();
		});

		it('should render default cell template if given an invalid cell type', async () => {
			setCellDataAndConfig();
			element.cellType = 'invalid' as any;
			await elementUpdated(element);
			expect(element.querySelector('#cell')).toBeNull();
			expect(element.innerText).toBeUndefined();
		});
	});

	describe('gridColumn', () => {
		it('should reflect grid-column', async () => {
			element.gridColumn = '3';
			await elementUpdated(element);
			expect(element.getAttribute('grid-column')).toEqual('3');
		});

		it('should update the grid column style property', async () => {
			element.gridColumn = '3';
			await elementUpdated(element);
			expect(element.style.gridColumn).toEqual('3');
		});

		it('should remove the gridColumn style if gridColumn is undefined', async () => {
			expect(element.style.gridColumn).toEqual('');
		});

		it('should remove the gridColumn style if gridColumn contains undefined', async function () {
			element.gridColumn = 'undefined / undefined';
			await elementUpdated(element);
			expect(element.style.gridColumn).toEqual('');
		});
	});

	describe('columnDefinition', () => {
		function setCellDataAndConfig() {
			element.rowData = { name: 'x', age: 33 };
			element.columnDefinition = {
				columnDataKey: 'name',
				cellTemplate: html`<div id="cell"></div>`
			};
		}

		it('should re-render the cell view on change', async () => {
			setCellDataAndConfig();
			await elementUpdated(element);
			const templateRendered = !!element.querySelector('#cell');
			element.columnDefinition = {
				columnDataKey: 'age'
			};
			await elementUpdated(element);
			expect(templateRendered).toBeTruthy();
			expect(element.querySelector('#cell')).toBeNull();
			expect(element.textContent?.trim()).toEqual('33');
		});
	});

	describe('Event Handlers', () => {
		let elementToFocus: HTMLInputElement;

		beforeEach(async () => {
			element.columnDefinition = {
				columnDataKey: 'name'
			};
			elementToFocus = document.createElement('input');
			document.body.appendChild(elementToFocus);
		});

		afterEach(async () => {
			elementToFocus.remove();
		});

		describe('handleFocusin', () => {
			it('should focus on focus target element on cell focusin', async () => {
				document.body.appendChild(elementToFocus);
				element.cellType = 'default';
				element.columnDefinition = {
					columnDataKey: 'name',
					cellFocusTargetCallback: () => {
						return elementToFocus;
					}
				};
				element.dispatchEvent(new Event('focusin'));
				expect(document.activeElement).toEqual(elementToFocus);
			});

			it('should focus on target element when header is focused', async () => {
				element.cellType = 'columnheader';
				element.columnDefinition = {
					columnDataKey: 'name',
					headerCellFocusTargetCallback: () => {
						return elementToFocus;
					}
				};
				element.dispatchEvent(new Event('focusin'));
				expect(document.activeElement).toEqual(elementToFocus);
			});

			it('should fire "cell-focused" event', async () => {
				const spy = jest.fn();
				element.addEventListener('cell-focused', spy);
				element.focus();
				expect(spy).toHaveBeenCalledTimes(1);
			});

			it('should set "active" class on the base element', async () => {
				const baseElement = getBaseElement(element);
				const hasActiveClassBeforeFocus = baseElement?.classList.contains('active');
				element.dispatchEvent(new Event('focusin'));
				expect(hasActiveClassBeforeFocus).toBeFalsy();
				expect(baseElement?.classList.contains('active')).toBeTruthy();
			});
		});

		describe('handleKeydown', () => {
			it('should focus on target element with enter key', async () => {
				element.cellType = 'default';
				element.columnDefinition = {
					columnDataKey: 'name',
					cellFocusTargetCallback: () => {
						return elementToFocus;
					},
					cellInternalFocusQueue: true
				};
				element.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
				expect(document.activeElement).toEqual(elementToFocus);
			});

			it('should focus on target element with F2 key', async () => {
				element.cellType = 'default';
				element.columnDefinition = {
					columnDataKey: 'name',
					cellFocusTargetCallback: () => {
						return elementToFocus;
					},
					cellInternalFocusQueue: true
				};
				element.dispatchEvent(new KeyboardEvent('keydown', {key: 'F2'}));
				expect(document.activeElement).toEqual(elementToFocus);
			});

			it('should focus on grid-cell when escape key pressed and child is focused', async () => {
				element.columnDefinition = {
					columnDataKey: 'name',
					cellInternalFocusQueue: true
				};
				const childNode = document.createElement('button');
				element.appendChild(childNode);
				childNode.focus();
				element.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
				expect(document.activeElement).toEqual(element);
			});
		});
	});

	describe('aria-selected', function () {
		it('should init without aria-selected', async () => {
			expect(element.hasAttribute('aria-selected')).toEqual(false);
		});

		it('should set selected class on base when aria-selected true on init', async () => {
			const newElement = (await fixture(`<${COMPONENT_TAG} aria-selected="true"></${COMPONENT_TAG}>`)) as DataGridCell;
			await elementUpdated(newElement);
			expect(getBaseElement(newElement)?.classList.contains('selected')).toBeTruthy();
		});

		it('should set selected class on base when aria-selected true', async () => {
			element.setAttribute('aria-selected', 'true');
			await elementUpdated(element);
			expect(getBaseElement(element)?.classList.contains('selected')).toBeTruthy();
		});

		it('should remove selected class on base when aria-selected is not true', async function () {
			element.setAttribute('aria-selected', 'true');
			await elementUpdated(element);

			element.setAttribute('aria-selected', 'false');
			await elementUpdated(element);
			expect(getBaseElement(element)?.classList.contains('selected')).toBeFalsy();
		});
	});

	describe('aria-sort', () => {
		beforeEach(function () {
			element.cellType = 'columnheader';
			element.ariaSort = 'none';
		});

		it('should show sort-solid icon in the header when "none" is set', async function () {
			element.setAttribute('aria-sort', 'none');
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-solid');
		});

		it('should show sort-asc-solid icon when aria-sort is ascending', async function () {
			element.setAttribute('aria-sort', 'ascending');
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-asc-solid');
		});

		it('should show sort-desc-solid icon when aria-sort is descending', async function () {
			element.setAttribute('aria-sort', 'descending');
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-desc-solid');
		});

		it('should remove sorting icons when aria-sort is not set', async function () {
			element.ariaSort = null;
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(0);
		});

		it('should set aria-sort from columnDefinition', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: DataGridCellSortStates.ascending,
				sortable: true
			};
			await elementUpdated(element);
			expect(element.ariaSort).toEqual('ascending');
		});

		it('should revert aria-sort to "none" when columnDefinition.sort is falsy', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: null,
				sortable: true
			};
			await elementUpdated(element);
			expect(element.ariaSort).toEqual(DataGridCellSortStates.none);
		});

		it('should remove aria-sort when sortable is false', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: DataGridCellSortStates.ascending,
				sortable: false
			};
			await elementUpdated(element);
			expect(element.ariaSort).toEqual(null);
		});
	});

	describe('sort event', () => {
		let onSortSpy: jest.Mock;
		beforeEach(async () => {
			element.cellType = 'columnheader';
			element.innerHTML = 'Name';
			await elementUpdated(element);
			onSortSpy = jest.fn();
			element.addEventListener('sort', onSortSpy);
		});

		describe('without aria-sort', () => {
			it('should not emit "sort" event when clicked', async () => {
				element.click();
				expect(onSortSpy).not.toHaveBeenCalled();
			});

			it.each(['Enter', ' '])('should not emit "sort" event when "%s" is pressed', async function (key) {
				element.dispatchEvent(new KeyboardEvent('keydown', {key}));
				expect(onSortSpy).not.toHaveBeenCalled();
			});
		});

		describe('with aria-sort', () => {
			beforeEach(async () => {
				element.ariaSort = 'none';
				await elementUpdated(element);
			});

			it('should emit "sort" event when clicked', async function () {
				element.click();

				expect(onSortSpy).toHaveBeenCalledTimes(1);
				expect(onSortSpy.mock.calls[0][0].detail).toEqual({columnDataKey: 'Name', sortDirection: 'none'});
			});

			it.each(['Enter', ' '])('should fire "sort" event when "%s" is pressed', async function (key) {
				element.dispatchEvent(new KeyboardEvent('keydown', {key}));

				expect(onSortSpy).toHaveBeenCalledTimes(1);
				expect(onSortSpy.mock.calls[0][0].detail).toEqual({columnDataKey: 'Name', sortDirection: 'none'});
			});
		});

		describe('with columnDefinition', () => {
			beforeEach(async () => {
				element.columnDefinition = {
					sortDirection: DataGridCellSortStates.ascending,
					sortable: true,
					columnDataKey: 'Not Name',
				};
				await elementUpdated(element);
			});

			it('should fire "sort" event when clicked with data key from config', async function () {
				element.click();
				expect(onSortSpy).toHaveBeenCalledTimes(1);
				expect(onSortSpy.mock.calls[0][0].detail).toEqual({columnDataKey: 'Not Name', sortDirection: 'ascending'});
			});
		});
	});

	describe('cell-click event', () => {
		let onCellClickSpy: jest.Mock;
		let expectedDetail: object;
		beforeEach(async () => {
			element.cellType = 'default';
			element.innerHTML = 'Name';
			await elementUpdated(element);
			onCellClickSpy = jest.fn();
			element.addEventListener('cell-click', onCellClickSpy);
			expectedDetail = {cell: element, row: element.parentElement, isHeaderCell: false, columnDataKey: 'Name'};
		});

		it('should emit "cell-click" event when clicked', async () => {
			element.click();
			expect(onCellClickSpy).toHaveBeenCalledTimes(1);
			expect(onCellClickSpy.mock.calls[0][0].detail).toEqual(expectedDetail);
		});

		describe.each(['Enter', ' '])('when "%s" is pressed',  (key) => {
			it('should emit "cell-click" event', async () => {
				element.dispatchEvent(new KeyboardEvent('keydown', { key }));
				expect(onCellClickSpy).toHaveBeenCalledTimes(1);
				expect(onCellClickSpy.mock.calls[0][0].detail).toEqual(expectedDetail);
			});

			it('should not emit "cell-click" event if the cell has an internal focus queue', async () => {
				element.columnDefinition = {
					cellInternalFocusQueue: true,
					columnDataKey: 'Name'
				};
				element.dispatchEvent(new KeyboardEvent('keydown', { key }));
				expect(onCellClickSpy).not.toHaveBeenCalled();
			});

			it('should not emit "cell-click" event it is a header cell with an internal focus queue', async () => {
				element.cellType = 'columnheader';
				element.columnDefinition = {
					headerCellInternalFocusQueue: true,
					columnDataKey: 'Name'
				};
				element.dispatchEvent(new KeyboardEvent('keydown', { key }));
				expect(onCellClickSpy).not.toHaveBeenCalled();
			});
		});

		it('should set isHeaderCell if cellType is "columnheader"', async () => {
			element.cellType = 'columnheader';
			element.click();
			expect(onCellClickSpy).toHaveBeenCalledTimes(1);
			expect(onCellClickSpy.mock.calls[0][0].detail.isHeaderCell).toBe(true);
		});
	});

	describe('filterable', () => {
		beforeEach(function () {
			element.cellType = 'columnheader';
			element.filterable = false;
		});

		it('should render filter icon when filterable is true', async function () {
			element.filterable = true;
			await elementUpdated(element);
			const filterIcons = element.shadowRoot?.querySelectorAll(BUTTON_TAG);

			expect(filterIcons?.length).toEqual(1);
			expect(filterIcons?.[0].getAttribute('icon')).toEqual('filter-line');
		});

		it('should render filter icon only on a columnheader cell', function () {
			element.cellType = 'default';
			element.filterable = true;
			expect(element.shadowRoot?.querySelectorAll(BUTTON_TAG).length).toEqual(0);
		});

		it('should fire "filter" event when clicked', async function () {
			element.filterable = true;
			element.innerHTML = 'Name';
			await elementUpdated(element);
			const spy = jest.fn();
			element.addEventListener('filter', spy);
			const filterButton = element.shadowRoot?.querySelector(BUTTON_TAG) as Button;
			filterButton.click();
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy.mock.calls[0][0].detail).toEqual({columnDataKey: 'Name'});
		});

		it('should fire "filter" event when clicked with data key from config', async function () {
			element.innerHTML = 'Name';
			element.columnDefinition = {
				columnDataKey: 'Not Name',
				filterable: true
			};
			await elementUpdated(element);
			const spy = jest.fn();
			element.addEventListener('filter', spy);
			const filterButton = element.shadowRoot?.querySelector('.filter-button') as Button;
			filterButton.click();
			expect(spy.mock.calls[0][0].detail).toEqual({columnDataKey: 'Not Name'});
		});
	});

	describe('filterbale-popup', () => {
		beforeEach(function () {
			element.cellType = 'columnheader';
			element.filterable = false;
		});

		it('should add "aria-haspopup" to the filterable button', async function () {
			element.filterable = true;
			element.filterablePopup = 'dialog';
			await elementUpdated(element);
			const filterIcon = element.shadowRoot?.querySelector('.filter-button') as Button;
			expect(filterIcon.getAttribute('aria-haspopup')).toEqual('dialog');
		});

		it('should remove "aria-haspopup" when set to null', async function () {
			element.filterable = true;
			element.filterablePopup = null;
			await elementUpdated(element);
			const filterIcon = element.shadowRoot?.querySelector('.filter-button') as Button;
			expect(filterIcon.getAttribute('aria-haspopup')).toBeNull();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element = (await fixture(`
				<div role="grid">
					<div role="row">
						<${COMPONENT_TAG}></${COMPONENT_TAG}>
					</div>
				</div>
			`)) as DataGridCell;
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: DataGridCellSortStates.ascending,
				sortable: true
			};
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});

