"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, GraduationCap } from "lucide-react";

const educationSchema = z.object({
    educations: z.array(z.object({
        id: z.string().optional(),
        school: z.string().min(2, "Instituição é obrigatória"),
        degree: z.string().min(2, "Grau/Título é obrigatório"),
        fieldOfStudy: z.string().optional(),
        startDate: z.string().min(1, "Data de início é obrigatória"),
        endDate: z.string().optional(),
        description: z.string().optional(),
    }))
});

type EducationFormValues = z.infer<typeof educationSchema>;

import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile, getUserProfile } from "@/services/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export function EducationForm() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<EducationFormValues>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            educations: []
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "educations",
    });

    useEffect(() => {
        async function loadEducation() {
            if (!user) return;
            const data = await getUserProfile(user.uid);
            if (data?.profile?.educations) {
                const formattedEdu = data.profile.educations.map((edu: any) => ({
                    ...edu,
                    startDate: edu.startDate ? new Date(edu.startDate).toISOString().slice(0, 7) : "",
                    endDate: edu.endDate ? new Date(edu.endDate).toISOString().slice(0, 7) : "",
                }));
                form.reset({ educations: formattedEdu });
            }
            setIsLoading(false);
        }
        loadEducation();
    }, [user, form]);

    async function onSubmit(values: EducationFormValues) {
        if (!user) return;

        const promise = updateUserProfile(user.uid, values);

        toast.promise(promise, {
            loading: 'Salvando formação...',
            success: 'Formação atualizada!',
            error: 'Erro ao salvar formação.',
        });
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-20 w-full bg-zinc-800" />
                <Skeleton className="h-40 w-full bg-zinc-800" />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-white">Formação Acadêmica</h3>
                        <p className="text-sm text-zinc-400">Adicione seus cursos, graduações e certificações.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <Card key={field.id} className="bg-zinc-900/40 border-zinc-800 overflow-hidden group">
                            <CardHeader className="flex flex-row items-center justify-between py-3 bg-zinc-800/20">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <div className="bg-emerald-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">
                                        {index + 1}
                                    </div>
                                    Educação {index + 1}
                                </CardTitle>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`educations.${index}.school`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Instituição</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: USP, Alura, Rocketseat..." {...field} className="bg-zinc-950 border-zinc-800" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`educations.${index}.degree`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Curso / Grau</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: Bacharelado em Ciência da Computação" {...field} className="bg-zinc-950 border-zinc-800" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`educations.${index}.fieldOfStudy`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Área de Estudo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: Tecnologia da Informação" {...field} className="bg-zinc-950 border-zinc-800" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`educations.${index}.startDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data Início</FormLabel>
                                                <FormControl>
                                                    <Input type="month" {...field} className="bg-zinc-950 border-zinc-800" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`educations.${index}.endDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data Fim (ou previsão)</FormLabel>
                                                <FormControl>
                                                    <Input type="month" {...field} className="bg-zinc-950 border-zinc-800" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Complementos (Opcional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Destaques, honras ou atividades relevantes..."
                                                    className="bg-zinc-950 border-zinc-800 h-24"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-dashed border-zinc-700 hover:border-emerald-500/50 hover:bg-emerald-500/5"
                        onClick={() => append({
                            school: "",
                            degree: "",
                            startDate: "",
                        })}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Formação
                    </Button>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 ml-auto">
                        Salvar Formação
                    </Button>
                </div>
            </form>
        </Form>
    );
}
