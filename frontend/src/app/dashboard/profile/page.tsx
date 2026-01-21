import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, GraduationCap } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">Meu Perfil Profissional</h1>
                <p className="text-zinc-400">
                    Mantenha suas informações atualizadas para gerar currículos perfeitos em segundos.
                </p>
            </div>

            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="bg-zinc-900 border border-zinc-800 p-1 mb-8">
                    <TabsTrigger value="personal" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                        <User className="w-4 h-4" />
                        Dados Pessoais
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                        <Briefcase className="w-4 h-4" />
                        Experiência
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                        <GraduationCap className="w-4 h-4" />
                        Educação
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800 backdrop-blur-sm">
                        <PersonalInfoForm />
                    </div>
                </TabsContent>

                <TabsContent value="experience" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800 backdrop-blur-sm">
                        <ExperienceForm />
                    </div>
                </TabsContent>

                <TabsContent value="education" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800 backdrop-blur-sm">
                        <EducationForm />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
