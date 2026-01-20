import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    handleClassName?: string;
}

export function SortableItem({ id, children, className, handleClassName }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
        position: "relative" as "relative",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group/sortable relative transition-shadow",
                isDragging ? "shadow-2xl ring-2 ring-blue-500/50 rotate-1 bg-white rounded-lg z-50 scale-105" : "",
                className
            )}
        >
            {/* Drag Handle - Only visible on hover */}
            <div
                {...attributes}
                {...listeners}
                className={cn(
                    "absolute -left-6 top-6 -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 text-zinc-300 hover:text-zinc-600 opacity-0 group-hover/sortable:opacity-100 transition-opacity print:hidden touch-none",
                    handleClassName
                )}
                title="Arrastar para reordenar"
            >
                <GripVertical className="h-4 w-4" />
            </div>

            {children}
        </div>
    );
}
