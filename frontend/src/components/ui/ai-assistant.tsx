import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Sparkles, Briefcase, Zap, GraduationCap } from "lucide-react";
import { useState } from "react";

interface AiAssistantProps {
    onGenerate: (style: string) => void;
}

export function AiAssistant({ onGenerate }: AiAssistantProps) {
    const [open, setOpen] = useState(false);

    const handleSelect = (style: string) => {
        onGenerate(style);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-blue-100 rounded-full transition-colors">
                    <Sparkles className="h-3 w-3 text-blue-600" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-1 bg-zinc-900 border-zinc-800 text-white" align="end">
                <div className="grid gap-1">
                    <h4 className="font-medium leading-none mb-2 px-2 py-2 text-xs text-zinc-400 uppercase tracking-wider">
                        Melhorar com IA
                    </h4>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm hover:bg-zinc-800 hover:text-white justify-between group"
                        onClick={() => handleSelect('professional')}
                    >
                        <span className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-blue-400" />
                            Profissional
                        </span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm hover:bg-zinc-800 hover:text-white justify-between group"
                        onClick={() => handleSelect('executive')}
                    >
                        <span className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-purple-400" />
                            Executivo
                        </span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm hover:bg-zinc-800 hover:text-white justify-between group"
                        onClick={() => handleSelect('creative')}
                    >
                        <span className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            Impactante
                        </span>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
