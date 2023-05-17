import {html, ViewTemplate} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import {DataGridCellRole} from './data-grid.options';
import type {DataGridCell} from './data-grid-cell';

// TODO::observe ariaSelected and add/remove selected class from base

export function DataGridCellTemplate<T extends DataGridCell>(context: ElementDefinitionContext): ViewTemplate<T> {
	const focusTemplate = focusTemplateFactory(context);
	return html<T>`
        <template
            tabindex="-1"
            role="${x => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
        >
					<div class="base">
							<slot></slot>
					${() => focusTemplate}
					</div>

        </template>
    `;
}
