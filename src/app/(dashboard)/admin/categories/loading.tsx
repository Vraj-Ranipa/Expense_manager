import { LoadingVisual } from "@/components/ui/loading-visual";

export default function Loading() {
    return (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
            <LoadingVisual message="Loading categories..." />
        </div>
    );
}
