import {ExecutionContext, html, ViewTemplate, when} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import {Icon} from '../icon/icon';
import {Button} from '../button/button';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import {DataGridCellRole, DataGridCellSortStates} from './data-grid.options';
import type {DataGridCell} from './data-grid-cell';

function shouldShowSortIcons<T extends DataGridCell>(x: T): boolean {
	if (x.columnDefinition) {
		x.ariaSort = !x.columnDefinition.sortable ? null : x.columnDefinition.sortDirection ?
			x.columnDefinition.sortDirection : DataGridCellSortStates.none;
	}
	return x.cellType === 'columnheader' && x.ariaSort !== null && x.ariaSort !== DataGridCellSortStates.other;
}

function shouldShowFilterIcons<T extends DataGridCell>(x: T): boolean {
	if (x.columnDefinition) {
		x.filterable = x.columnDefinition.filterable ?? false;
	}
	return x.cellType === 'columnheader' && x.filterable;
}

function getSortIcon<T extends DataGridCell>(x: T): string {
	return x.ariaSort === DataGridCellSortStates.ascending ? 'sort-asc-solid' :
		x.ariaSort === DataGridCellSortStates.descending ? 'sort-desc-solid' : 'sort-solid';
}

function getFilterIcon<T extends DataGridCell>(_: T): string {
	return 'filter-line';
}

function renderSortIcons<T extends DataGridCell>(c: ElementDefinitionContext) {
	const iconTag = c.tagFor(Icon);
	return html<T>`
			${when(shouldShowSortIcons, html<T>`
				<${iconTag} class="header-icon" name="${getSortIcon}"></${iconTag}>
			`)}
		`;
}

function isSortable<T extends DataGridCell>(x: T) {
	return x.cellType === 'columnheader' && x.ariaSort !== null;
}

function emitSortEvent<T extends DataGridCell>(x: T) {
	x.$emit('sort',
		{columnDataKey: (x.columnDefinition && x.columnDefinition.columnDataKey) ?
			x.columnDefinition.columnDataKey : x.textContent!.trim(), sortDirection: x.ariaSort});
}

function renderFilterIcons<T extends DataGridCell>(c: ElementDefinitionContext) {
	const buttonTag = c.tagFor(Button);
	return html<T>`
			${when(shouldShowFilterIcons, html<T>`
				<${buttonTag} @click="${handleFilterClick}"
											class="header-icon filter-button"
											icon="${getFilterIcon}"
											size="condensed"
											aria-haspopup="${x => x.filterablePopup}">
				</${buttonTag}>
			`)}
		`;
}

function handleFilterClick<T extends DataGridCell>(x: T, { event }: ExecutionContext) {
	event.stopPropagation();
	x.$emit('filter',
		{columnDataKey: (x.columnDefinition && x.columnDefinition.columnDataKey) ?
			x.columnDefinition.columnDataKey : x.textContent!.trim()});
}

function handleClick<T extends DataGridCell>(x: T) {
	if (isSortable(x)) {
		emitSortEvent(x);
	}
}

function handleKeyDown<T extends DataGridCell>(x: T, e: KeyboardEvent) {
	if (isSortable(x) && (e.key === keyEnter || e.key === keySpace)) {
		emitSortEvent(x);
	}
	return true;
}

export function DataGridCellTemplate<T extends DataGridCell>(context: ElementDefinitionContext): ViewTemplate<T> {
	const focusTemplate = focusTemplateFactory(context);
	return html<T>`
        <template
            tabindex="-1"
            role="${x => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
						@click="${handleClick}"
						@keydown="${(x, c) => handleKeyDown(x, c.event as KeyboardEvent)}"
        >
					<div class="base">
							<slot></slot>
							${() => focusTemplate}
							${_ => renderSortIcons(context)}
							${_ => renderFilterIcons(context)}
					</div>

        </template>
    `;
}
