import React, {useCallback} from 'react';
import block from 'bem-cn-lite';
import {ControlGroupOption, RadioButton} from '@gravity-ui/uikit';
import {QueriesListAuthorFilter, QueriesListMode} from '../../module/queries_list/types';

import './index.scss';
import {QueryEngineFilter} from './QueryEngineFilter';
import {QueryEngine} from '../../module/api';
import {QueryTextFilter} from './QueryTextFilter';
import {useQuriesHistoryFilter} from '../../hooks/QueryListFilter';

const AuthorFilter: ControlGroupOption[] = [
    {
        value: QueriesListAuthorFilter.My,
        content: 'My',
    },
    {
        value: QueriesListAuthorFilter.All,
        content: 'All',
    },
];

const b = block('queries-history-filter');

type QueriesHistoryListFilterProps = {
    className?: string;
};
export function QueriesHistoryListFilter({className}: QueriesHistoryListFilterProps) {
    const [filter, filterViewMode, onChange] = useQuriesHistoryFilter();

    const onChangeAuthorFilter = useCallback(
        (user: string) => {
            onChange('user', user as QueriesListAuthorFilter);
        },
        [onChange],
    );
    const onChangeEngineFilter = useCallback(
        (engine?: QueryEngine) => {
            onChange('engine', engine);
        },
        [onChange],
    );
    const onChangeTextFilter = useCallback(
        (text?: string) => {
            onChange('filter', text || undefined);
        },
        [onChange],
    );
    return (
        <div className={b(null, className)}>
            <div className={b('row')}>
                {filterViewMode === QueriesListMode.History && (
                    <RadioButton
                        className={b('row-item')}
                        options={AuthorFilter}
                        value={filter?.user || QueriesListAuthorFilter.My}
                        onUpdate={onChangeAuthorFilter}
                    />
                )}
                <QueryEngineFilter
                    className={b('row-item')}
                    value={filter?.engine}
                    onChange={onChangeEngineFilter}
                />
            </div>
            {filterViewMode === QueriesListMode.History && (
                <div className={b('row')}>
                    <QueryTextFilter
                        placeholder="Search in query name and body"
                        value={filter?.filter}
                        onChange={onChangeTextFilter}
                    />
                </div>
            )}
        </div>
    );
}
