'use client';
import { AssistantChat } from "@/components/assistant-chat";

/**
 * The new AI Command Center. This is the user's primary interface,
 * replacing a static dashboard with a conversational OS.
 */
export default function CommandCenterPage() {
    // This component is now designed to be full-screen via its layout.
    return <AssistantChat />;
}
