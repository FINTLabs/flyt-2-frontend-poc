import { PageLayout } from '~/components/layout/PageLayout';

export function Welcome() {
    return (
        <PageLayout>
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <header className="flex flex-col items-center gap-9"></header>
                <div className="max-w-[300px] w-full space-y-6 px-4">Velkommen til FINT Flyt 2</div>
            </div>
        </PageLayout>
    );
}
