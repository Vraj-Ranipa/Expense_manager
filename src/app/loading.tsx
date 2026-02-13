import { LoadingVisual } from "@/components/ui/loading-visual";

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <LoadingVisual message="Loading..." />
        </div>
    );
}
