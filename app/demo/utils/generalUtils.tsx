

export const tableSortComperator = <T,>(a: T, b: T, orderBy: keyof T): number => {
    if (b[orderBy] == null || b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

export const createAlmostRandomId = (prefix: string, baseId?: string): string =>
    `${prefix}${baseId ? '-'+baseId+'-' : '-' }${Math.random().toString(16).slice(2)}`;
