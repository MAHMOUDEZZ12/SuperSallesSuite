
// This layout ensures the AssistantChat component takes up the full available space.
export default function AssistantLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            {children}
        </div>
    );
}
