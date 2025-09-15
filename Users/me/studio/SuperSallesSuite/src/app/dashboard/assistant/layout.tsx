
// This layout ensures the AssistantChat component takes up the full available space.
export default function AssistantLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col p-4 md:p-10">
            {children}
        </div>
    );
}

