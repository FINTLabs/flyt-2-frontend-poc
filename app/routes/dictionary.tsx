import React, { useCallback, useMemo, useState } from 'react';
import {
    Page,
    Heading,
    BodyShort,
    Box,
    VStack,
    Tag,
    List,
    Table,
    HGrid,
    type TagProps,
    type SortState,
} from '@navikt/ds-react';
import { dictionaryData } from '~/demo/mockData/dictionary';
import type { DictionaryTerm } from '~/demo/mockData/dictionary';
import { tableSortComperator } from '~/demo/utils/generalUtils';

interface ScopedSortState extends SortState {
    orderBy: 'term' | 'category';
}

export default function DictionaryPage() {
    const [sort, setSort] = useState<ScopedSortState | undefined>({
        orderBy: 'term',
        direction: 'ascending',
    });

    const sortedData = dictionaryData.slice().sort((a, b) => {
        if (sort) {
            return sort.direction === 'ascending'
                ? tableSortComperator(b, a, sort.orderBy)
                : tableSortComperator(a, b, sort.orderBy);
        }
        return 1;
    });

    const [selectedTerm, setSelectedTerm] = useState<DictionaryTerm | null>(sortedData[0] || null);

    const handleSort = (sortKey: ScopedSortState['orderBy']) => {
        setSort(
            sort && sortKey === sort.orderBy && sort.direction === 'descending'
                ? undefined
                : {
                      orderBy: sortKey,
                      direction:
                          sort && sortKey === sort.orderBy && sort.direction === 'ascending'
                              ? 'descending'
                              : 'ascending',
                  }
        );
    };

    const getTagColor = useCallback((category: string): TagProps['variant'] => {
        switch (category.toLowerCase()) {
            case 'datatype':
                return 'info';
            case 'konsept':
                return 'alt2';
            case 'ui element':
                return 'success';
            default:
                return 'neutral';
        }
    }, []);

    return (
        <Page>
            <Box padding="8" maxWidth="1200px" marginInline={'auto'}>
                <Heading level="1" size="large" spacing>
                    Ordliste
                </Heading>
                <BodyShort spacing>
                    Her finner du definisjoner av viktige begreper og termer som brukes i FINT Flyt.
                </BodyShort>

                <HGrid columns={2} width={'100%'} gap="0">
                    <Box>
                        <Table
                            size={'small'}
                            sort={sort}
                            onSortChange={(sortKey) =>
                                handleSort(sortKey as ScopedSortState['orderBy'])
                            }
                        >
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader sortKey="term" sortable>
                                        Begrep
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader sortKey="category" sortable>
                                        Kategori
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {sortedData.map((term: DictionaryTerm) => (
                                    <Table.Row
                                        key={term.id}
                                        onClick={() => setSelectedTerm(term)}
                                        selected={selectedTerm?.id === term.id}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Table.HeaderCell>{term.term}</Table.HeaderCell>
                                        <Table.DataCell textSize={'small'}>
                                            {term.category}
                                        </Table.DataCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Box>
                    {selectedTerm && (
                        <Box
                            padding="6"
                            style={{
                                backgroundColor: 'var(--beige-primary)',
                                borderRadius: '0 8px 8px 0',
                            }}
                        >
                            <VStack gap="3" align="start">
                                <Tag variant={getTagColor(selectedTerm.category)} size="small">
                                    {selectedTerm.category}
                                </Tag>
                                <Box>
                                    <Heading level="2" size="medium" spacing>
                                        {selectedTerm.term}
                                    </Heading>
                                    <BodyShort spacing>{selectedTerm.definition}</BodyShort>
                                    {selectedTerm.examples && (
                                        <Box className="mt-3">
                                            <BodyShort weight="semibold" spacing>
                                                Eksempler:
                                            </BodyShort>
                                            <List>
                                                {selectedTerm.examples.map((example, index) => (
                                                    <List.Item key={index}>
                                                        <BodyShort size="small">
                                                            {example}
                                                        </BodyShort>
                                                    </List.Item>
                                                ))}
                                            </List>
                                        </Box>
                                    )}
                                </Box>
                            </VStack>
                        </Box>
                    )}
                </HGrid>
            </Box>
        </Page>
    );
}
