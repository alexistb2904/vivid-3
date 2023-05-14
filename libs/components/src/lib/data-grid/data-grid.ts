import { DataGrid as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {DataGridCell} from './data-grid-cell';

export const DataGridSelectionMode = {
	none: 'none',
	singleRow: 'single-row',
	multiRow: 'multi-row',
	singleCell: 'single-cell',
	multiCell: 'multi-cell',
} as const;

export type ValueOf<T> = T[keyof T];

export type DataGridSelectionMode = ValueOf<typeof DataGridSelectionMode>;
/**
 * Base class for data-grid
 *
 * @public
 * @slot - Default slot.
 */
export class DataGrid extends FoundationElement {
	@attr({attribute: 'selection-mode'})
		selectionMode?: DataGridSelectionMode;

	#selectedCells: DataGridCell[] = [];

	#handleClick = (e: MouseEvent) => {
		const target = e.target as DataGridCell;
		const ctrlKey = e.ctrlKey;
		const shiftKey = e.shiftKey;
		if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell)  {

			if (this.selectionMode === DataGridSelectionMode.multiCell && (ctrlKey || shiftKey)) {
				target.selected = !this.#selectedCells.includes(target);
			} else {
				this.#selectedCells.forEach(cell => cell.selected = false);
				target.selected = !this.#selectedCells.includes(target);
				this.#selectedCells = [];
			}

			if (target.selected) {
				this.#selectedCells.push(target);
			}
		}
	};
	constructor() {
		super();
		this.addEventListener('click', this.#handleClick);
	}
}
